import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','passwordHash','avatarUrl','bio','createdAt','updatedAt']);

export const VideoScalarFieldEnumSchema = z.enum(['id','title','description','videoUrl','thumbnail','createdAt','userId']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','createdAt','userId','videoId']);

export const LikeScalarFieldEnumSchema = z.enum(['id','userId','videoId','createdAt']);

export const FollowScalarFieldEnumSchema = z.enum(['id','followerId','followeeId','createdAt']);

export const MessageScalarFieldEnumSchema = z.enum(['id','content','createdAt','senderId','receiverId','isSeen']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','username','email','passwordHash','avatarUrl','bio']);

export const VideoOrderByRelevanceFieldEnumSchema = z.enum(['id','title','description','videoUrl','thumbnail','userId']);

export const CommentOrderByRelevanceFieldEnumSchema = z.enum(['id','content','userId','videoId']);

export const LikeOrderByRelevanceFieldEnumSchema = z.enum(['id','userId','videoId']);

export const FollowOrderByRelevanceFieldEnumSchema = z.enum(['id','followerId','followeeId']);

export const MessageOrderByRelevanceFieldEnumSchema = z.enum(['id','content','senderId','receiverId']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().nullable(),
  bio: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VIDEO SCHEMA
/////////////////////////////////////////

export const VideoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().nullable(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type Video = z.infer<typeof VideoSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  videoId: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  videoId: z.string(),
  createdAt: z.coerce.date(),
})

export type Like = z.infer<typeof LikeSchema>

/////////////////////////////////////////
// FOLLOW SCHEMA
/////////////////////////////////////////

export const FollowSchema = z.object({
  id: z.string().uuid(),
  followerId: z.string(),
  followeeId: z.string(),
  createdAt: z.coerce.date(),
})

export type Follow = z.infer<typeof FollowSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  senderId: z.string(),
  receiverId: z.string(),
  isSeen: z.boolean(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  videos: z.union([z.boolean(),z.lazy(() => VideoFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  followers: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  receivedMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  videos: z.boolean().optional(),
  comments: z.boolean().optional(),
  likes: z.boolean().optional(),
  followers: z.boolean().optional(),
  following: z.boolean().optional(),
  sentMessages: z.boolean().optional(),
  receivedMessages: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  bio: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  videos: z.union([z.boolean(),z.lazy(() => VideoFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  followers: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => FollowFindManyArgsSchema)]).optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  receivedMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VIDEO
//------------------------------------------------------

export const VideoIncludeSchema: z.ZodType<Prisma.VideoInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VideoCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const VideoArgsSchema: z.ZodType<Prisma.VideoDefaultArgs> = z.object({
  select: z.lazy(() => VideoSelectSchema).optional(),
  include: z.lazy(() => VideoIncludeSchema).optional(),
}).strict();

export const VideoCountOutputTypeArgsSchema: z.ZodType<Prisma.VideoCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => VideoCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VideoCountOutputTypeSelectSchema: z.ZodType<Prisma.VideoCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
  likes: z.boolean().optional(),
}).strict();

export const VideoSelectSchema: z.ZodType<Prisma.VideoSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  videoUrl: z.boolean().optional(),
  thumbnail: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VideoCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  video: z.union([z.boolean(),z.lazy(() => VideoArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  videoId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  video: z.union([z.boolean(),z.lazy(() => VideoArgsSchema)]).optional(),
}).strict()

// LIKE
//------------------------------------------------------

export const LikeIncludeSchema: z.ZodType<Prisma.LikeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  video: z.union([z.boolean(),z.lazy(() => VideoArgsSchema)]).optional(),
}).strict()

export const LikeArgsSchema: z.ZodType<Prisma.LikeDefaultArgs> = z.object({
  select: z.lazy(() => LikeSelectSchema).optional(),
  include: z.lazy(() => LikeIncludeSchema).optional(),
}).strict();

export const LikeSelectSchema: z.ZodType<Prisma.LikeSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  videoId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  video: z.union([z.boolean(),z.lazy(() => VideoArgsSchema)]).optional(),
}).strict()

// FOLLOW
//------------------------------------------------------

export const FollowIncludeSchema: z.ZodType<Prisma.FollowInclude> = z.object({
  follower: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  followee: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FollowArgsSchema: z.ZodType<Prisma.FollowDefaultArgs> = z.object({
  select: z.lazy(() => FollowSelectSchema).optional(),
  include: z.lazy(() => FollowIncludeSchema).optional(),
}).strict();

export const FollowSelectSchema: z.ZodType<Prisma.FollowSelect> = z.object({
  id: z.boolean().optional(),
  followerId: z.boolean().optional(),
  followeeId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  follower: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  followee: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  receiver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  senderId: z.boolean().optional(),
  receiverId: z.boolean().optional(),
  isSeen: z.boolean().optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  receiver: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  videos: z.lazy(() => VideoListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  followers: z.lazy(() => FollowListRelationFilterSchema).optional(),
  following: z.lazy(() => FollowListRelationFilterSchema).optional(),
  sentMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  receivedMessages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  videos: z.lazy(() => VideoOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
  followers: z.lazy(() => FollowOrderByRelationAggregateInputSchema).optional(),
  following: z.lazy(() => FollowOrderByRelationAggregateInputSchema).optional(),
  sentMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    username: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  videos: z.lazy(() => VideoListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  followers: z.lazy(() => FollowListRelationFilterSchema).optional(),
  following: z.lazy(() => FollowListRelationFilterSchema).optional(),
  sentMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  receivedMessages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VideoWhereInputSchema: z.ZodType<Prisma.VideoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional()
}).strict();

export const VideoOrderByWithRelationInputSchema: z.ZodType<Prisma.VideoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => VideoOrderByRelevanceInputSchema).optional()
}).strict();

export const VideoWhereUniqueInputSchema: z.ZodType<Prisma.VideoWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoWhereInputSchema),z.lazy(() => VideoWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional()
}).strict());

