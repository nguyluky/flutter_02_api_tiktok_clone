import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { IsArray, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";

export class videosReqBody {}
export class videosReqQuery {
    @IsNumber({coerce: true,min: 1})
    page: number = 1;
    @IsNumber({coerce: true,min: 1})
    limit: number = 10;
}
export class videosReqParams {
    @IsString()
    id: string;
}


class VideosUser {
    @IsString()
    id: string;
    @IsString()
    username: string;
    @IsString()
    avatarUrl: string;
}

class videosResItem {
    @IsString()
    id: string;
    @IsString()
    title: string;
    @IsString()
    thumbnail: string;
    @IsObject(VideosUser)
    user: VideosUser;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class videosRes {
    @IsNumber()
    page: number;
    @IsNumber()
    limit: number;
    @IsNumber()
    total: number;
    @IsNumber()
    totalPage: number;

    @IsArray(toSchema(videosResItem))
    results: videosResItem[];

    constructor(data?: videosRes) {
        if (data) Object.assign(this, data);
    }
}

export const schema = {
    res: [videosRes],
    body: videosReqBody,
    query: videosReqQuery,
    params: videosReqParams
};

export type Req = Request<videosReqParams, any, videosReqBody, videosReqQuery>;
