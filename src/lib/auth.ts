import { PrismaClient } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                // Find user in database
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });

                if (!user) {
                    return null;
                }

                // Compare password (plaintext comparison as per seed data)
                if (user.password !== credentials.password) {
                    return null;
                }

                // Return user object
                return {
                    id: user.id,
                    name: user.username,
                    email: user.username,
                };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};
