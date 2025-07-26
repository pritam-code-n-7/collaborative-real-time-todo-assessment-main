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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import useSWR from "swr";
import type { User } from "@/types/Todo";

const fetcher = (url:string)=> axios.get(url).then((res)=>res.data)

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
  assignedTo: z.string().optional(),
});

const AddTaskForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      assignedTo: "",
    },
  });

    const [author, setAuthor] = useState("")
    const {data:userData } = useSWR<User[]>(import.meta.env.VITE_USER_URL, fetcher)

  // Handle fetch user session
  useEffect(()=>{
    setAuthor(localStorage.getItem('name') || '')
  },[])

  // Handle form status
  const { isSubmitting } = form.formState;
  const isTitle = form.watch('title')

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload = {
      title: values.title,
      description: values.description,
      status: values.status,
      assignedTo: values.assignedTo,
      createdBy: author,
    }
    try {
      const res = await axios.post(import.meta.env.VITE_TODO_URL, payload);
      console.log(res.data);
      const { message } = res.data;
      form.reset()
      toast.success(message);
    } catch (error: unknown) {
      console.error(error);
      let message = "An error occurred";
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          message = error.response?.data?.message;
        }
      }
      toast.error(message);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter task title"
                      required
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Enter task description (optional)"
                      className="min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"pending"}>Pending</SelectItem>
                          <SelectItem value={"in-progress"}>In Progress</SelectItem>
                          <SelectItem value={"completed"}>Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder='Assign'/>
                        </SelectTrigger>
                        <SelectContent>
                          {userData?.map((user:User) => (
                            <SelectItem key={user._id} value={user.name}>
                              <div className="flex items-center gap-2">
                                {/* <span>{user.avatar}</span> */}
                                <span>{user.name}</span>
                                {/* {user.id === "1" && (
                                  <span className="text-xs text-gray-500">
                                    (You)
                                  </span>
                                )} */}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isTitle || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Task...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;
