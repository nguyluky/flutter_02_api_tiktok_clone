import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { Formats, IsObject, IsString } from "@lib/type_declaration";

export class addCommandReqBody {
    @IsString()
    content: string;
}
export class addCommandReqQuery {}
export class addCommandReqParams {
    @IsString()
    id: string;
}

class userCommandData {
    @IsString()
    id: string;

    @IsString()
    username: string;
    @IsString()
    avatarUrl: string;
}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class addCommandRes {
    @IsString()
    id: string;

    @IsString()
    content: string;

    @IsString({format: Formats["iso.datetime"]})
    createdAt: string;

    @IsObject(userCommandData)
    user: userCommandData;

    constructor(data?: {
        id: string;
        content: string;
        createdAt: string;
        user: userCommandData;
    }) {
        if (data) {
            this.id = data.id;
            this.content = data.content;
            this.createdAt = data.createdAt;
            this.user = data.user;
        } else {
            this.id = "";
            this.content = "";
            this.createdAt = new Date().toISOString();
            this.user = { id: "", username: "", avatarUrl: "" };
        }
    }
}

export const schema = {
    res: [addCommandRes],
    body: addCommandReqBody,
    query: addCommandReqQuery,
    params: addCommandReqParams
};

export type Req = Request<addCommandReqParams, any, addCommandReqBody, addCommandReqQuery> & RequestWithUser
