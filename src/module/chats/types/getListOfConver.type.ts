import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsArray, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";

export class getListOfConverReqBody {}
export class getListOfConverReqQuery {}
export class getListOfConverReqParams {}


class userDetails {
    @IsString()
    id: string;
    @IsString()
    username: string;
    @IsString()
    avatarUrl: string;
}

class lastMessage {
    @IsString()
    id: string;
    @IsString()
    content: string;
    @IsString()
    createdAt: string;

    @IsObject(userDetails)
    sender: userDetails;
    @IsObject(userDetails)
    receiver: userDetails;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getListOfConverRes {
    @IsNumber()
    total: number;

    @IsArray(toSchema(lastMessage))
    results: lastMessage[];

    constructor(data?: Partial<getListOfConverRes>) {
        this.total = data?.total || 0;
        this.results = data?.results || [];
    }
}

export const schema = {
    res: [getListOfConverRes],
    body: getListOfConverReqBody,
    query: getListOfConverReqQuery,
    params: getListOfConverReqParams
};

export type Req = Request<getListOfConverReqParams, any, getListOfConverReqBody, getListOfConverReqQuery> & RequestWithUser
