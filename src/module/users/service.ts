import prisma from "config/prisma.config";
import * as UsersTypes from "./types/users.type";

export async function getAll(req: UsersTypes.GetAllReq) {
    // TODO: Logic query DB với req.query
    return [];
}

export async function getById(req: UsersTypes.GetByIdReq) {
    // TODO: Logic query DB với req.params
    return null;
}
