import * as SocketIO from 'socket.io';
import { SocketChatController } from './chats/controller';
import { SocketNotificationController } from './notifications/controller';

const chatController = new SocketChatController();
const notificationController = new SocketNotificationController();
export default function InitSocketIO(io: SocketIO.Server) {
    chatController.register(io);
    notificationController.register(io);
}
