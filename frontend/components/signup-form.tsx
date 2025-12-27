"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "signup" | "login";

const handleSubmit = async ({
  mode,
  name,
  email,
  password,
}: {
  mode: AuthMode;
  name?: string;
  email: string;
  password: string;
}) => {
  try {
    if (mode === "signup") {
      const res = await axios.post("http://localhost:3001/SignUp", {
        name,
        email,
        password,
      });
      return res.data;
    }

    if (mode === "login") {
      const res = await axios.post("http://localhost:3001/SignIn", {
        email,
        password,
      });
      return res.data;
    }
  } catch (err) {
    console.error(err);
    throw err; // important
  }
};

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [mode, setmode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await handleSubmit({
      mode,
      name: mode === "signup" ? name : undefined,
      email,
      password,
    });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    }
  };
  return mode === "signup" ? (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  <button type="button" onClick={() => setmode("login")}>
                    Already have an account? <a href="#">Log In</a>
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  ) : (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Log In to your account</CardTitle>
        <CardDescription>
          Enter your information below to log into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button
                  onClick={() => console.log("Button clicked")}
                  className="cursor-pointer"
                  type="submit"
                >
                  Log In
                </Button>
                <FieldDescription className="px-6 text-center">
                  <button type="button" onClick={() => setmode("signup")}>
                    Don&apos;t have an account? <a href="#">Sign Up</a>
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
