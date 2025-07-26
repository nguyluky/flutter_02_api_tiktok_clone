import { Description, Get, Summary } from "@lib/httpMethod";
import { swagger } from "@lib/swagget";
import { RouterSchema, toSwaggerSchema } from "@lib/toRouter";
import * as fs from "fs";
import z from "zod/v4";

const asyncApi = {
    name: "My Realtime API",
    description: "Hệ thống socket.io hỗ trợ nhiều namespace với cơ chế xác thực JWT",
    version: "1.0.0",
    servers: [
        { url: "wss://api.example.com", description: "Production server" },
        { url: "ws://localhost:3000", description: "Local development" }
    ],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    username: { type: "string" }
                },
                required: ["id", "username"]
            },
            Message: {
                type: "object",
                properties: {
                    sender: { type: "string" },
                    content: { type: "string" },
                    timestamp: { type: "string", format: "date-time" }
                },
                required: ["sender", "content"]
            },
            Notification: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                    body: { type: "string" },
                    read: { type: "boolean" }
                },
                required: ["id", "title", "body"]
            }
        },
        securitySchemes: {
            JWTAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Xác thực bằng JSON Web Token (gửi qua socket.handshake.auth.token)"
            }
        }
    },
    security: [
        { scheme: "JWTAuth" }
    ],
    name_spaces: [
        {
            name: "/chat",
            description: "Namespace dành cho tính năng chat",
            emits: [
                {
                    name: "new_message",
                    description: "Server gửi tin nhắn mới cho client",
                    schema: {
                        $ref: "#/components/schemas/Message"
                    }
                },
                {
                    name: "user_typing",
                    description: "Server thông báo người dùng đang nhập",
                    schema: {
                        type: "object",
                        properties: {
                            user: { $ref: "#/components/schemas/User" },
                            roomId: { type: "string" }
                        },
                        required: ["user", "roomId"]
                    }
                }
            ],
            listens: [
                {
                    name: "send_message",
                    description: "Client gửi tin nhắn lên server",
                    schema: {
                        type: "object",
                        properties: {
                            roomId: { type: "string", minLength: 1 },
                            message: { $ref: "#/components/schemas/Message" }
                        },
                        required: ["roomId", "message"]
                    }
                },
                {
                    name: "join_room",
                    description: "Client tham gia một phòng chat",
                    schema: {
                        type: "object",
                        properties: {
                            roomId: { type: "string", minLength: 1 }
                        },
                        required: ["roomId"]
                    }
                }
            ],
            security: [
                { scheme: "JWTAuth" }
            ]
        },
        {
            name: "/notifications",
            description: "Namespace để nhận thông báo hệ thống",
            emits: [
                {
                    name: "system_alert",
                    description: "Server gửi cảnh báo hệ thống",
                    schema: {
                        type: "object",
                        properties: {
                            level: { type: "string", enum: ["info", "warning", "error"] },
                            message: { type: "string" }
                        },
                        required: ["level", "message"]
                    }
                },
                {
                    name: "friend_request",
                    description: "Server gửi lời mời kết bạn",
                    schema: {
                        type: "object",
                        properties: {
                            from: { $ref: "#/components/schemas/User" }
                        },
                        required: ["from"]
                    }
                }
            ],
            listens: [
                {
                    name: "mark_as_read",
                    description: "Client đánh dấu thông báo đã đọc",
                    schema: {
                        type: "object",
                        properties: {
                            notificationId: { type: "string", minLength: 1 }
                        },
                        required: ["notificationId"]
                    }
                }
            ],
            security: [
                { scheme: "JWTAuth" }
            ]
        },
        {
            name: "/public",
            description: "Namespace công khai, không yêu cầu xác thực",
            emits: [
                {
                    name: "news_update",
                    description: "Server gửi tin tức mới",
                    schema: {
                        type: "object",
                        properties: {
                            headline: { type: "string" },
                            link: { type: "string", format: "uri" }
                        },
                        required: ["headline", "link"]
                    }
                }
            ],
            listens: [
                {
                    name: "subscribe_news",
                    description: "Client đăng ký nhận tin tức",
                    schema: {
                        type: "unknown"
                    }
                }
            ]
        }
    ]
};


export default class SwaggerController {
    swagger: any;
    layout: string;

    constructor(apiRouter: RouterSchema[]) {
        // const swaggerSchema = toSwaggerSchema(apiRouter);
        // this.swagger = {
        //     ...swagger,
        //     paths: swaggerSchema,
        // };

        this.swagger = toSwaggerSchema(apiRouter, swagger);

        this.swagger.components = this.swagger.components || {};
        const globalShema = z.toJSONSchema(z.globalRegistry, {
            uri: (id: string) => `#/components/schemas/${id}`,
        });
        this.swagger.components = { ...this.swagger.components, ...globalShema };

        this.swagger.servers = this.swagger.servers || [];
        this.swagger.servers.push({
            url: process.env.PORT ? `http://localhost:${process.env.PORT}` : "http://localhost:3000",
            description: "Local development server"
        });

        this.layout = "responsive"
        fs.writeFile('swagger.json', JSON.stringify(this.swagger, null, 2), (err) => {
            if (err) {
                console.error("Error writing swagger.json:", err);
            } else {
                console.log("swagger.json has been saved.");
            }
        })
    }

    @Get("/swagger.json")
    @Summary("Get Swagger JSON")
    @Description("Get the Swagger/OpenAPI JSON specification")
    GetSwaggerFile() {
        return this.swagger;
    }

    @Get("/asyncApi.json")
    @Summary("Get Swagger JSON")
    @Description("Get the Swagger/OpenAPI JSON specification")
    GetAsyncApiFile() {
        return asyncApi;
    }


    @Get("/")
    @Summary("Swagger UI")
    @Description("View API documentation with Swagger UI")
    SwaggerUI() {
        const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>
    ${this.swagger.info.title} - API Documentation
    </title>
  
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body>

    <elements-api
      apiDescriptionUrl="/docs/swagger.json"
      router="hash"
      layout="${this.layout}"
    />

  </body>
</html>
`
        return html;
    }
}
