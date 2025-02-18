import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginAccount, setError } from "@/services/features/authentication/authSlice";
import { useAppDispatch } from "@/services/store/store";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


type FormLoginValues = {
    emailOrUsername: string;  // Hỗ trợ cả email hoặc username
    password: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormLoginValues>({
        defaultValues: {
            emailOrUsername: "",
            password: "",
        },
    });

    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit = (data: FormLoginValues) => {
        setIsLoading(true);

        dispatch(loginAccount(data))
            .unwrap()
            .then((response) => {
                const role = response.user.role;
                if (role === "ADMIN") {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false));
    };


    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your Acme Inc account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="emailOrUsername">Email or Username</Label>
                                <Input
                                    id="emailOrUsername"
                                    type="text"
                                    placeholder="Enter your email or username"
                                    {...register("emailOrUsername", { required: "Email or Username is required" })}
                                />
                                {errors.emailOrUsername && (
                                    <p className="text-sm text-red-500">* {errors.emailOrUsername.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", { required: "Password is required" })}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">* {errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                            <div className="flex items-center justify-center my-4">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500 bg-white">Or continue with</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://banghedagiasi.com/wp-content/uploads/2020/08/a586f246d42f2871713e-1.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}