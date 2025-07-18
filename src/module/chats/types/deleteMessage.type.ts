import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class deleteMessageReqBody {}
export class deleteMessageReqQuery {}
export class deleteMessageReqParams {
    @IsString()
    messageId: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class deleteMessageRes {}

export const schema = {
    res: [deleteMessageRes],
    body: deleteMessageReqBody,
    query: deleteMessageReqQuery,
    params: deleteMessageReqParams
};

export type Req = Request<deleteMessageReqParams, any, deleteMessageReqBody, deleteMessageReqQuery> & RequestWithUser;
