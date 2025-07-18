import * as getCommentsForVideoType from "./types/getCommentsForVideo.type";
import * as addCommandType from "./types/addCommand.type";
import * as listUsersLikedType from "./types/listUsersLiked.type";
import * as unLikeVideoType from "./types/unLikeVideo.type";
import * as likeVideoType from "./types/likeVideo.type";
import * as getVideoByIdType from "./types/getVideoById.type";
import * as uploadVideoType from "./types/uploadVideo.type";
import * as getVideosFeedType from "./types/getVideosFeed.type";
import { Delete, Get, IsAuth, Middleware, Post, Tags } from "@lib/httpMethod";
import prisma from "config/prisma.config";
import { Validate } from "@lib/validate";
// import upload from "config/multer";
import cloudinary from "config/cloudinary";
import { Readable } from "stream";
import { upload } from "config/multer";
import { tr, vi } from "zod/dist/types/v4/locales";
import { NotFoundError } from "@utils/exception";
import { IsObject, toSchema } from "@lib/type_declaration";

export default class VideosController {


    @Get("/feed")
    @Validate(getVideosFeedType.schema)
    async getVideosFeed(req: getVideosFeedType.Req) {
        // get random videos from the database

        const { limit } = req.query;

        const videosCount = await prisma.video.count();

        const videos = await prisma.video.findMany({
            skip: Math.floor(Math.random() * (videosCount - limit) < 0 ? 0 : Math.floor(Math.random() * (videosCount - limit))),
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true
                    }
                },
                likes: {
                    select: {
                        userId: true
                    },
                },
                comments: {
                    select: {
                        id: true
                    },
                }
            }
        });


        return new getVideosFeedType.getVideosFeedRes({
            limit,
            total: videosCount,
            totalPage: Math.ceil(videosCount / limit),
            results: videos.map(video => {
                return {
                    id: video.id,
                    title: video.title || "",
                    description: video.description || "",
                    videoUrl: video.videoUrl,
                    thumbnail: video.thumbnail || "",
                    createdAt: video.createdAt.toISOString(),
                    likesCount: video.likes.length,
                    commentsCount: video.comments.length,
                    user: {
                        id: video.user.id || "",
                        username: video.user.username || "",
                        avatarUrl: video.user.avatarUrl || ""
                    }
                }
            })
        });
    }

    @Post("/")
    @IsAuth()
    @Validate(uploadVideoType.schema)
    @Middleware(upload.single("video"))
    async uploadVideo(req: uploadVideoType.Req) {

        const { title, description, video } = req.body;

        const buffer = Buffer.from(await video.arrayBuffer());
        // save video to database

        const processFuc = new Promise<{
            user: {
                id: string;
                username: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            title: string | null;
            description: string | null;
            videoUrl: string;
            thumbnail: string | null;
            createdAt: Date;
            userId: string;
        }
        >((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: 'videos',
                },
                async (error, result) => {
                    if (error || !result) {
                        return reject(new Error('Cloudinary upload failed'));
                    }

                    console.log("Video uploaded to Cloudinary:", result);

                    // Save video info to database
                    const video = await prisma.video.create({
                        data: {
                            title,
                            description,
                            videoUrl: result.secure_url,
                            thumbnail: result.thumbnail_url || "",
                            userId: req.user.id, // Assuming req.user is set by IsAuth middleware
                        },
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatarUrl: true
                                }
                            }
                        }
                    });

                    resolve(video);
                }
            );


            Readable.from(buffer).pipe(stream);
        })

        const video_ = await processFuc;

        return new uploadVideoType.uploadVideoRes({
            id: video_.id,
            title: video_.title || "",
            description: video_.description || "",
            videoUrl: video_.videoUrl,
            thumbnail: video_.thumbnail || "",
            createdAt: video_.createdAt.toISOString(),
            user: {
                id: req.user.id,
                username: req.user.username,
                avatarUrl: req.user.avatarUrl || ""
            }
        });

    }


    @Delete("/:id")
    @IsAuth()
    @Validate(getVideoByIdType.schema)
    async getVideoById(req: getVideoByIdType.Req) {

        const currentUserId = req.user.id;
        const videoId = req.params.id;

        // Check if video exists

        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
                userId: currentUserId, // Ensure the user is the owner of the video
            },
        });

        if (!video) {
            throw new NotFoundError("Video not found or you do not have permission to delete this video.");
        }

        // Delete video from Cloudinary

        const publicId = video.videoUrl.split('/').pop()?.split('.')[0] || "";
        console.log("Video URL:", video.videoUrl);
        console.log("Public ID for Cloudinary:", publicId);
        const cloudinaryResult = await cloudinary.uploader.destroy(`videos/${publicId}`, {
            resource_type: 'video',
        });

        if (cloudinaryResult.result !== 'ok') {
            throw new Error('Failed to delete video from Cloudinary');
        }

        // Delete video from database
        await prisma.video.delete({
            where: {
                id: videoId,
            },
        });

        return new getVideoByIdType.getVideoByIdRes()
    }


    @Post("/:id/like")
    @IsAuth()
    @Validate(likeVideoType.schema)
    @Tags(["LikeController"])
    async likeVideo(req: likeVideoType.Req) {
        const currentUserId = req.user.id;
        const videoId = req.params.id;

        // Check if video exists
        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
        });

        if (!video) {
            throw new NotFoundError("Video not found.");
        }

        // Check if the user has already liked the video
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_videoId: {
                    userId: currentUserId,
                    videoId: videoId,
                },
            },
        });

        if (existingLike) {
            return new likeVideoType.likeVideoRes();
        }

        // Create a new like

        await prisma.like.create({
            data: {
                userId: currentUserId,
                videoId: videoId,
            },
        });

        return new likeVideoType.likeVideoRes();
    }


    @Post("/:id/unlike")
    @IsAuth()
    @Tags(["LikeController"])
    @Validate(unLikeVideoType.schema)
    async unLikeVideo(req: unLikeVideoType.Req) {
        const currentUserId = req.user.id;
        const videoId = req.params.id;

        // Check if video exists
        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
        });

        if (!video) {
            throw new NotFoundError("Video not found.");
        }

        // Check if the user has already liked the video
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_videoId: {
                    userId: currentUserId,
                    videoId: videoId,
                },
            },
        });

        if (!existingLike) {
            throw new NotFoundError("You have not liked this video yet.");
        }

        // Delete the like
        await prisma.like.delete({
            where: {
                userId_videoId: {
                    userId: currentUserId,
                    videoId: videoId,
                },
            },
        });

        return new unLikeVideoType.unLikeVideoRes();
    }


    @Get("/:id/likes")
    @IsAuth()
    @Tags(["LikeController"])
    @Validate(listUsersLikedType.schema)
    async listUsersLiked(req: listUsersLikedType.Req) {
        const videoId = req.params.id;

        // Check if video exists
        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
            include: {
                likes: {
                    select: {
                        userId: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true
                            }
                        }
                    }
                }
            }
        });

        if (!video) {
            throw new NotFoundError("Video not found.");
        }

        return new listUsersLikedType.listUsersLikedRes({
            total: video.likes.length,
            results: video.likes.map(like => ({
                id: like.user.id,
                username: like.user.username,
                avatarUrl: like.user.avatarUrl || ""
            }))
        });
    }


    @Post("/:id/comments")
    @IsAuth()
    @Validate(addCommandType.schema)
    @Tags(["CommentsController"])
    async addCommand(req: addCommandType.Req) {
        const currentUserId = req.user.id;
        const videoId = req.params.id;
        const { content } = req.body;

        // Check if video exists
        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
        });

        if (!video) {
            throw new NotFoundError("Video not found.");
        }

        // Create a new comment
        const comment = await prisma.comment.create({
            data: {
                content,
                userId: currentUserId,
                videoId: videoId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true
                    }
                }
            }
        });

        return new addCommandType.addCommandRes({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt.toISOString(),
            user: {
                id: comment.user.id || "",
                username: comment.user.username || "",
                avatarUrl: comment.user.avatarUrl || ""
            }
        });
    }


    @Get("/:id/comments")
    @Validate(getCommentsForVideoType.schema)
    @Tags(["CommentsController"])
    async getCommentsForVideo(req: getCommentsForVideoType.Req) {
        const videoId = req.params.id;

        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
            include: {
                comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });


        if (!video) {
            throw new NotFoundError("Video not found.");
        }

        return new getCommentsForVideoType.getCommentsForVideoRes({
            total: video.comments.length,
            results: video.comments.map(comment => ({
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt.toISOString(),
                user: {
                    id: comment.user.id || "",
                    username: comment.user.username || "",
                    avatarUrl: comment.user.avatarUrl || ""
                }
            }))
        });
    }

}
