import * as deleteMessageType from "./types/deleteMessage.type";
import * as sendMessageType from "./types/sendMessage.type";
import * as deleteChatType from "./types/deleteChat.type";
import * as getMessageType from "./types/getMessage.type";
import * as getListOfConverType from "./types/getListOfConver.type";
import { Delete, Get, IsAuth, Post } from "@lib/httpMethod";
import prisma from "config/prisma.config";
import { Validate } from "@lib/validate";
import { BadRequestError } from "@utils/exception";

export default class ChatsController {
    @Delete("/message/:messageId")
    @Validate(deleteMessageType.schema)
    async deleteMessage(req: deleteMessageType.Req) {
        const userId = req.user.id;
        const { messageId } = req.params;

        // delete the message
        await prisma.message.delete({
            where: {
                id: messageId,
                senderId: userId,
            }
        });

        return new deleteMessageType.deleteMessageRes();
    }

    @Get("/")
    @IsAuth()
    @Validate(getListOfConverType.schema)
    async getListOfConver(req: getListOfConverType.Req) {
        const userId = req.user.id;

        // group messages by receiver

        const conversations = await prisma.message.groupBy({
            by: ['receiverId', 'senderId', 'createdAt'],
            where: {
                OR: [
                    { receiverId: userId },
                    { senderId: userId }
                ],
            },
            _max: {
                createdAt: true,
            },
            orderBy: {
                _max: {
                    createdAt: 'desc',
                },
            },
        });

        const conversationsWithDetails = await Promise.all<({
            sender: {
                id: string;
                username: string;
                avatarUrl: string | null;
            };
            receiver: {
                id: string;
                username: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            content: string;
            createdAt: Date;
            senderId: string;
            receiverId: string;
            isSeen: boolean;
        }) | null
        >(
            conversations.map(async (conversation) => {
                const receiverId = conversation.receiverId;
                const senderId = conversation.senderId;

                // get last message for each conversation

                const lastMessage = await prisma.message.findFirst({
                    where: {
                        OR: [
                            { senderId, receiverId },
                            { senderId: receiverId, receiverId: senderId }
                        ]
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        },
                        receiver: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });

                return lastMessage

            })
        );

        const results = conversationsWithDetails.filter((item) => item !== null);

        return new getListOfConverType.getListOfConverRes({
            total: results.length,
            results: results.map((item) => ({
                id: item.id,
                content: item.content,
                createdAt: item.createdAt.toISOString(),
                sender: {
                    id: item.sender.id,
                    username: item.sender.username || '',
                    avatarUrl: item.sender.avatarUrl || '',
                },
                receiver: {
                    id: item.receiver.id,
                    username: item.receiver.username || '',
                    avatarUrl: item.receiver.avatarUrl || '',
                },
            })),
        });
    }


    @Get("/:userId")
    @IsAuth()
    @Validate(getMessageType.schema)
    async getMessage(req: getMessageType.Req) {
        const userId = req.user.id;
        const { userId: targetUserId } = req.params;
        const { page, limit } = req.query;

        if (userId === targetUserId) {
            throw new Error("You cannot chat with yourself");
        }

        // get all messages between user and target user
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: targetUserId },
                    { senderId: targetUserId, receiverId: userId }
                ]
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return new getMessageType.getMessageRes({
            total: messages.length,
            results: messages.map((item) => ({
                id: item.id,
                content: item.content,
                createdAt: item.createdAt.toISOString(),
                senderId: item.sender.id,
                receiverId: item.receiver.id,
                isSeen: item.isSeen,
                sender: {
                    id: item.sender.id,
                    username: item.sender.username || '',
                    avatarUrl: item.sender.avatarUrl || '',
                },
                receiver: {
                    id: item.receiver.id,
                    username: item.receiver.username || '',
                    avatarUrl: item.receiver.avatarUrl || '',
                },
            })),
        });
    }


    @Delete("/:userId")
    @IsAuth()
    @Validate(deleteChatType.schema)
    async deleteChat(req: deleteChatType.Req) {
        const userId = req.user.id;
        const { userId: targetUserId } = req.params;

        if (userId === targetUserId) {
            throw new BadRequestError("You cannot delete chat with yourself");
        }

        // delete all messages between user and target user
        await prisma.message.deleteMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: targetUserId },
                    { senderId: targetUserId, receiverId: userId }
                ]
            }
        });

        return new deleteChatType.deleteChatRes()
    }

}
