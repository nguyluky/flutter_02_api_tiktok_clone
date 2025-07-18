import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { IsString } from "@lib/type_declaration";

export class getVideoByIdReqBody {}
export class getVideoByIdReqQuery {}
export class getVideoByIdReqParams {
    @IsString()
    id: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class getVideoByIdRes {}

export const schema = {
    res: [getVideoByIdRes],
    body: getVideoByIdReqBody,
    query: getVideoByIdReqQuery,
    params: getVideoByIdReqParams
};

export type Req = Request<getVideoByIdReqParams, any, getVideoByIdReqBody, getVideoByIdReqQuery> & RequestWithUser;
