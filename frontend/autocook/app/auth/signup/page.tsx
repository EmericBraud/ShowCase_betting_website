'use client';
import { Card, CardHeader, CardBody, Button, Input, CardFooter, Link } from '@nextui-org/react';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [isError, setError] = useState(false);
    const router = useRouter();

    const handleSignup: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setError(true);
            return;
        }
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        if (response.ok) {
            router.push('/auth/signin');
        } else {
            console.error('Failed to sign up');
        }
    };

    return (
        <Card>
            <CardHeader>
                <h4 className="centeredText">Signing up</h4>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSignup} className="spaceSubItems">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError(password === confirmPassword);
                        }}
                        placeholder="Confirm password"
                        isInvalid={isError}
                        errorMessage="Passwords are not corresponding"
                    />
                    <Button type="submit" color="success" className="centeredText font-bold">
                        Confirm
                    </Button>
                </form>
            </CardBody>
            <CardFooter>
                <pre>Already an account ? </pre>
                <Link href="./signin">Sign in !</Link>
            </CardFooter>
        </Card>
    );
}
