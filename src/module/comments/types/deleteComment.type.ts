import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class deleteCommentReqBody {}
export class deleteCommentReqQuery {}
export class deleteCommentReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class deleteCommentRes {}

export const schema = {
    res: [deleteCommentRes],
    body: deleteCommentReqBody,
    query: deleteCommentReqQuery,
    params: deleteCommentReqParams
};

export type Req = Request<deleteCommentReqParams, any, deleteCommentReqBody, deleteCommentReqQuery> & RequestWithUser
