import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class deleteChatReqBody {}
export class deleteChatReqQuery {}
export class deleteChatReqParams {
    @IsString()
    userId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class deleteChatRes {}

export const schema = {
    res: [deleteChatRes],
    body: deleteChatReqBody,
    query: deleteChatReqQuery,
    params: deleteChatReqParams
};

export type Req = Request<deleteChatReqParams, any, deleteChatReqBody, deleteChatReqQuery> & RequestWithUser;
