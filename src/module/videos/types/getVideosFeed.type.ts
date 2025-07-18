import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Formats, IsNumber, IsObject, IsString } from "@lib/type_declaration";

export class getVideosFeedReqBody {}
export class getVideosFeedReqQuery {
    @IsNumber()
    limit: number = 10;
}


class VideosUser {
    @IsString()
    id: string;
    @IsNumber()
    username: string;
    @IsNumber()
    avatarUrl: string;
}

class getVideosFeedResItem {
    @IsString()
    id: string;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    videoUrl: string;
    @IsString()
    thumbnail: string;
    @IsString({format: Formats["iso.datetime"]})
    createdAt: string;
    @IsNumber()
    likesCount: number;
    @IsNumber()
    commentsCount: number;

    @IsObject(VideosUser)
    user: VideosUser;
}

export class getVideosFeedReqParams {

}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getVideosFeedRes {
    @IsNumber()
    limit: number;

    @IsNumber()
    total: number;

    @IsNumber()
    totalPage: number;

    @IsObject(getVideosFeedResItem)
    results: getVideosFeedResItem[];

    constructor(data: Partial<getVideosFeedRes>) {
        Object.assign(this, data);
    }
}

export const schema = {
    res: [getVideosFeedRes],
    body: getVideosFeedReqBody,
    query: getVideosFeedReqQuery,
    params: getVideosFeedReqParams
};

export type Req = Request<getVideosFeedReqParams, any, getVideosFeedReqBody, getVideosFeedReqQuery>;
