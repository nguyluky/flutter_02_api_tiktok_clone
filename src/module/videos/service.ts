import prisma from "config/prisma.config";
import * as VideosTypes from "./types/videos.type";

export async function getAll(req: VideosTypes.GetAllReq) {
    // TODO: Logic query DB với req.query
    return [];
}

export async function getById(req: VideosTypes.GetByIdReq) {
    // TODO: Logic query DB với req.params
    return null;
}
