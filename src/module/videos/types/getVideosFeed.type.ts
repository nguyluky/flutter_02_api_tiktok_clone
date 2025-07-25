import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Formats, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { User } from "./share.type";

export class getVideosFeedReqBody {}
export class getVideosFeedReqQuery {
    @IsNumber({coerce: true, min: 1})
    limit: number = 10;
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

    @IsObject(User)
    user: User;
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
