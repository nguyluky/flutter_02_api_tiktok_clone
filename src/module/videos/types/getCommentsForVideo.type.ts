import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Formats, IsArray, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";
import { User } from "./share.type";

export class getCommentsForVideoReqBody {}
export class getCommentsForVideoReqQuery {}
export class getCommentsForVideoReqParams {
    @IsString()
    id: string;
}

class Comment {
    @IsString()
    id: string;
    
    @IsString()
    content: string;

    @IsString({format: Formats["iso.datetime"]})
    createdAt: string;

    @IsObject(User)
    user: User;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getCommentsForVideoRes {
    @IsNumber()
    total: number;
    @IsArray(toSchema(Comment)!)
    results: Comment[];

    constructor(data?: Partial<getCommentsForVideoRes>) {
        this.total = data?.total || 0;
        this.results = data?.results || [];
    }
}

export const schema = {
    res: [getCommentsForVideoRes],
    body: getCommentsForVideoReqBody,
    query: getCommentsForVideoReqQuery,
    params: getCommentsForVideoReqParams
};

export type Req = Request<getCommentsForVideoReqParams, any, getCommentsForVideoReqBody, getCommentsForVideoReqQuery>;
