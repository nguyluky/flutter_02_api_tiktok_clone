import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Formats, IsString } from "@lib/type_declaration";

export class loginReqBody {
    @IsString({format: Formats.email})
    email: string;
    @IsString()
    password: string;
}
export class loginReqQuery {}
export class loginReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class loginRes {
    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export const schema = {
    res: [loginRes],
    body: loginReqBody,
    query: loginReqQuery,
    params: loginReqParams
};

export type Req = Request<loginReqParams, any, loginReqBody, loginReqQuery>;
