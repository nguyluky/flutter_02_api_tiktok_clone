import { Description, Get, useAuth, Put, Summary } from "@lib/httpMethod";
import { Validate } from "@lib/validate";
import { NotFoundError } from "@utils/exception";
import prisma from "config/prisma.config";
import * as followStatusType from "./types/followStatus.type";
import * as followUserType from "./types/followUser.type";
import * as getByIdType from "./types/getById.type";
import * as getFollowingType from "./types/getFollowing.type";
import * as getProfileType from "./types/getProfile.type";
import * as searchType from "./types/search.type";
import * as unFollowUserType from "./types/unFollowUser.type";
import * as updateUserProfileType from "./types/updateUserProfile.type";
import * as videosType from "./types/videos.type";
import { JWT_AUTH } from "@utils/jwt";

export default class UsersController {

    @Get("/me")
    @useAuth(JWT_AUTH)
    @Validate(getProfileType.schema)
    @Summary("Get User Profile")
    @Description("Get current authenticated user's profile information")
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
    @Summary("Search Users and Posts")
    @Description("Search for users or posts based on query string")
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
    @useAuth(JWT_AUTH)
    @Validate(getByIdType.schema)
    @Summary("Get User By ID")
    @Description("Get user information by user ID")
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
    @useAuth(JWT_AUTH)
    @Validate(updateUserProfileType.schema)
    @Summary("Update User Profile")
    @Description("Update current user's profile information")
    async updateUserProfile(req: updateUserProfileType.Req) {
        const currentUserId = req.user.id;

        const user = await prisma.user.update({
            data: req.body,
            where: { id: currentUserId},
        });

        return new updateUserProfileType.updateUserProfileRes()
    }

    @Get("/:id/follow")
    @useAuth(JWT_AUTH)
    @Validate(followUserType.schema)
    @Summary("Follow User")
    @Description("Follow a user by their ID")
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
    @useAuth(JWT_AUTH)
    @Validate(unFollowUserType.schema)
    @Summary("Unfollow User")
    @Description("Unfollow a user by their ID")
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
    @useAuth(JWT_AUTH)
    @Validate(followStatusType.schema)
    @Summary("Get Follow Status")
    @Description("Check if current user is following another user")
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
    @useAuth(JWT_AUTH)
    @Validate(getFollowingType.schema)
    @Summary("Get Following List")
    @Description("Get list of users that current user is following")
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
    @Summary("Get User Videos")
    @Description("Get all videos posted by a specific user")
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
