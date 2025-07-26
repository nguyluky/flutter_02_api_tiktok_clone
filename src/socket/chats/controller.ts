import { SocketController } from "@lib/socket_declaration";
import { verifyAccessToken } from "@utils/jwt";

import prisma from "config/prisma.config";
import { Socket } from "socket.io";
import { NewMessageEvent, SendMessageData } from "./schema";


export class SocketChatController extends SocketController {
    path: string = "/chat";

    useAuth(socket: any, next: any): void {
        console.log("Authenticating socket connection...");
        const token = socket.handshake.query.token as string;

        if (!token) {
            console.error("Authentication error: No token provided");
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const user = verifyAccessToken(token);
            socket.data = user; // Store user data in socket
            console.log("User authenticated:", user);
            next();
        }
        catch (error) {
            console.error("Authentication error:", error);
            next(new Error("Authentication error: Invalid token"));
        }
    }

    onConnect(client: Socket): void {
        client.join(this.path + ":" + client.data.user.id);
    }

    async onSendMessage(client: Socket, data: SendMessageData) {
        console.log("Handling send message event", data);

        const userId = client.data.user.id;
        const message = data.message
        const recipientId = data.recipientId

        await prisma.message.create({
            data: {
                senderId: userId,
                receiverId: recipientId,
                content: message
            }
        })

        if (!message || message.trim() === "") {
            client.emit("error", { message: "Message cannot be empty" });
            return;
        }

        return new NewMessageEvent({
            senderId: userId,
            recipientId: recipientId,
            message: message
        }, `${this.path}:${recipientId}`); // Emit to recipient's room
    }


}
