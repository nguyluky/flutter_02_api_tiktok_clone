import { JWT_AUTH, verifyAccessToken } from "@utils/jwt";
import prisma from "config/prisma.config";
import { Socket } from "socket.io";
import { SocketController, SocketEmitEvent } from "../../lib/socket_declaration";
import {
    SocketBidirectional,
    SocketEmit,
    SocketEvent,
    SocketEventType,
    SocketListen,
    SocketNamespace,
    SocketRequest,
    SocketResponse
} from "../../lib/socket_decorators";
import { NewMessageEvent, ReadMessageData, SendMessageData } from "./schema";

@SocketNamespace('/chat', { 
    description: 'Real-time chat functionality',
    auth: [JWT_AUTH]
})
export class SocketChatController extends SocketController {

    @SocketListen('SendMessage', {
        description: 'Send a message to another user',
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

        return this.emitNewMessage(userId, recipientId, message, savedMessage);
    }

    @SocketEmit('NewMessage', {
        description: 'New message received from another user'
    })
    @SocketResponse(NewMessageEvent)
    emitNewMessage(userId: string, recipientId: string, message: string, savedMessage: any) {
        return new SocketEmitEvent<NewMessageEvent>('NewMessage', {
            id: savedMessage.id,
            senderId: userId,
            recipientId: recipientId,
            message: message,
            timestamp: savedMessage.createdAt
        }, recipientId); // Target specific user

    }

    @SocketListen('ReadMessage', {
        description: 'Mark a message as read',
    })
    @SocketRequest(ReadMessageData) 
    async onReadMessage(client: Socket, data: ReadMessageData) {
        
        await prisma.message.updateMany({
            where: {
                id: data.messageId,
                receiverId: client.data.user.id, // Ensure the user is the recipient
                isSeen: false // Only update if not already seen
            },
            data: {
                isSeen: true,
            }
        })

    }
}
