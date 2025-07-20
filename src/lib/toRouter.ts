import { BadRequestError, UnauthorizedError, ZodBadRequestError } from "@utils/exception";
import { Router, Request, Response, NextFunction } from "express";
import * as z from "zod/v4";
import { HTTP_INFO_KEY, HttpInfo, HTTP_RESP_KEY, RespData } from "./httpMethod";
import { toSchema, toJsonSchema, getContextType } from "./type_declaration";
import { SCHEMA_RES_KEY, ApiSchemas } from "./validate";
import { accessTokenPayload, verifyAccessToken } from "@utils/jwt";
import { expressToSwaggerPath } from "@utils/express2swaggerPath";


export type RequestWithUser = accessTokenPayload;

// Convert schemas to Zod
function convertToZodSchemas(schemas: ApiSchemas): { [key: string]: z.ZodTypeAny } {
    const schema_zod: { [key: string]: z.ZodTypeAny } = {};
    for (const [key, value] of Object.entries(schemas)) {
        if (key === "res") continue;
        if (Array.isArray(value)) {
            const sch = value.map((e) => toSchema(e)).filter((e) => e !== null);
            schema_zod[key] = z.union(sch);
        } else {
            schema_zod[key] = toSchema(value)!;
        }
    }
    return schema_zod;
}

// Configure Swagger paths for HTTP methods
function configurePath(
    paths: { [key: string]: any },
    httpInfo: HttpInfo,
    target: new () => any,
    schema_zod: { [key: string]: z.ZodTypeAny },
    schemas: ApiSchemas
) {
    if (!paths[expressToSwaggerPath(httpInfo.path)])
        paths[expressToSwaggerPath(httpInfo.path)] = {};

    const tags = httpInfo.data?.tags;

    paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method] = {
        tags: tags || [target.name],
    };

    // Add request body
    if (schema_zod?.body) {
        const contextType = getContextType(schemas.body);
        paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["requestBody"] = {
            content: {
                [contextType || "application/json"]: {
                    schema: z.toJSONSchema(schema_zod.body),
                },
            },
            required: true,
        };
    }

    // Add query parameters
    if (schema_zod?.query) {
        if (!paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["parameters"]) {
            paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["parameters"] = [];
        }
        for (const key of Object.keys((schema_zod.query as any).shape)) {
            paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["parameters"].push({
                in: "query",
                name: key,
                schema: z.toJSONSchema((schema_zod.query as any).shape[key]),
            });
        }
    }

    if (schema_zod?.params) {
        if (!paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["parameters"]) {
            paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["parameters"] = [];
        }
        for (const key of Object.keys((schema_zod.params as any).shape)) {
            paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["parameters"].push({
                in: "path",
                name: key,
                required: true,
                schema: z.toJSONSchema((schema_zod.params as any).shape[key]),
            });
        }
    }
}

// Add response schemas to paths
function addResponseSchemas(
    paths: { [key: string]: any },
    httpInfo: HttpInfo,
    schemas: ApiSchemas
) {
    paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["responses"] = {};
    if (schemas?.res && Array.isArray(schemas.res)) {
        for (const class_ of schemas.res) {
            const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, class_) as RespData;
            const s = toJsonSchema(class_);
            paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["responses"][respDeco?.statusCode || 200] = {
                content: {
                    "application/json": {
                        schema: {
                            $schema: "http://json-schema.org/draft-07/schema#",
                            type: "object",
                            properties: {
                                code: {
                                    type: "integer",
                                    description: "HTTP status code of the error",
                                    minimum: 200,
                                    maximum: 300,
                                },
                                message: {
                                    type: "string",
                                    description: "Human-readable error message",
                                },
                                data: s,
                            },
                            required: [],
                        },
                    },
                },
                description: respDeco?.statusMess || "OK",
            };
        }
    }
}

// Add error responses to paths
function addErrorResponses(
    paths: { [key: string]: any },
    httpInfo: HttpInfo,
    errors: Error[]
) {
    for (const classError of errors) {
        if (!classError) continue;
        const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, classError) as RespData;
        paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["responses"][respDeco?.statusCode || 200] = {
            content: {
                "application/json": {
                    schema: {
                        $schema: "http://json-schema.org/draft-07/schema#",
                        title: "ApiErrorResponse",
                        type: "object",
                        properties: {
                            code: {
                                type: "integer",
                                description: "HTTP status code of the error",
                                minimum: 400,
                                maximum: 599,
                            },
                            message: {
                                type: "string",
                                description: "Human-readable error message",
                            },
                            name: {
                                type: "string",
                                description: "Error class name",
                            },
                        },
                        required: [],
                    },
                },
            },
            description: respDeco?.statusMess || "OK",
        };
    }
}


