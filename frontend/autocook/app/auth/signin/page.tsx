"use client";

import { Card, CardHeader, CardBody, Button, Input, Link, CardFooter } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="centeredText">
          Log in
        </h4>
      </CardHeader>
      <CardBody>
      <form onSubmit={handleSignin}>
        <br/>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br/>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br/>
        <br/>
        <Button type="submit" color="secondary" className="centeredText font-bold">Confirm</Button>
      </form>
      </CardBody>
      <CardFooter>
          <pre>No account ? </pre>
          <Link href="./signup">
            Sign in !
          </Link>        
      </CardFooter>
      
    </Card>
  );
}
