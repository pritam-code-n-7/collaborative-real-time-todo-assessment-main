import AddTaskForm from "@/demo/dashboard-demo/AddTaskForm"
import { StatusFilter } from "@/demo/dashboard-demo/StatusFilter"
import { TaskList } from "@/demo/dashboard-demo/TaskList"
import UserIndicator from "@/demo/dashboard-demo/UserIndicator"

const Dashboard = () => {
  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Collaborative To-Do List</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time collaboration with your team</p>
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
              <AddTaskForm />
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard