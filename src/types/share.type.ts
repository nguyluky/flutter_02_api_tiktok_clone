import { IsString } from "@lib/type_declaration";

export class User {
    @IsString()
    id: string;
    @IsString()
    username: string;
    @IsString()
    avatarUrl: string;
}
