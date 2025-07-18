import prisma from "config/prisma.config";
import * as ChatsTypes from "./types/chats.type";

export async function getAll(req: ChatsTypes.GetAllReq) {
    // TODO: Logic query DB với req.query
    return [];
}

export async function getById(req: ChatsTypes.GetByIdReq) {
    // TODO: Logic query DB với req.params
    return null;
}
