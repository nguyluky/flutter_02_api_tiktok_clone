import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { Formats, IsString } from "@lib/type_declaration";

export class signupReqBody {
    @IsString({format: Formats.email})
    email: string;
    @IsString()
    password: string;
}
export class signupReqQuery {}
export class signupReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class signupRes {
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
    res: [signupRes],
    body: signupReqBody,
    query: signupReqQuery,
    params: signupReqParams
};

export type Req = Request<signupReqParams, any, signupReqBody, signupReqQuery>;
