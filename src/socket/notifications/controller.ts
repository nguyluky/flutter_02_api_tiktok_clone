import { SocketController } from "@lib/socket_declaration";
import { verifyAccessToken } from "@utils/jwt";


export class SocketNotificationController extends SocketController {
    path: string = "/notification";

    useAuth(socket: any, next: any): void {
        console.log("Authenticating socket connection...");
        const token = socket.handshake.query.token as string;

        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const user = verifyAccessToken(token);
            socket.data.user = user; // Store user data in socket
            next();
        }
        catch (error) {
            console.error("Authentication error:", error);
            next(new Error("Authentication error: Invalid token"));
        }
    }

    onConnect(client: any): void {
        client.join(this.path + ":" + client.data.user.id);
    }
}