export const VideoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VideoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VideoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VideoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VideoMinOrderByAggregateInputSchema).optional()
}).strict();

export const VideoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VideoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => VideoScalarRelationFilterSchema),z.lazy(() => VideoWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  video: z.lazy(() => VideoOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => CommentOrderByRelevanceInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => VideoScalarRelationFilterSchema),z.lazy(() => VideoWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeWhereInputSchema: z.ZodType<Prisma.LikeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => VideoScalarRelationFilterSchema),z.lazy(() => VideoWhereInputSchema) ]).optional(),
}).strict();

export const LikeOrderByWithRelationInputSchema: z.ZodType<Prisma.LikeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  video: z.lazy(() => VideoOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => LikeOrderByRelevanceInputSchema).optional()
}).strict();

export const LikeWhereUniqueInputSchema: z.ZodType<Prisma.LikeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    userId_videoId: z.lazy(() => LikeUserIdVideoIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    userId_videoId: z.lazy(() => LikeUserIdVideoIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  userId_videoId: z.lazy(() => LikeUserIdVideoIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  video: z.union([ z.lazy(() => VideoScalarRelationFilterSchema),z.lazy(() => VideoWhereInputSchema) ]).optional(),
}).strict());

export const LikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.LikeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LikeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LikeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LikeMinOrderByAggregateInputSchema).optional()
}).strict();

export const LikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LikeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FollowWhereInputSchema: z.ZodType<Prisma.FollowWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followeeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  follower: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  followee: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const FollowOrderByWithRelationInputSchema: z.ZodType<Prisma.FollowOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followeeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  follower: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  followee: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => FollowOrderByRelevanceInputSchema).optional()
}).strict();

export const FollowWhereUniqueInputSchema: z.ZodType<Prisma.FollowWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    followerId_followeeId: z.lazy(() => FollowFollowerIdFolloweeIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    followerId_followeeId: z.lazy(() => FollowFollowerIdFolloweeIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  followerId_followeeId: z.lazy(() => FollowFollowerIdFolloweeIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowWhereInputSchema),z.lazy(() => FollowWhereInputSchema).array() ]).optional(),
  followerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followeeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  follower: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  followee: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const FollowOrderByWithAggregationInputSchema: z.ZodType<Prisma.FollowOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followeeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FollowCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FollowMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FollowMinOrderByAggregateInputSchema).optional()
}).strict();

export const FollowScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FollowScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FollowScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  followerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  followeeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  receiverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSeen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  receiver: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  receiverId: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  receiver: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => MessageOrderByRelevanceInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  receiverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSeen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  receiver: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  receiverId: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  receiverId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isSeen: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoCreateInputSchema: z.ZodType<Prisma.VideoCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVideosInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutVideoInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUncheckedCreateInputSchema: z.ZodType<Prisma.VideoUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutVideoInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUpdateInputSchema: z.ZodType<Prisma.VideoUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVideosNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutVideoNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutVideoNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoCreateManyInputSchema: z.ZodType<Prisma.VideoCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const VideoUpdateManyMutationInputSchema: z.ZodType<Prisma.VideoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  video: z.lazy(() => VideoCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  videoId: z.string()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  videoId: z.string()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateInputSchema: z.ZodType<Prisma.LikeCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema),
  video: z.lazy(() => VideoCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateInputSchema: z.ZodType<Prisma.LikeUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  videoId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const LikeUpdateInputSchema: z.ZodType<Prisma.LikeUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateManyInputSchema: z.ZodType<Prisma.LikeCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  videoId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const LikeUpdateManyMutationInputSchema: z.ZodType<Prisma.LikeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowCreateInputSchema: z.ZodType<Prisma.FollowCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  follower: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema),
  followee: z.lazy(() => UserCreateNestedOneWithoutFollowersInputSchema)
}).strict();

