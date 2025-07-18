import * as getProfileType from "./types/getProfile.type";
import * as videosType from "./types/videos.type";
import * as searchType from "./types/search.type";
import * as getFollowingType from "./types/getFollowing.type";
import * as followStatusType from "./types/followStatus.type";
import * as unFollowUserType from "./types/unFollowUser.type";
import * as followUserType from "./types/followUser.type";
import * as updateUserProfileType from "./types/updateUserProfile.type";
import * as getByIdType from "./types/getById.type";
import { Get, IsAuth, Post, Put } from "@lib/httpMethod";
import prisma from "config/prisma.config";
import { Validate } from "@lib/validate";
import { NotFoundError } from "@utils/exception";
import { throws } from "assert";

export default class UsersController {

    @Get("/me")
    @IsAuth()
    @Validate(getProfileType.schema)
    async getProfile(req: getProfileType.Req) {

        const currentUserId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: currentUserId },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                bio: true,
                followers: {
                    select: { id: true }, // we only need to know if it exists
                },
                following: {
                    select: { id: true }, // we only need to know if it exists
                },
                videos: {
                    select: { id: true }, // count of posts
                },
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return new getProfileType.getProfileRes({
            ...user,
            followerCount: user.followers.length,
            followingCount: user.following.length,
            postCount: user.videos.length,
        });
    }

    @Get("/search")
    @Validate(searchType.schema)
    async search(req: searchType.Req) {
        const { q, type, page, limit} = req.query;

        if (type == "post") {
            const results = await prisma.video.findMany({
                where: {
                    OR: [
                        { title: { contains: q } },
                        { description: { contains: q } },
                    ],
                },
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true,
                        },
                    },
                },
                skip: (page - 1) * limit, // Pagination
                take: limit, // Limit results to the specified page size
            });


            // return new searchType.searchRes(results);
            return new searchType.searchRes({
                page,
                limit,
                total: results.length, // Assuming total is the length of results
                totalPage: Math.ceil(results.length / limit), // Calculate total pages
                results: results.map(video => ({
                    id: video.id || '',
                    title: video.title || '',
                    thumbnail: video.thumbnail || '',
                    user: {
                        id: video.user.id,
                        username: video.user.username,
                        avatarUrl: video.user.avatarUrl || '',
                    },
                })),
            })
        }
         
        const results = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: q } },
                ],
            },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            },
            skip: (page - 1) * limit, // Pagination
            take: limit, // Limit results to the specified page size
        });

        return new searchType.searchRes({
            page,
            limit,
            total: results.length, // Assuming total is the length of results
            totalPage: Math.ceil(results.length / limit), // Calculate total pages
            results: results.map(user => ({
                id: user.id || '',
                username: user.username || '',
                avatarUrl: user.avatarUrl || '',
            })),
        });
    }


    @Get("/:id")
    @IsAuth()
    @Validate(getByIdType.schema)
    async getById(req: getByIdType.Req) {
        const { id: targetUserId } = req.params;
        const currentUserId = req.user.id;
        const user = await prisma.user.findUnique({
            where: { id: targetUserId },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                bio: true,
                followers: {
                    where: {
                        followerId: currentUserId,
                    },
                    select: { id: true }, // we only need to know if it exists
                },
            },
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return new getByIdType.getByIdRes({...user, isFollowing: user.followers.length > 0});
    }



    @Put("/")
    @IsAuth()
    @Validate(updateUserProfileType.schema)
    async updateUserProfile(req: updateUserProfileType.Req) {
        const currentUserId = req.user.id;

        const user = await prisma.user.update({
            data: req.body,
            where: { id: currentUserId},
        });

        return new updateUserProfileType.updateUserProfileRes()
    }

    @Get("/:id/follow")
    @IsAuth()
    @Validate(followUserType.schema)
    async followUser(req: followUserType.Req) {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: currentUserId,
                followeeId: targetUserId,
            },
        });

        if (existingFollow) {
            // If the follow relationship already exists, we can return early
            return new followUserType.followUserRes();
        }

        // Create the follow relationship
        await prisma.follow.create({
            data: {
                followerId: currentUserId,
                followeeId: targetUserId,
            },
        });

        return new followUserType.followUserRes();
    }



    @Get("/:id/unfollow")
    @IsAuth()
    @Validate(unFollowUserType.schema)
    async unFollowUser(req: unFollowUserType.Req) {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: currentUserId,
                followeeId: targetUserId,
            },
        });

        if (!existingFollow) {
            // If the follow relationship does not exist, we can return early
            throw new NotFoundError("Follow relationship not found");
        }

        // Delete the follow relationship
        await prisma.follow.delete({
            where: {
                id: existingFollow.id,
            },
        });

        return new unFollowUserType.unFollowUserRes();
    }


    @Get("/:id/follow-status")
    @IsAuth()
    @Validate(followStatusType.schema)
    async followStatus(req: followStatusType.Req) {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        const followStatus = await prisma.user.findUnique({
            where: { id: targetUserId },
            select: {
                followers: {
                    where: { followerId: currentUserId },
                    select: { id: true }, // we only need to know if it exists
                },
                following: {
                    where: { followeeId: targetUserId },
                    select: { id: true }, // we only need to know if it exists
                },
                videos: {
                    select: { id: true }, // count of posts
                },
            },
        });

        if (!followStatus) {
            throw new NotFoundError("User not found");
        }

        return new followStatusType.followStatusRes({
            followerCount: followStatus.followers.length,
            followingCount: followStatus.following.length,
            postCount: followStatus.videos.length,
            isFollowing: followStatus.followers.length > 0,
        });
    }




    @Get("/me/following")
    @IsAuth()
    @Validate(getFollowingType.schema)
    async getFollowing(req: getFollowingType.Req) {
        const currentUserId = req.user.id;

        const following = await prisma.user.findMany({
            where: {
                followers: {
                    some: {
                        followerId: currentUserId,
                    },
                },
            },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                bio: true,
            },
        });

        return new getFollowingType.getFollowingRes(
            currentUserId,
            following
        );
    }




    @Get("/:id/videos")
    @Validate(videosType.schema)
    async videos(req: videosType.Req) {
        const { id: userId } = req.params;
        const { page, limit } = req.query;

        const videos = await prisma.video.findMany({
            where: { userId },
            select: {
                id: true,
                title: true,
                thumbnail: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
            skip: (page - 1) * limit, // Pagination
            take: limit, // Limit results to the specified page size
        });

        if (!videos) {
            throw new NotFoundError("Videos not found for this user");
        }

        return new videosType.videosRes({
            page,
            limit,
            total: videos.length, // Assuming total is the length of results
            totalPage: Math.ceil(videos.length / limit), // Calculate total pages
            results: videos.map(video => ({
                id: video.id || '',
                title: video.title || '',
                thumbnail: video.thumbnail || '',
                createdAt: video.createdAt || new Date(),
                user: {
                    id: video.user.id || '',
                    username: video.user.username || '',
                    avatarUrl: video.user.avatarUrl || '',
                },
            })),
        });

    }

}
