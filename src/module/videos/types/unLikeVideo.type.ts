import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class unLikeVideoReqBody {}
export class unLikeVideoReqQuery {}
export class unLikeVideoReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class unLikeVideoRes {}

export const schema = {
    res: [unLikeVideoRes],
    body: unLikeVideoReqBody,
    query: unLikeVideoReqQuery,
    params: unLikeVideoReqParams
};

export type Req = Request<unLikeVideoReqParams, any, unLikeVideoReqBody, unLikeVideoReqQuery> & RequestWithUser;
