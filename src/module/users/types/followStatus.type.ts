import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsBoolean, IsNumber, IsString } from "@lib/type_declaration";

export class followStatusReqBody {}
export class followStatusReqQuery {}
export class followStatusReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class followStatusRes {
    @IsNumber()
    followerCount: number;

    @IsNumber()
    followingCount: number;

    @IsNumber()
    postCount: number;

    @IsBoolean()
    isFollowing: boolean;

    constructor(data: {
        followerCount: number;
        followingCount: number;
        postCount: number;
        isFollowing: boolean;
    }) {
        this.followerCount = data?.followerCount || 0;
        this.followingCount = data?.followingCount || 0;
        this.postCount = data?.postCount || 0;
        this.isFollowing = data?.isFollowing || false;
    }
}

export const schema = {
    res: [followStatusRes],
    body: followStatusReqBody,
    query: followStatusReqQuery,
    params: followStatusReqParams
};

export type Req = Request<followStatusReqParams, any, followStatusReqBody, followStatusReqQuery> & RequestWithUser;