export const FollowUncheckedCreateInputSchema: z.ZodType<Prisma.FollowUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  followerId: z.string(),
  followeeId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowUpdateInputSchema: z.ZodType<Prisma.FollowUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  follower: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional(),
  followee: z.lazy(() => UserUpdateOneRequiredWithoutFollowersNestedInputSchema).optional()
}).strict();

export const FollowUncheckedUpdateInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followeeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowCreateManyInputSchema: z.ZodType<Prisma.FollowCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  followerId: z.string(),
  followeeId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowUpdateManyMutationInputSchema: z.ZodType<Prisma.FollowUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followeeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  isSeen: z.boolean().optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  receiver: z.lazy(() => UserCreateNestedOneWithoutReceivedMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  senderId: z.string(),
  receiverId: z.string(),
  isSeen: z.boolean().optional()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional(),
  receiver: z.lazy(() => UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  receiverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  senderId: z.string(),
  receiverId: z.string(),
  isSeen: z.boolean().optional()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  receiverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const VideoListRelationFilterSchema: z.ZodType<Prisma.VideoListRelationFilter> = z.object({
  every: z.lazy(() => VideoWhereInputSchema).optional(),
  some: z.lazy(() => VideoWhereInputSchema).optional(),
  none: z.lazy(() => VideoWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const LikeListRelationFilterSchema: z.ZodType<Prisma.LikeListRelationFilter> = z.object({
  every: z.lazy(() => LikeWhereInputSchema).optional(),
  some: z.lazy(() => LikeWhereInputSchema).optional(),
  none: z.lazy(() => LikeWhereInputSchema).optional()
}).strict();

export const FollowListRelationFilterSchema: z.ZodType<Prisma.FollowListRelationFilter> = z.object({
  every: z.lazy(() => FollowWhereInputSchema).optional(),
  some: z.lazy(() => FollowWhereInputSchema).optional(),
  none: z.lazy(() => FollowWhereInputSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const VideoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VideoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LikeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FollowOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const VideoOrderByRelevanceInputSchema: z.ZodType<Prisma.VideoOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => VideoOrderByRelevanceFieldEnumSchema),z.lazy(() => VideoOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const VideoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VideoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VideoScalarRelationFilterSchema: z.ZodType<Prisma.VideoScalarRelationFilter> = z.object({
  is: z.lazy(() => VideoWhereInputSchema).optional(),
  isNot: z.lazy(() => VideoWhereInputSchema).optional()
}).strict();

export const CommentOrderByRelevanceInputSchema: z.ZodType<Prisma.CommentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => CommentOrderByRelevanceFieldEnumSchema),z.lazy(() => CommentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOrderByRelevanceInputSchema: z.ZodType<Prisma.LikeOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => LikeOrderByRelevanceFieldEnumSchema),z.lazy(() => LikeOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const LikeUserIdVideoIdCompoundUniqueInputSchema: z.ZodType<Prisma.LikeUserIdVideoIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  videoId: z.string()
}).strict();

export const LikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.LikeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  videoId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowOrderByRelevanceInputSchema: z.ZodType<Prisma.FollowOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => FollowOrderByRelevanceFieldEnumSchema),z.lazy(() => FollowOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const FollowFollowerIdFolloweeIdCompoundUniqueInputSchema: z.ZodType<Prisma.FollowFollowerIdFolloweeIdCompoundUniqueInput> = z.object({
  followerId: z.string(),
  followeeId: z.string()
}).strict();

export const FollowCountOrderByAggregateInputSchema: z.ZodType<Prisma.FollowCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followeeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FollowMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followeeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowMinOrderByAggregateInputSchema: z.ZodType<Prisma.FollowMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  followerId: z.lazy(() => SortOrderSchema).optional(),
  followeeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const MessageOrderByRelevanceInputSchema: z.ZodType<Prisma.MessageOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => MessageOrderByRelevanceFieldEnumSchema),z.lazy(() => MessageOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  receiverId: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  receiverId: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  receiverId: z.lazy(() => SortOrderSchema).optional(),
  isSeen: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const VideoCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VideoCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowCreateNestedManyWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowCreateNestedManyWithoutFolloweeInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFolloweeInputSchema),z.lazy(() => FollowCreateWithoutFolloweeInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFolloweeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowCreateNestedManyWithoutFollowerInputSchema: z.ZodType<Prisma.FollowCreateNestedManyWithoutFollowerInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutReceiverInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutReceiverInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageCreateWithoutReceiverInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema),z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyReceiverInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VideoUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUncheckedCreateNestedManyWithoutFolloweeInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFolloweeInputSchema),z.lazy(() => FollowCreateWithoutFolloweeInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFolloweeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedCreateNestedManyWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutReceiverInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageCreateWithoutReceiverInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema),z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyReceiverInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const VideoUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VideoUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUpdateManyWithoutFolloweeNestedInputSchema: z.ZodType<Prisma.FollowUpdateManyWithoutFolloweeNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFolloweeInputSchema),z.lazy(() => FollowCreateWithoutFolloweeInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFolloweeInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFolloweeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFolloweeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFolloweeInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFolloweeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFolloweeInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFolloweeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUpdateManyWithoutFollowerNestedInputSchema: z.ZodType<Prisma.FollowUpdateManyWithoutFollowerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutReceiverNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutReceiverNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageCreateWithoutReceiverInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema),z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutReceiverInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutReceiverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyReceiverInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutReceiverInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutReceiverInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutReceiverInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutReceiverInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VideoUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoCreateWithoutUserInputSchema).array(),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema),z.lazy(() => VideoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VideoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VideoWhereUniqueInputSchema),z.lazy(() => VideoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => VideoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => VideoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeCreateWithoutUserInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema),z.lazy(() => LikeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFolloweeNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFolloweeInputSchema),z.lazy(() => FollowCreateWithoutFolloweeInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFolloweeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFolloweeInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFolloweeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFolloweeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFolloweeInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFolloweeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFolloweeInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFolloweeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowCreateWithoutFollowerInputSchema).array(),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema),z.lazy(() => FollowCreateOrConnectWithoutFollowerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpsertWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowCreateManyFollowerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowWhereUniqueInputSchema),z.lazy(() => FollowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema),z.lazy(() => FollowUpdateWithWhereUniqueWithoutFollowerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema),z.lazy(() => FollowUpdateManyWithWhereWithoutFollowerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutReceiverNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageCreateWithoutReceiverInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema),z.lazy(() => MessageCreateOrConnectWithoutReceiverInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutReceiverInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutReceiverInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyReceiverInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutReceiverInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutReceiverInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutReceiverInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutReceiverInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutVideosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVideosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVideosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutVideoInputSchema),z.lazy(() => CommentCreateWithoutVideoInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema),z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyVideoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutVideoInputSchema),z.lazy(() => LikeCreateWithoutVideoInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema),z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyVideoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutVideoInputSchema),z.lazy(() => CommentCreateWithoutVideoInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema),z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyVideoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedCreateNestedManyWithoutVideoInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutVideoInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutVideoInputSchema),z.lazy(() => LikeCreateWithoutVideoInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema),z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyVideoInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutVideosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVideosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVideosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVideosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVideosInputSchema),z.lazy(() => UserUpdateWithoutVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVideosInputSchema) ]).optional(),
}).strict();

