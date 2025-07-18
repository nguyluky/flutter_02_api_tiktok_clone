# 📋 TikTok Clone API – TODO List

A checklist to track progress of API development for a TikTok-like app.

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

---

✅ **Tip**: Check each item as you go! You can use `[x]` to mark it done.

---

