import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class sendMessageReqBody {
    @IsString()
    content: string;
}
export class sendMessageReqQuery {}
export class sendMessageReqParams {
    @IsString()
    userId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class sendMessageRes {

}

export const schema = {
    res: [sendMessageRes],
    body: sendMessageReqBody,
    query: sendMessageReqQuery,
    params: sendMessageReqParams
};

export type Req = Request<sendMessageReqParams, any, sendMessageReqBody, sendMessageReqQuery> & RequestWithUser
