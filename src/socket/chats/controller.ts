import { JWT_AUTH, verifyAccessToken } from "@utils/jwt";
import prisma from "config/prisma.config";
import { Socket } from "socket.io";
import { SocketController, SocketEmitEvent } from "../../lib/socket_declaration";
import {
    SocketBidirectional,
    SocketEmit,
    SocketListen,
    SocketNamespace,
    SocketRequest,
    SocketResponse
} from "../../lib/socket_decorators";
import { NewMessageEvent, SendMessageData } from "./schema";

@SocketNamespace('/chat', { 
    description: 'Real-time chat functionality',
    auth: [JWT_AUTH]
})
export class SocketChatController extends SocketController {



    onConnect(client: Socket): void {
        const userId = client.data.user.id;
        client.join(`/chat:${userId}`);
        console.log(`User ${userId} joined chat room`);
    }

    @SocketBidirectional('JoinRoom', {
        description: 'Join a chat room',
    })
    @SocketRequest(SendMessageData)
    @SocketResponse(SendMessageData)
    test(client: Socket, data: { roomId: string }) {
        console.log("Joining room", data);

    }

    @SocketListen('SendMessage', {
        description: 'Send a message to another user',
        example: { recipientId: "user123", message: "Hello there!" }
    })
    @SocketRequest(SendMessageData)
    async onSendMessage(client: Socket, data: SendMessageData) {
        console.log("Handling send message event", data);

        const userId = client.data.user.id;
        const message = data.message;
        const recipientId = data.recipientId;

        if (!message || message.trim() === "") {
            client.emit("error", { message: "Message cannot be empty" });
            return;
        }

        // Save to database
        const savedMessage = await prisma.message.create({
            data: {
                senderId: userId,
                receiverId: recipientId,
                content: message
            }
        });

        // Return event to emit to recipient
        return new SocketEmitEvent('NewMessage', {
            id: savedMessage.id,
            senderId: userId,
            recipientId: recipientId,
            message: message,
            timestamp: savedMessage.createdAt
        }, recipientId); // Target specific user
    }

    @SocketEmit('NewMessage', {
        description: 'New message received from another user'
    })
    @SocketResponse(NewMessageEvent)
    emitNewMessage() {
        // This method defines the response schema for documentation
        // Actual emission is handled by returning SocketEmitEvent from onSendMessage
    }
}
