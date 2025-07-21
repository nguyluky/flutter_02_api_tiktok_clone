// TODO: 
// - [ ] convert class declaration to routerSchema
// - [ ] convert routerSchema to express router
// - [ ] convert routerSchema to swagger schema

import { Express, Router } from "express";
import { HTTP_INFO_KEY, HttpInfo } from "./httpMethod";

interface RouterSchema {
    httpInfo: HttpInfo;
    target_class: any;
    handler: any;
    subRouter?: RouterSchema[];
}

export function toRouterSchema(target: any): RouterSchema[] {
    const routerSchema: RouterSchema[] = [];
    const controller = new target() as any;

    const methods = [
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
        ...Object.getOwnPropertyNames(controller)
    ]

    for (const method of methods) {
        const httpInfo: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, controller, method) as HttpInfo;
        if (!httpInfo) continue;

        if (httpInfo.method == 'use') {
            const subRouterSchema: RouterSchema[] = toRouterSchema(controller[method]);
            const schema: RouterSchema = {
                httpInfo,
                target_class: target,
                handler: controller[method].bind(controller),
                subRouter: subRouterSchema
            };
            routerSchema.push(schema);
        }

        else {
            const schema: RouterSchema = {
                httpInfo,
                target_class: target,
                handler: controller[method].bind(controller)
            };
            routerSchema.push(schema);
        }
    }
    return routerSchema;
}
