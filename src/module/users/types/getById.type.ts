import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Formats, IsBoolean, IsNumber, IsString } from "@lib/type_declaration";
import { RequestWithUser } from "@lib/toRouter";
import path from "path";

export class getByIdReqBody { }
export class getByIdReqQuery { }
export class getByIdReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getByIdRes {
    @IsNumber()
    id: string;
    @IsString()
    username: string;
    @IsString()
    email: string;

    @IsString({ optional: true })
    avatarUrl: string | null;
    @IsString({ optional: true })
    bio: string | null;
    @IsString({ format: Formats["iso.datetime"] })
    createdAt: Date;
    @IsString({ format: Formats["iso.datetime"] })
    updatedAt: Date;
    @IsBoolean({ optional: true })
    isFollowing?: boolean;

    constructor(data_?: Partial<getByIdRes>) {
        this.id = data_?.id || "";
        this.username = data_?.username || "";
        this.email = data_?.email || "";
        this.avatarUrl = data_?.avatarUrl || null;
        this.bio = data_?.bio || null;
        this.createdAt = data_?.createdAt || new Date();
        this.updatedAt = data_?.updatedAt || new Date();
        this.isFollowing = data_?.isFollowing || false;
    }
}

export const schema = {
    res: [getByIdRes],
    body: getByIdReqBody,
    query: getByIdReqQuery,
    params: getByIdReqParams
};

export type Req = Request<getByIdReqParams, any, getByIdReqBody, getByIdReqQuery> & RequestWithUser;
