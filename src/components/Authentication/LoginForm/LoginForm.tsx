import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loginAccount, setError } from "@/services/features/authentication/authSlice";
import { useAppDispatch } from "@/services/store/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormLoginValues = {
    username: string;
    password: string;
};

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm<FormLoginValues>({
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const onSubmit = (data: FormLoginValues) => {
        dispatch(loginAccount(data))
            .unwrap()
            .then((response) => {
                const role = response.role;
                if (role === "ADMIN") {
                    navigate("/product-management");
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                toast.error(error.response?.data);
            })
    };
    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);
    return (
        <div className={cn("flex flex-col gap-6 min-h-screen items-center justify-center", className)} {...props}>
            <Card className="overflow-hidden shadow-lg border-0 w-[400px]">
                <CardContent className="p-6 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold">Sign In</h1>
                            <p className="text-sm text-muted-foreground">
                                Welcome back!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="h-10"
                                    {...register("username", { required: "Username is required" })}
                                />
                                {errors.username &&
                                    <p className="text-sm text-red-500">* {errors.username.message}</p>
                                }
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-10"
                                    {...register("password", { required: "Password is required" })}
                                />
                                {errors.password &&
                                    <p className="text-sm text-red-500">* {errors.password.message}</p>
                                }
                            </div>
                        </div>


                        <Button type="submit" className="w-full h-10">
                            Sign In
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
