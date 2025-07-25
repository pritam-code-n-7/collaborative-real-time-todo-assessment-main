import { TaskItem } from "./TaskItem";

export function TaskList() {
  //   if (tasks.length === 0) {
  //     return (
  //       <div className="text-center py-12">
  //         <div className="text-gray-400 text-6xl mb-4">📝</div>
  //         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
  //         <p className="text-gray-600 dark:text-gray-400">Create your first task to get started with collaboration</p>
  //       </div>
  //     )
  //   }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tasks (2)
        </h2>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 2 }, (_, index) => (
          <TaskItem key={index}/>
        ))}
      </div>
    </div>
  );
}