export const CommentUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutVideoInputSchema),z.lazy(() => CommentCreateWithoutVideoInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema),z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyVideoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutVideoInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutVideoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutVideoInputSchema),z.lazy(() => LikeCreateWithoutVideoInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema),z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyVideoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutVideoInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutVideoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutVideoInputSchema),z.lazy(() => CommentCreateWithoutVideoInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema),z.lazy(() => CommentCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyVideoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutVideoInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutVideoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutVideoNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutVideoNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutVideoInputSchema),z.lazy(() => LikeCreateWithoutVideoInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema),z.lazy(() => LikeCreateOrConnectWithoutVideoInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyVideoInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutVideoInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutVideoInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutVideoInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutVideoInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const VideoCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.VideoCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VideoCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => VideoWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const VideoUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.VideoUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VideoCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => VideoUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => VideoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VideoUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => VideoUpdateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const VideoCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.VideoCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VideoCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => VideoWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const VideoUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.VideoUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => VideoCreateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VideoCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => VideoUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => VideoWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VideoUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => VideoUpdateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutFollowersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutFollowingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowingInputSchema),z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFollowersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowersInputSchema),z.lazy(() => UserUpdateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSentMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReceivedMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSentMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSentMessagesInputSchema),z.lazy(() => UserUpdateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReceivedMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReceivedMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReceivedMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema),z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const VideoCreateWithoutUserInputSchema: z.ZodType<Prisma.VideoCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutVideoInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutVideoInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VideoCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.VideoCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VideoCreateManyUserInputSchema),z.lazy(() => VideoCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  video: z.lazy(() => VideoCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  videoId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyUserInputSchema),z.lazy(() => CommentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikeCreateWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  video: z.lazy(() => VideoCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const LikeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LikeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeCreateManyUserInputSchema),z.lazy(() => LikeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FollowCreateWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowCreateWithoutFolloweeInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  follower: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema)
}).strict();

