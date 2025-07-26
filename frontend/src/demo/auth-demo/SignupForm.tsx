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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { passwordValidation } from "@/lib/helpers";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email('Please enter a valid email.').trim(),
  password: z.string().trim().min(6, 'Password is too short.').regex(passwordValidation, 'Your password is not valid.'),
  avatar: z.string().nonempty(),
  color: z.string().nonempty(),
});

const SignupForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
      avatar:"👤",
      color:"bg-blue-500",
    },
  });

  const navigate = useNavigate();

  // Handle form status 
  const { isSubmitting }  = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload={
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
      color: values.color
    }
    try {
      const res = await axios.post(import.meta.env.VITE_SIGNUP_URL, payload)
      console.log(res.data);
      const {message} = res.data;
      toast.success(message)
      navigate('/login')
      
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
        <CardTitle className="text-2xl">Create account</CardTitle>
        <CardDescription>
          Join TodoCollab and start collaborating on tasks
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="user-full-name">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        required
                        id="user-full-name"
                        type="text"
                        title="Full Name"
                        placeholder="eg.,Pritam Nandy"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="user-email-address">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        required
                        id="user-email-address"
                        type="email"
                        title="Email"
                        placeholder="e.g.,nandypritam@gmail.com"
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
                        placeholder="Create a strong password"
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
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"👤"}>👤</SelectItem>
                          <SelectItem value={"👩"}>👩</SelectItem>
                          <SelectItem value={"👨"}>👨</SelectItem>
                          <SelectItem value={"👩‍💼"}>👩‍💼</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"bg-blue-500"}>
                            <div className="bg-blue-500 w-5 h-5 rounded-full border"/>
                          </SelectItem>
                          <SelectItem value={"bg-green-500"}>
                            <div className="bg-green-500 w-5 h-5 rounded-full border"/>
                          </SelectItem>
                          <SelectItem value={"bg-purple-500"}>
                            <div className="bg-purple-500 w-5 h-5 rounded-full border"/>
                          </SelectItem>
                          <SelectItem value={"bg-orange-500"}>
                            <div className="bg-orange-500 w-5 h-5 rounded-full border"/>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to={'/login'} className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;
