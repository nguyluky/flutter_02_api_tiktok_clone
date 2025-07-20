import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { IsArray, IsEnum, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";
import z from "zod/v4";

export class searchReqBody {}
export class searchReqQuery {
    @IsString()
    q: string;
    @IsEnum({
        value: ["user", "post"],
    })
    type: "user" | "post" = "post"; // Default to "post" if not provided
    @IsNumber({coerce: true, min: 1})
    page: number = 1;
    @IsNumber({coerce: true, min: 1})
    limit: number = 10;
}
export class searchReqParams {}


class User {
    @IsString()
    id: string;
    @IsString()
    username: string;
    @IsString()
    avatarUrl: string;
}

class Video {
    @IsString()
    id: string;
    @IsString()
    title: string;
    @IsString()
    thumbnail: string;
    @IsObject(User)
    user: User;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class searchRes {
    @IsNumber()
    page: number;
    @IsNumber()
    limit: number;
    @IsNumber()
    total: number;
    @IsNumber()
    totalPage: number;

    @IsArray(z.union([toSchema(User),toSchema(Video)]))
    results: (User | Video)[];

    constructor(data?: searchRes) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export const schema = {
    res: [searchRes],
    body: searchReqBody,
    query: searchReqQuery,
    params: searchReqParams
};

export type Req = Request<searchReqParams, any, searchReqBody, searchReqQuery>;
