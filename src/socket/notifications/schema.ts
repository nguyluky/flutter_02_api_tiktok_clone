import { SocketEmitEvent } from "@lib/socket_declaration";
import { MessageData } from "socket/chats/schema";

export class NewNotificationEvent extends SocketEmitEvent<MessageData> {
    constructor(data: MessageData, to?: string | string[]) {
        super('NewNotification', data, to);
    }
}
