import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsNumber, IsString } from "@lib/type_declaration";

export class followUserReqBody {}
export class followUserReqQuery {}
export class followUserReqParams {
    @IsString()
    id: string; // The ID of the user to follow
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class followUserRes {}

export const schema = {
    res: [followUserRes],
    body: followUserReqBody,
    query: followUserReqQuery,
    params: followUserReqParams
};

export type Req = Request<followUserReqParams, any, followUserReqBody, followUserReqQuery> & RequestWithUser;
