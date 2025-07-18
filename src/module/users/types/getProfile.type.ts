import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { Formats, IsNumber, IsString } from "@lib/type_declaration";

export class getProfileReqBody {}
export class getProfileReqQuery {}
export class getProfileReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getProfileRes {

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
    @IsNumber()
    followerCount: number;
    @IsNumber()
    followingCount: number;
    @IsNumber()
    postCount: number;

    constructor(data_?: Partial<getProfileRes>) {
        if (data_) {
            this.id = data_.id || '0';
            this.username = data_.username || "";
            this.email = data_.email || "";
            this.avatarUrl = data_.avatarUrl || null;
            this.bio = data_.bio || null;
            this.followerCount = data_.followerCount || 0;
            this.followingCount = data_.followingCount || 0;
            this.postCount = data_.postCount || 0;
        }
    }
}

export const schema = {
    res: [getProfileRes],
    body: getProfileReqBody,
    query: getProfileReqQuery,
    params: getProfileReqParams
};

export type Req = Request<getProfileReqParams, any, getProfileReqBody, getProfileReqQuery> & RequestWithUser
