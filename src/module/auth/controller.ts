import * as loginType from "./types/login.type";
import * as signupType from "./types/signup.type";

import bcrypt from 'bcryptjs';
import { Get, IsAuth, Post } from '@lib/httpMethod'
import { Validate } from '@lib/validate'
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '@utils/exception'
import { generateAccessToken, generateEmailToken, generateRefreshToken, generateTempToken, verifyEmailToken, verifyRefreshToken, verifyTempToken } from '@utils/jwt'
import { Logger } from '@utils/logger'
import prisma from 'config/prisma.config'


const logger = new Logger("Auth");

export default class AuthController {
    @Post()
    @Validate(signupType.schema)
    async signup(req: signupType.Req) {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ConflictError("User already exists");
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username: email.split('@')[0], // Use email prefix as username
                email,
                passwordHash: await bcrypt.hash(password, 10),
            }
        });

        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser.id);

        return new signupType.signupRes(
            accessToken,
            refreshToken,
        )
    }


    @Post()
    @Validate(loginType.schema)
    async login(req: loginType.Req) {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid credentials");
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user.id);

        return new loginType.loginRes(
            accessToken,
            refreshToken,
        );

    }

}
