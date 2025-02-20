import NextAuth from 'next-auth';
import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image?: string;
            isAdmin: boolean;
        };
    }
    interface User extends DefaultUser {
        isAdmin: boolean;
    }
}
