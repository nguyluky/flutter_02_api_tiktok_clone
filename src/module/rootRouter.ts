

import { Get, Use } from "@lib/httpMethod";
import AuthController from "./auth/controller";
import UsersController from "./users/controller";
import VideosController from "./videos/controller";
import CommentsController from "./comments/controller";
import ChatsController from "./chats/controller";

class RootRouter {
    @Use()
    auth = AuthController;

    @Use()
    users = UsersController;

    @Use()
    videos = VideosController;

    @Use()
    comments = CommentsController

    @Use()
    chats = ChatsController

}


export class ApiRouter {
    @Use()
    api = RootRouter
}
