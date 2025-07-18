import { SocketEmitEvent } from "@lib/socket_declaration";

export class MessageData {
    senderId: string;
    recipientId: string;
    message: string;
}

export class SendMessageData {
    message: string;
    recipientId: string;
}




// ==================
export class NewMessageEvent extends SocketEmitEvent<MessageData> {
    constructor(data: MessageData, to?: string | string[]) {
        super('NewMessage', data, to);
    }
}
