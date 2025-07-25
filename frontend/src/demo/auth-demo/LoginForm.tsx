import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { passwordValidation } from "@/lib/helpers";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email('Please enter a valid email.').trim(),
  password: z.string().trim().min(6, 'Password is too short.').regex(passwordValidation, 'Your password is not valid.')
});

const LoginForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  });
  const navigate = useNavigate();

  // Handle form status 
  const { isSubmitting }  = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await axios.post(import.meta.env.VITE_LOGIN_URL, values)
      console.log(res.data);
      const {message} = res.data;
      if(res.data.success){
        localStorage.setItem('token', res.data.jwtToken)
        localStorage.setItem('_id', res.data._id)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('isOnline', res.data.isOnline)
        toast.success(message)
        navigate('/dashboard')
      }
      
    } catch (error:unknown) {
      console.error(error);
      let message = "An error occurred";
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          message = error.response?.data?.message;
        }
      }
      toast.error(message)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your account to continue collaborating
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="user-email-address">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        required
                        id="user-email-address"
                        type="email"
                        title="Email"
                        placeholder="Enter your email address"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="user-password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        required
                        id="user-password"
                        type="password"
                        title="Password"
                        placeholder="Confirm your password"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to={'/signup'} className="text-blue-600 hover:underline">
                Signup
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