// Add authentication security and unauthorized response
function addAuthSecurity(paths: { [key: string]: any }, httpInfo: HttpInfo) {
    if (httpInfo.data?.isAuth) {
        paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["security"] = [{ BearerAuth: [] }];
        paths[expressToSwaggerPath(httpInfo.path)][httpInfo.method]["responses"][401] = {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        $schema: "http://json-schema.org/draft-07/schema#",
                        title: "UnauthorizedErrorResponse",
                        type: "object",
                        properties: {
                            code: {
                                type: "integer",
                                description: "HTTP status code of the error",
                                minimum: 400,
                                maximum: 599,
                            },
                            message: {
                                type: "string",
                                description: "Human-readable error message",
                            },
                            name: {
                                type: "string",
                                description: "Error class name",
                            },
                        },
                        required: [],
                    },
                },
            },
        };
    }
}

// Validate request data
function validateRequest(
    schema_zod: { [key: string]: z.ZodTypeAny },
    req: Request
) {
    const newData = {
        body: req.body,
        query: req.query,
        params: req.params,
    }
    for (const [key, schema] of Object.entries(schema_zod)) {
        if (key === "res") continue;
        const data = schema.safeParse((req as any)[key] || {});
        if (!data.success) {
            console.error("Validation error:", (req as any)[key]);
            throw new ZodBadRequestError(data.error);
        }

        (newData as any)[key] = data.data;
    }

    return newData;
}

// Authenticate request
function authenticateRequest(httpInfo: HttpInfo, req: Request): void {
    if (httpInfo.data?.isAuth) {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError("Authorization token is required");
        }
        const decoded = verifyAccessToken(token);
        (req as any).user = decoded.user;
    }
}

// Handle route execution
async function handleRoute(
    controller: any,
    propertyKey: string,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data = await controller[propertyKey](req, next);
    const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, data.constructor) as RespData;
    if (respDeco) {
        return res.send({
            code: respDeco?.statusCode || 200,
            message: respDeco?.statusMess || "OK",
            data,
        });
    }
    else {
        res.send(data);
    }
}

// Main router function
export function toRouter<T>(target: new () => T) {
    const router = Router();
    const paths: { [key: string]: any } = {};
    (router as any).swagger = paths;

    const controller = new target() as any;

    // Iterate through controller's own and prototype properties
    for (const propertyKey of [
        ...Object.getOwnPropertyNames(controller),
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
    ]) {
        const httpInfo = Reflect.getMetadata(HTTP_INFO_KEY, controller, propertyKey) as HttpInfo;
        const schemas = (Reflect.getMetadata(SCHEMA_RES_KEY, controller, propertyKey) as ApiSchemas) || {};
        const errors = (Reflect.getMetadata("exception", controller, propertyKey) as Error[]) || [];

        if (!httpInfo) continue;

        if (["get", "post", "put", "delete"].includes(httpInfo.method)) {
            const schema_zod = convertToZodSchemas(schemas);
            configurePath(paths, httpInfo, target, schema_zod, schemas);
            addResponseSchemas(paths, httpInfo, schemas);
            addErrorResponses(paths, httpInfo, errors);
            addAuthSecurity(paths, httpInfo);

            const middlewares = httpInfo.data?.middlewares || [];
            middlewares.push((req: Request, res: Response, next: NextFunction) => {
                if (!req.headers["content-type"]?.includes("multipart/form-data")) return next();
                if (req.file) {
                    req.body[req.file.fieldname] = new File([req.file.buffer], req.file.originalname, {
                        type: req.file.mimetype,
                    });
                }
                if (req.files) {
                    if (Array.isArray(req.files)) {
                        for (const file of req.files) {
                            req.body[file.fieldname] = new File([file.buffer], file.originalname, {
                                type: file.mimetype,
                            });
                        }
                    }
                    else {
                        for (const key of Object.keys(req.files)) {
                            req.body[key] = req.files[key].map((file: Express.Multer.File) => {
                                return new File([file.buffer], file.originalname, {
                                    type: file.mimetype,
                                });
                            });
                        }
                    }
                }

                console.log("Request body after multer:", req.body);
                next();
            });

            router[httpInfo.method](httpInfo.path, ...middlewares, async (req, res, next) => {
                const validateData = validateRequest(schema_zod, req);
                const _req = new Proxy(req, {
                    get(target, prop) {
                        if (prop in validateData) {
                            return (validateData as any)[prop];
                        }
                        return (target as any)[prop];
                    },
                })
                authenticateRequest(httpInfo, req);
                await handleRoute(controller, propertyKey, _req, res, next);
            });
        } else {
            const supRouter = toRouter(controller[propertyKey]);
            const swagger = (supRouter as any).swagger as { [key: string]: Object };
            for (const [key, val] of Object.entries(swagger)) {
                paths[httpInfo.path + key] = val;
            }

            if (httpInfo.path === "") throw new Error("Nested router path cannot be empty");
            router.use(httpInfo.path, supRouter);
        }
    }

    return router;
}
