import { generateSocketDocs } from "@lib/socket_docs_generator";
import { SocketEventEmitter, toSocketRouterSchema, toSocketServer } from "@lib/toSocketRouter";
import { SocketChatController } from "socket/chats/controller";
import { SocketNotificationController } from "socket/notifications/controller";

const socketControllers = [
    SocketChatController,
    SocketNotificationController
];

const socketSchemas = toSocketRouterSchema(socketControllers);

export function setupSocketServer(io: any) {
    // Setup socket server with generated schemas
    toSocketServer(io, socketSchemas);
    new SocketEventEmitter(io);

    // const asy
    console.log(JSON.stringify(generateSocketDocs(socketControllers), null, 2));

    // Log available namespaces and events
    console.log(`Generated ${socketSchemas.length} socket namespaces`);
    for (const schema of socketSchemas) {
        console.log(`  - ${schema.namespacePath} (${schema.events.length} events)`);
        console.log(`    Auth required: [${schema.namespaceInfo.auth?.map(auth => auth.constructor.name).join(', ')}]`);
        for (const event of schema.events) {
            console.log(`    • ${event.eventName} (${event.eventInfo.type})`);
        }
    }
}