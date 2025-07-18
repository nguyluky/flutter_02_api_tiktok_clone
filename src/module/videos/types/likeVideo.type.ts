import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class likeVideoReqBody {}
export class likeVideoReqQuery {}
export class likeVideoReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class likeVideoRes {}

export const schema = {
    res: [likeVideoRes],
    body: likeVideoReqBody,
    query: likeVideoReqQuery,
    params: likeVideoReqParams
};

export type Req = Request<likeVideoReqParams, any, likeVideoReqBody, likeVideoReqQuery> & RequestWithUser
