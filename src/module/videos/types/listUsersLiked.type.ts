import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsArray, IsNumber, IsString, toSchema } from "@lib/type_declaration";

export class listUsersLikedReqBody {}
export class listUsersLikedReqQuery {}
export class listUsersLikedReqParams {
    @IsString()
    id: string;
}

class listUsersLikedResData {
    @IsString()
    id: string;

    @IsString()
    username: string;

    @IsString()
    avatarUrl: string;

}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class listUsersLikedRes {
    @IsNumber()
    total: number;

    @IsArray(toSchema(listUsersLikedResData))
    results: listUsersLikedResData[];

    constructor(data?: {
        total: number;
        results: listUsersLikedResData[];
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
