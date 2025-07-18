import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { IsNumber, IsString } from "@lib/type_declaration";
import { RequestWithUser } from "@lib/toRouter";

export class unFollowUserReqBody {}
export class unFollowUserReqQuery {}
export class unFollowUserReqParams {
    @IsString()
    id: string; // The ID of the user to follow
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class unFollowUserRes {}

export const schema = {
    res: [unFollowUserRes],
    body: unFollowUserReqBody,
    query: unFollowUserReqQuery,
    params: unFollowUserReqParams
};

export type Req = Request<unFollowUserReqParams, any, unFollowUserReqBody, unFollowUserReqQuery> & RequestWithUser
