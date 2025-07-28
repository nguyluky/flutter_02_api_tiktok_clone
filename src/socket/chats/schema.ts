import { SocketEmitEvent } from "@lib/socket_declaration";
import { IsString } from "@lib/type_declaration";

export class MessageData {
    @IsString()
    senderId: string;
    @IsString()
    recipientId: string;
    @IsString()
    message: string;
}

export class SendMessageData {
    @IsString()
    message: string;
    @IsString()
    recipientId: string;
}




// ==================
export class NewMessageEvent extends SocketEmitEvent<MessageData> {
    constructor(data: MessageData, to?: string | string[]) {
        super('NewMessage', data, to);
    }
}

export const schema = [NewMessageEvent]