export const FollowUncheckedCreateWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUncheckedCreateWithoutFolloweeInput> = z.object({
  id: z.string().uuid().optional(),
  followerId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateOrConnectWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowCreateOrConnectWithoutFolloweeInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowCreateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema) ]),
}).strict();

export const FollowCreateManyFolloweeInputEnvelopeSchema: z.ZodType<Prisma.FollowCreateManyFolloweeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowCreateManyFolloweeInputSchema),z.lazy(() => FollowCreateManyFolloweeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FollowCreateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowCreateWithoutFollowerInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  followee: z.lazy(() => UserCreateNestedOneWithoutFollowersInputSchema)
}).strict();

export const FollowUncheckedCreateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedCreateWithoutFollowerInput> = z.object({
  id: z.string().uuid().optional(),
  followeeId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateOrConnectWithoutFollowerInputSchema: z.ZodType<Prisma.FollowCreateOrConnectWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema) ]),
}).strict();

export const FollowCreateManyFollowerInputEnvelopeSchema: z.ZodType<Prisma.FollowCreateManyFollowerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowCreateManyFollowerInputSchema),z.lazy(() => FollowCreateManyFollowerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MessageCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateWithoutSenderInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  isSeen: z.boolean().optional(),
  receiver: z.lazy(() => UserCreateNestedOneWithoutReceivedMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutSenderInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  receiverId: z.string(),
  isSeen: z.boolean().optional()
}).strict();

export const MessageCreateOrConnectWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema) ]),
}).strict();

export const MessageCreateManySenderInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManySenderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManySenderInputSchema),z.lazy(() => MessageCreateManySenderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MessageCreateWithoutReceiverInputSchema: z.ZodType<Prisma.MessageCreateWithoutReceiverInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  isSeen: z.boolean().optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutReceiverInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  senderId: z.string(),
  isSeen: z.boolean().optional()
}).strict();

export const MessageCreateOrConnectWithoutReceiverInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema) ]),
}).strict();

export const MessageCreateManyReceiverInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyReceiverInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyReceiverInputSchema),z.lazy(() => MessageCreateManyReceiverInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VideoUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VideoUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VideoUpdateWithoutUserInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VideoCreateWithoutUserInputSchema),z.lazy(() => VideoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const VideoUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.VideoUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VideoUpdateWithoutUserInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const VideoUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VideoUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => VideoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VideoUpdateManyMutationInputSchema),z.lazy(() => VideoUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const VideoScalarWhereInputSchema: z.ZodType<Prisma.VideoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VideoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VideoScalarWhereInputSchema),z.lazy(() => VideoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutUserInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutUserInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeUpdateWithoutUserInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => LikeCreateWithoutUserInputSchema),z.lazy(() => LikeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const LikeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateWithoutUserInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const LikeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => LikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateManyMutationInputSchema),z.lazy(() => LikeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const LikeScalarWhereInputSchema: z.ZodType<Prisma.LikeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  videoId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FollowUpsertWithWhereUniqueWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUpsertWithWhereUniqueWithoutFolloweeInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowUpdateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFolloweeInputSchema) ]),
  create: z.union([ z.lazy(() => FollowCreateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFolloweeInputSchema) ]),
}).strict();

export const FollowUpdateWithWhereUniqueWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUpdateWithWhereUniqueWithoutFolloweeInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateWithoutFolloweeInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFolloweeInputSchema) ]),
}).strict();

export const FollowUpdateManyWithWhereWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUpdateManyWithWhereWithoutFolloweeInput> = z.object({
  where: z.lazy(() => FollowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateManyMutationInputSchema),z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeInputSchema) ]),
}).strict();

export const FollowScalarWhereInputSchema: z.ZodType<Prisma.FollowScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowScalarWhereInputSchema),z.lazy(() => FollowScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  followeeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FollowUpsertWithWhereUniqueWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpsertWithWhereUniqueWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowUpdateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFollowerInputSchema) ]),
  create: z.union([ z.lazy(() => FollowCreateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedCreateWithoutFollowerInputSchema) ]),
}).strict();

export const FollowUpdateWithWhereUniqueWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpdateWithWhereUniqueWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateWithoutFollowerInputSchema),z.lazy(() => FollowUncheckedUpdateWithoutFollowerInputSchema) ]),
}).strict();

export const FollowUpdateManyWithWhereWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpdateManyWithWhereWithoutFollowerInput> = z.object({
  where: z.lazy(() => FollowScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowUpdateManyMutationInputSchema),z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerInputSchema) ]),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutSenderInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutSenderInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutSenderInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  receiverId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSeen: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutReceiverInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedCreateWithoutReceiverInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutReceiverInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutReceiverInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutReceiverInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverInputSchema) ]),
}).strict();

