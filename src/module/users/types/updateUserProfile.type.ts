import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { Formats, IsNumber, IsString } from "@lib/type_declaration";

export class updateUserProfileReqBody {
    @IsString({optional: true})
    username?: string
    @IsString({optional: true, format: Formats.email})
    email?:  string
    @IsString({optional: true})
    avatarUrl?:  string
    @IsString({optional: true})
    bio?:  string
}
export class updateUserProfileReqQuery {}
export class updateUserProfileReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class updateUserProfileRes {}

export const schema = {
    res: [updateUserProfileRes],
    body: updateUserProfileReqBody,
    query: updateUserProfileReqQuery,
    params: updateUserProfileReqParams
};

export type Req = Request<updateUserProfileReqParams, any, updateUserProfileReqBody, updateUserProfileReqQuery> & RequestWithUser;
