import type { Task } from "@/types/Todo";
import { TaskItem } from "./TaskItem";

interface TaskList{
  todo: Task[],
  onDeleteTask: (id: string) => Promise<void>
}

export function TaskList({ todo, onDeleteTask }:TaskList) {

    if (todo?.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-600 dark:text-gray-400">Create your first task to get started with collaboration</p>
        </div>
      )
    }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tasks ({todo?.length})
        </h2>
      </div>

      <div className="space-y-3">
        {
          todo?.map((todo:Task)=>(
            <TaskItem 
              key={todo._id} 
              title={todo.title} 
              status={todo.status}
              desc={todo.description ?? ""} 
              assignedTo={todo.assignedTo ?? ''} 
              createdBy= {todo.createdBy}
              createdAt={todo.createdAt ? new Date(todo.createdAt) : new Date()}
              onDeleteTask={() => onDeleteTask(todo._id ?? '')}
              />))
        }
      </div>
    </div>
  );
}
