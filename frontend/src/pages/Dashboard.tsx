import AddTaskForm from "@/demo/dashboard-demo/AddTaskForm";
import { StatusFilter } from "@/demo/dashboard-demo/StatusFilter";
import { TaskList } from "@/demo/dashboard-demo/TaskList";
import UserIndicator from "@/demo/dashboard-demo/UserIndicator";
import type { Task } from "@/types/Todo";
import axios from "axios";
import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data: todoData, mutate } = useSWR<Task[]>(
    import.meta.env.VITE_TODO_URL,
    fetcher
  );

  const handleAddTask = async (newTask: Task) => {
    const res = await axios.post(import.meta.env.VITE_TODO_URL, newTask);
    console.log(res.data);
    const { message } = res.data;
    toast.success(message);
    mutate();
  };

    const handleDeleteTask = async (todoId:string) => {
    const res = await axios.delete(`${import.meta.env.VITE_TODO_URL}/${todoId}`);
    console.log(res.data);
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Collaborative To-Do List
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time collaboration with your team
              </p>
            </div>
            <UserIndicator />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <StatusFilter />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Task Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <AddTaskForm onAddTask={handleAddTask}/>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <TaskList todo={todoData ?? []} onDeleteTask={handleDeleteTask}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
