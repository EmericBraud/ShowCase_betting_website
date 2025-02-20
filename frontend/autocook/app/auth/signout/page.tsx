'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@nextui-org/progress';

export default function SignOut() {
    const router = useRouter();

    useEffect(() => {
        signOut().then(() => {
            console.log('Logged out !');
            router.push('/'); // Utilisez router.push pour rediriger
        });
    }, [router]);

    return (
        <div className="grid place-items-center h-screen">
            <CircularProgress aria-label="Logging out..." size="lg" />
        </div>
    );
}
