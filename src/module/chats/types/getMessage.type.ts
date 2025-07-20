import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsArray, IsNumber, IsObject, IsString, toSchema } from "@lib/type_declaration";

export class getMessageReqBody {}
export class getMessageReqQuery {
    @IsNumber({coerce: true,min: 1})
    page: number = 1;
    @IsNumber({coerce: true,min: 1})
    limit: number = 10;
}
export class getMessageReqParams {
    @IsString()
    userId: string;
}

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
}) class getMessageRes {
    @IsNumber()
    total: number;

    @IsArray(toSchema(lastMessage))
    results: lastMessage[];

    constructor(data?: Partial<getMessageRes>) {
        this.total = data?.total || 0;
        this.results = data?.results || [];
    }
}

export const schema = {
    res: [getMessageRes],
    body: getMessageReqBody,
    query: getMessageReqQuery,
    params: getMessageReqParams
};

export type Req = Request<getMessageReqParams, any, getMessageReqBody, getMessageReqQuery> & RequestWithUser