export const UserCreateWithoutVideosInputSchema: z.ZodType<Prisma.UserCreateWithoutVideosInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutVideosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVideosInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutVideosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVideosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]),
}).strict();

export const CommentCreateWithoutVideoInputSchema: z.ZodType<Prisma.CommentCreateWithoutVideoInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutVideoInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutVideoInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutVideoInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const CommentCreateManyVideoInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyVideoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyVideoInputSchema),z.lazy(() => CommentCreateManyVideoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikeCreateWithoutVideoInputSchema: z.ZodType<Prisma.LikeCreateWithoutVideoInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateWithoutVideoInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutVideoInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const LikeCreateOrConnectWithoutVideoInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutVideoInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeCreateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const LikeCreateManyVideoInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyVideoInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeCreateManyVideoInputSchema),z.lazy(() => LikeCreateManyVideoInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutVideosInputSchema: z.ZodType<Prisma.UserUpsertWithoutVideosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVideosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVideosInputSchema),z.lazy(() => UserUncheckedCreateWithoutVideosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutVideosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVideosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVideosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVideosInputSchema) ]),
}).strict();

export const UserUpdateWithoutVideosInputSchema: z.ZodType<Prisma.UserUpdateWithoutVideosInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutVideosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVideosInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const CommentUpsertWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutVideoInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutVideoInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutVideoInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutVideoInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutVideoInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutVideoInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutVideoInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutVideoInputSchema) ]),
}).strict();

export const LikeUpsertWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutVideoInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeUpdateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutVideoInputSchema) ]),
  create: z.union([ z.lazy(() => LikeCreateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedCreateWithoutVideoInputSchema) ]),
}).strict();

export const LikeUpdateWithWhereUniqueWithoutVideoInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutVideoInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateWithoutVideoInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutVideoInputSchema) ]),
}).strict();

export const LikeUpdateManyWithWhereWithoutVideoInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutVideoInput> = z.object({
  where: z.lazy(() => LikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateManyMutationInputSchema),z.lazy(() => LikeUncheckedUpdateManyWithoutVideoInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const VideoCreateWithoutCommentsInputSchema: z.ZodType<Prisma.VideoCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVideosInputSchema),
  likes: z.lazy(() => LikeCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VideoCreateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const VideoUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.VideoUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => VideoUpdateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => VideoCreateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => VideoWhereInputSchema).optional()
}).strict();

export const VideoUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.VideoUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => VideoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VideoUpdateWithoutCommentsInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const VideoUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.VideoUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVideosNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const VideoCreateWithoutLikesInputSchema: z.ZodType<Prisma.VideoCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVideosInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.VideoUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutVideoInputSchema).optional()
}).strict();

export const VideoCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.VideoCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => VideoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VideoCreateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpsertWithoutLikesInputSchema: z.ZodType<Prisma.UserUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikesInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const UserUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const VideoUpsertWithoutLikesInputSchema: z.ZodType<Prisma.VideoUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => VideoUpdateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => VideoCreateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => VideoWhereInputSchema).optional()
}).strict();

export const VideoUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.VideoUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => VideoWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VideoUpdateWithoutLikesInputSchema),z.lazy(() => VideoUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const VideoUpdateWithoutLikesInputSchema: z.ZodType<Prisma.VideoUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVideosNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowingInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowingInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
}).strict();

export const UserCreateWithoutFollowersInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowersInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFollowersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowersInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFollowersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]),
}).strict();

export const UserUpsertWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
}).strict();

export const UserUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowingInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowingInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutFollowersInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFollowersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowersInputSchema) ]),
}).strict();

export const UserUpdateWithoutFollowersInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFollowersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutSentMessagesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSentMessagesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutReceiverInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSentMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]),
}).strict();

export const UserCreateWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutReceivedMessagesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReceivedMessagesInput> = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  videos: z.lazy(() => VideoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFolloweeInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedCreateNestedManyWithoutFollowerInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export const UserUpsertWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutSentMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSentMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSentMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSentMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
}).strict();

export const UserUpdateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutSentMessagesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSentMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSentMessagesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutReceiverNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutReceivedMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutReceivedMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export const UserUpdateWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutReceivedMessagesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReceivedMessagesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videos: z.lazy(() => VideoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  followers: z.lazy(() => FollowUncheckedUpdateManyWithoutFolloweeNestedInputSchema).optional(),
  following: z.lazy(() => FollowUncheckedUpdateManyWithoutFollowerNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict();

export const VideoCreateManyUserInputSchema: z.ZodType<Prisma.VideoCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  videoUrl: z.string(),
  thumbnail: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentCreateManyUserInputSchema: z.ZodType<Prisma.CommentCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  videoId: z.string()
}).strict();

