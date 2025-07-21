import { IsNumber, IsString } from "@lib/type_declaration";

export class User {
    @IsString()
    id: string;
    @IsNumber()
    username: string;
    @IsNumber()
    avatarUrl: string;
}
