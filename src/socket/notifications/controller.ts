import { SocketController } from "@lib/socket_declaration";
import { verifyAccessToken } from "@utils/jwt";


export class SocketNotificationController extends SocketController {
    path: string = "/notifications";

    useAuth(socket: any, next: any): void {
        console.log("SocketNotificationController useAuth called");
        // const token = socket.handshake.query.token as string;
        //
        // if (!token) {
        //     return next(new Error("Authentication error: No token provided"));
        // }
        //
        // try {
        //     const user = verifyAccessToken(token);
        //     socket.data.user = user; // Store user data in socket
        //     next();
        // }
        // catch (error) {
        //     console.error("Authentication error:", error);
        //     next(new Error("Authentication error: Invalid token"));
        // }

        // socket.emit("hello", "Hello from SocketNotificationController");
        next();
    }

    onConnect(client: any): void {
        console.log("Client connected:", client.id);
        // client.join(this.path + ":" + client.data.user.id);
        client.emit("hello", "Hello from SocketNotificationController");
    }


    onmark_as_read(client: any, data: any): void {
        console.log("onmark_as_read called with data:", data);
        client.emit("notification_read", { message: "Notification marked as read", data });
    }
    
    
}
