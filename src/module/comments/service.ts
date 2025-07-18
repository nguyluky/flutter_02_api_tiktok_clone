import prisma from "config/prisma.config";
import * as CommentsTypes from "./types/comments.type";

export async function getAll(req: CommentsTypes.GetAllReq) {
    // TODO: Logic query DB với req.query
    return [];
}

export async function getById(req: CommentsTypes.GetByIdReq) {
    // TODO: Logic query DB với req.params
    return null;
}
