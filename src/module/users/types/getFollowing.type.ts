import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsArray, IsString, toSchema } from "@lib/type_declaration";

export class getFollowingReqBody {}
export class getFollowingReqQuery {}
export class getFollowingReqParams {}


class FollowingUser {
    @IsString()
    id: string;
    @IsString()
    username: string;
    @IsString({optional: true})
    avatarUrl?: string | null;
    @IsString({optional: true})
    bio?: string | null;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getFollowingRes {

    userId: string;
    @IsArray(toSchema(FollowingUser))
    following: FollowingUser[];

    constructor(userId: string, following: FollowingUser[]) {
        this.userId = userId;
        this.following = following;
    } 
}

export const schema = {
    res: [getFollowingRes],
    body: getFollowingReqBody,
    query: getFollowingReqQuery,
    params: getFollowingReqParams
};

export type Req = Request<getFollowingReqParams, any, getFollowingReqBody, getFollowingReqQuery> & RequestWithUser;
