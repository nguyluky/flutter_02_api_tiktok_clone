import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsArray, IsNumber, IsString, toSchema } from "@lib/type_declaration";
import { User } from "./share.type";

export class listUsersLikedReqBody {}
export class listUsersLikedReqQuery {}
export class listUsersLikedReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class listUsersLikedRes {
    @IsNumber()
    total: number;

    @IsArray(toSchema(User)!)
    results: User[];

    constructor(data?: {
        total: number;
        results: User[];
    }) {
        if (data) {
            this.total = data.total;
            this.results = data.results;
        } else {
            this.total = 0;
            this.results = [];
        }
    }
}

export const schema = {
    res: [listUsersLikedRes],
    body: listUsersLikedReqBody,
    query: listUsersLikedReqQuery,
    params: listUsersLikedReqParams
};

export type Req = Request<listUsersLikedReqParams, any, listUsersLikedReqBody, listUsersLikedReqQuery> & RequestWithUser;
