import * as deleteCommentType from "./types/deleteComment.type";
import { Delete, Get, IsAuth, Post } from "@lib/httpMethod";
import prisma from "config/prisma.config";
import { Validate } from "@lib/validate";
import { NotFoundError } from "@utils/exception";

export default class CommentsController {

    @Delete("/:id")
    @IsAuth()
    @Validate(deleteCommentType.schema)
    async deleteComment(req: deleteCommentType.Req) {
        const currentUserId = req.user.id;
        const commentId = req.params.id;

        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                userId: currentUserId,
            },
        });

        if (!comment) {
            throw new NotFoundError("Comment not found or you do not have permission to delete this comment.");
        }

        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        return new deleteCommentType.deleteCommentRes();
    }

}
