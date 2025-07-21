import "reflect-metadata";
import { ApiRequestStatus } from "@lib/httpMethod";
import { Request } from "express";
import { RequestWithUser } from "@lib/toRouter";
import { ContextType, Formats, IsFile, IsObject, IsString } from "@lib/type_declaration";
import { videosRes } from "module/users/types/videos.type";
import multer from "multer";
import { User } from "./share.type";

export @ContextType('multipart/form-data')
class uploadVideoReqBody {
    @IsFile({
        allowedTypes: "video/mp4",
        maxSize: 100 * 1024 * 1024, // 100 MB
    })
    video: File;

    @IsString()
    title: string;

    @IsString({ optional: true })
    description?: string;
}
export class uploadVideoReqQuery {}
export class uploadVideoReqParams {}

export @ApiRequestStatus({
    statusCode: 200,
    statusMess: "Success"
}) class uploadVideoRes {
    @IsString()
    id: string;
    @IsString()
    title: string;
    @IsString({ optional: true })
    description?: string;
    @IsString()
    videoUrl: string;
    @IsString({ optional: true })
    thumbnail?: string;
    @IsString({format: Formats["iso.datetime"]})
    createdAt: string

    @IsObject(User)
    user: User;

    constructor(data: Partial<uploadVideoRes>) {
        Object.assign(this, data);
    }
}

export const schema = {
    res: [uploadVideoRes],
    body: uploadVideoReqBody,
    query: uploadVideoReqQuery,
    params: uploadVideoReqParams
};

export type Req = Request<uploadVideoReqParams, any, uploadVideoReqBody, uploadVideoReqQuery> & RequestWithUser;