export const LikeCreateManyUserInputSchema: z.ZodType<Prisma.LikeCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  videoId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateManyFolloweeInputSchema: z.ZodType<Prisma.FollowCreateManyFolloweeInput> = z.object({
  id: z.string().uuid().optional(),
  followerId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FollowCreateManyFollowerInputSchema: z.ZodType<Prisma.FollowCreateManyFollowerInput> = z.object({
  id: z.string().uuid().optional(),
  followeeId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MessageCreateManySenderInputSchema: z.ZodType<Prisma.MessageCreateManySenderInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  receiverId: z.string(),
  isSeen: z.boolean().optional()
}).strict();

export const MessageCreateManyReceiverInputSchema: z.ZodType<Prisma.MessageCreateManyReceiverInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  senderId: z.string(),
  isSeen: z.boolean().optional()
}).strict();

export const VideoUpdateWithoutUserInputSchema: z.ZodType<Prisma.VideoUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutVideoNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutVideoNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutVideoNestedInputSchema).optional()
}).strict();

export const VideoUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  video: z.lazy(() => VideoUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  videoId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUpdateWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUpdateWithoutFolloweeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  follower: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional()
}).strict();

export const FollowUncheckedUpdateWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateWithoutFolloweeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFolloweeInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFolloweeInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUpdateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUpdateWithoutFollowerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  followee: z.lazy(() => UserUpdateOneRequiredWithoutFollowersNestedInputSchema).optional()
}).strict();

export const FollowUncheckedUpdateWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateWithoutFollowerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followeeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowUncheckedUpdateManyWithoutFollowerInputSchema: z.ZodType<Prisma.FollowUncheckedUpdateManyWithoutFollowerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  followeeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  receiver: z.lazy(() => UserUpdateOneRequiredWithoutReceivedMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receiverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSenderInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receiverId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUpdateWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUpdateWithoutReceiverInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutReceiverInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutReceiverInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutReceiverInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSeen: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyVideoInputSchema: z.ZodType<Prisma.CommentCreateManyVideoInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const LikeCreateManyVideoInputSchema: z.ZodType<Prisma.LikeCreateManyVideoInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateWithoutVideoInputSchema: z.ZodType<Prisma.CommentUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutVideoInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutVideoInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUpdateWithoutVideoInputSchema: z.ZodType<Prisma.LikeUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateWithoutVideoInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutVideoInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutVideoInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const VideoFindFirstArgsSchema: z.ZodType<Prisma.VideoFindFirstArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VideoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VideoFindFirstOrThrowArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VideoFindManyArgsSchema: z.ZodType<Prisma.VideoFindManyArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VideoScalarFieldEnumSchema,VideoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VideoAggregateArgsSchema: z.ZodType<Prisma.VideoAggregateArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithRelationInputSchema.array(),VideoOrderByWithRelationInputSchema ]).optional(),
  cursor: VideoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VideoGroupByArgsSchema: z.ZodType<Prisma.VideoGroupByArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  orderBy: z.union([ VideoOrderByWithAggregationInputSchema.array(),VideoOrderByWithAggregationInputSchema ]).optional(),
  by: VideoScalarFieldEnumSchema.array(),
  having: VideoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VideoFindUniqueArgsSchema: z.ZodType<Prisma.VideoFindUniqueArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const VideoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VideoFindUniqueOrThrowArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const LikeFindFirstArgsSchema: z.ZodType<Prisma.LikeFindFirstArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LikeFindFirstOrThrowArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeFindManyArgsSchema: z.ZodType<Prisma.LikeFindManyArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeAggregateArgsSchema: z.ZodType<Prisma.LikeAggregateArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeGroupByArgsSchema: z.ZodType<Prisma.LikeGroupByArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithAggregationInputSchema.array(),LikeOrderByWithAggregationInputSchema ]).optional(),
  by: LikeScalarFieldEnumSchema.array(),
  having: LikeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeFindUniqueArgsSchema: z.ZodType<Prisma.LikeFindUniqueArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LikeFindUniqueOrThrowArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const FollowFindFirstArgsSchema: z.ZodType<Prisma.FollowFindFirstArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowScalarFieldEnumSchema,FollowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FollowFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FollowFindFirstOrThrowArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowScalarFieldEnumSchema,FollowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FollowFindManyArgsSchema: z.ZodType<Prisma.FollowFindManyArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowScalarFieldEnumSchema,FollowScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FollowAggregateArgsSchema: z.ZodType<Prisma.FollowAggregateArgs> = z.object({
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithRelationInputSchema.array(),FollowOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FollowGroupByArgsSchema: z.ZodType<Prisma.FollowGroupByArgs> = z.object({
  where: FollowWhereInputSchema.optional(),
  orderBy: z.union([ FollowOrderByWithAggregationInputSchema.array(),FollowOrderByWithAggregationInputSchema ]).optional(),
  by: FollowScalarFieldEnumSchema.array(),
  having: FollowScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FollowFindUniqueArgsSchema: z.ZodType<Prisma.FollowFindUniqueArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const FollowFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FollowFindUniqueOrThrowArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VideoCreateArgsSchema: z.ZodType<Prisma.VideoCreateArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  data: z.union([ VideoCreateInputSchema,VideoUncheckedCreateInputSchema ]),
}).strict() ;

export const VideoUpsertArgsSchema: z.ZodType<Prisma.VideoUpsertArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
  create: z.union([ VideoCreateInputSchema,VideoUncheckedCreateInputSchema ]),
  update: z.union([ VideoUpdateInputSchema,VideoUncheckedUpdateInputSchema ]),
}).strict() ;

