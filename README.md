# 📋 TikTok Clone API – TODO List

A checklist to track progress of API development for a TikTok-like app.

---

## 🐳 Docker Usage

### Build and Run with Docker

```bash
# Build the image
docker build -t tiktok-api .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:password@host:3306/tiktok_clone" \
  -e JWT_SECRET="your_jwt_secret_key_here" \
  -e JWT_EXPIRATION="1d" \
  -e REFRESH_TOKEN_EXPIRATION="1y" \
  -e TWO_FACTOR_SECRET="your_2fa_secret_here" \
  -e TWO_FACTOR_EXPIRATION="5m" \
  -e EMAIL_SECRET="your_email_secret_here" \
  -e CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name" \
  -e CLOUDINARY_API_KEY="your_cloudinary_api_key" \
  -e CLOUDINARY_API_SECRET="your_cloudinary_api_secret" \
  -e NODE_ENV="production" \
  -e PORT="3000" \
  tiktok-api

# Or use environment file
docker run -p 3000:3000 --env-file .env tiktok-api

# Using docker-compose (includes database)
docker-compose up -d
```

### Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - MySQL database connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `TWO_FACTOR_SECRET` - Secret key for 2FA
- `EMAIL_SECRET` - Secret key for email operations
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

---

## ✅ Project Setup
- [x] Initialize project (`npm init`, `pip`, etc.)
- [x] Set up server framework (e.g. Express, FastAPI, etc.)
- [x] Configure environment (.env, dotenv)
- [x] Set up database (PostgreSQL, MongoDB, etc.)
- [x] Connect ORM/ODM (Prisma, Mongoose, Sequelize, etc.)

---

## 🔐 Authentication
- [x] `POST /auth/signup` – Register user
- [x] `POST /auth/login` – Login user & return JWT
- [x] Middleware to protect routes using JWT
- [x] Password hashing with bcrypt or similar

---

## 👤 User Management
- [x] `GET /users/:id` – Get user profile (with `isFollowed`)
- [x] `PUT /users/:id` – Update user profile
- [x] `POST /users/:id/follow` – Follow a user
- [x] `POST /users/:id/unfollow` – Unfollow a user
- [x] `GET /users/:id/follow-status` – Check follow status
- [x] `GET /me/following` – List of users current user follows
- [x] `GET /users/search` – Search users by username
- [x] `GET /users/:id/videos` – List videos by user
- [x] `GET /users/me` – Get current user profile
---

## 🎬 Video Handling
- [x] `GET /videos/feed` – Personalized feed (followed users or algorithm)
- [x] `POST /videos` – Upload a video
- [x] `DELETE /videos/:id` – Delete video

---

## ❤️ Like System
- [x] `POST /videos/:id/like` – Like a video
- [x] `POST /videos/:id/unlike` – Unlike a video
- [x] `GET /videos/:id/likes` – List users who liked a video

---

## 💬 Comments
- [x] `POST /videos/:id/comments` – Add comment
- [x] `GET /videos/:id/comments` – Get comments for video
- [x] `DELETE /comments/:commentId` – Delete comment

---

## 💬 Chat API

### 🧵 Conversations
- [x] `GET /chats` – Get list of user’s conversations
- [x] `GET /chats/:userId` – Get messages in a conversation with a user
- [x] `DELETE /chats/:userId` – Delete a conversation
- [x] `POST /chats/:userId/send` – Send a message
- [x] `DELETE /chats/message/:messageId` – Delete a message

### 🔧 Extras
- [ ] `POST /messages/:id/seen` – Mark message as read
- [ ] Add `lastSeenId` to `/chats` response
- [ ] `GET /chats/unread-count` – Get total unread messages

---

### ⚡ Real-time Events (Socket)
- [x] `socket.emit("message:send", data)` – Send a message
- [ ] `socket.emit("message:seen", messageId)` – Mark as seen
- [ ] `socket.emit("typing", { to })` – Emit typing status

- [x] `socket.on("message:new")` – Receive new message
- [ ] `socket.on("message:seen")` – Listen for seen event
- [ ] `socket.on("typing", { from })` – Listen for typing

- [ ] `socket.on("notification:new")` – Receive new notification

## 🧪 Testing
- [ ] Add unit tests for each endpoint
- [ ] Add integration tests
- [ ] Test authentication flow
- [ ] Test follow/unfollow logic

---

## 🧰 Extra Features (Optional)
- [x] Video upload with cloud storage (e.g. Cloudinary, S3)
- [x] Notifications (new follower, likes, comments)
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] API versioning

## Socket auto docs
- [ ] Auto-generate API docs for WebSocket events  
format: 
```ts
type SocketIOSchema = {
  name: string;
  description: string;
  version: string;
  servers: Array<{
    url: string;
    description: string;
  }>;
  name_spaces: Array<{
    name: string;
    description: string;
    emits: Array<{
      name: string;
      description: string;
      schema: "jsonSchema";
    }>;
    listens: Array<{
      name: string;
      description: string;
      parameters: Array<{
        name: string;
        type: string;
        schema: "jsonSchema";
      }>;
    }>;
    // 👇 Thêm yêu cầu xác thực cho từng namespace nếu cần
    security?: Array<{
      scheme: string;
      scopes?: string[];
    }>;
  }>;
  components: {
    schemas: Record<string, any>; // JSON Schema definitions
    // 👇 Thêm phần securitySchemes như trong OpenAPI
    securitySchemes?: Record<
      string,
      {
        type: "apiKey" | "http" | "oauth2" | "openIdConnect";
        name?: string; // For apiKey
        in?: "query" | "header" | "cookie";
        scheme?: string; // For http type
        bearerFormat?: string; // For http bearer
        description?: string;
      }
    >;
  };
  // 👇 Có thể định nghĩa security toàn cục tại đây
  security?: Array<{
    scheme: string;
    scopes?: string[];
  }>;
};

```

---

✅ **Tip**: Check each item as you go! You can use `[x]` to mark it done.

---

