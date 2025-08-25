import { Delete, Description, useAuth, Summary } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import { NotFoundError } from "@utils/exception";
import prisma from "config/prisma.config";
import * as deleteCommentType from "./types/deleteComment.type";
import { JWT_AUTH } from "@utils/jwt";

export default class CommentsController {

    @Delete("/:id")
    @useAuth(JWT_AUTH)
    @Validate(deleteCommentType.schema)
    @Summary("Delete Comment")
    @Description("Delete a comment by ID (only comment owner can delete)")
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