export const VideoCreateManyArgsSchema: z.ZodType<Prisma.VideoCreateManyArgs> = z.object({
  data: z.union([ VideoCreateManyInputSchema,VideoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VideoDeleteArgsSchema: z.ZodType<Prisma.VideoDeleteArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const VideoUpdateArgsSchema: z.ZodType<Prisma.VideoUpdateArgs> = z.object({
  select: VideoSelectSchema.optional(),
  include: VideoIncludeSchema.optional(),
  data: z.union([ VideoUpdateInputSchema,VideoUncheckedUpdateInputSchema ]),
  where: VideoWhereUniqueInputSchema,
}).strict() ;

export const VideoUpdateManyArgsSchema: z.ZodType<Prisma.VideoUpdateManyArgs> = z.object({
  data: z.union([ VideoUpdateManyMutationInputSchema,VideoUncheckedUpdateManyInputSchema ]),
  where: VideoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VideoDeleteManyArgsSchema: z.ZodType<Prisma.VideoDeleteManyArgs> = z.object({
  where: VideoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LikeCreateArgsSchema: z.ZodType<Prisma.LikeCreateArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  data: z.union([ LikeCreateInputSchema,LikeUncheckedCreateInputSchema ]),
}).strict() ;

export const LikeUpsertArgsSchema: z.ZodType<Prisma.LikeUpsertArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
  create: z.union([ LikeCreateInputSchema,LikeUncheckedCreateInputSchema ]),
  update: z.union([ LikeUpdateInputSchema,LikeUncheckedUpdateInputSchema ]),
}).strict() ;

export const LikeCreateManyArgsSchema: z.ZodType<Prisma.LikeCreateManyArgs> = z.object({
  data: z.union([ LikeCreateManyInputSchema,LikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikeDeleteArgsSchema: z.ZodType<Prisma.LikeDeleteArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeUpdateArgsSchema: z.ZodType<Prisma.LikeUpdateArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  data: z.union([ LikeUpdateInputSchema,LikeUncheckedUpdateInputSchema ]),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeUpdateManyArgsSchema: z.ZodType<Prisma.LikeUpdateManyArgs> = z.object({
  data: z.union([ LikeUpdateManyMutationInputSchema,LikeUncheckedUpdateManyInputSchema ]),
  where: LikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LikeDeleteManyArgsSchema: z.ZodType<Prisma.LikeDeleteManyArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FollowCreateArgsSchema: z.ZodType<Prisma.FollowCreateArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  data: z.union([ FollowCreateInputSchema,FollowUncheckedCreateInputSchema ]),
}).strict() ;

export const FollowUpsertArgsSchema: z.ZodType<Prisma.FollowUpsertArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
  create: z.union([ FollowCreateInputSchema,FollowUncheckedCreateInputSchema ]),
  update: z.union([ FollowUpdateInputSchema,FollowUncheckedUpdateInputSchema ]),
}).strict() ;

export const FollowCreateManyArgsSchema: z.ZodType<Prisma.FollowCreateManyArgs> = z.object({
  data: z.union([ FollowCreateManyInputSchema,FollowCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FollowDeleteArgsSchema: z.ZodType<Prisma.FollowDeleteArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const FollowUpdateArgsSchema: z.ZodType<Prisma.FollowUpdateArgs> = z.object({
  select: FollowSelectSchema.optional(),
  include: FollowIncludeSchema.optional(),
  data: z.union([ FollowUpdateInputSchema,FollowUncheckedUpdateInputSchema ]),
  where: FollowWhereUniqueInputSchema,
}).strict() ;

export const FollowUpdateManyArgsSchema: z.ZodType<Prisma.FollowUpdateManyArgs> = z.object({
  data: z.union([ FollowUpdateManyMutationInputSchema,FollowUncheckedUpdateManyInputSchema ]),
  where: FollowWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FollowDeleteManyArgsSchema: z.ZodType<Prisma.FollowDeleteManyArgs> = z.object({
  where: FollowWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;