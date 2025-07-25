import type { Task, User } from "@/types/Todo"

// Mock data for demonstration
export const mockUsers: User[] = [
  { id: "1", name: "You", avatar: "👤", isOnline: true, color: "bg-blue-500" },
  { id: "2", name: "Alice", avatar: "👩", isOnline: true, color: "bg-green-500" },
  { id: "3", name: "Bob", avatar: "👨", isOnline: true, color: "bg-purple-500" },
  { id: "4", name: "Carol", avatar: "👩‍💼", isOnline: false, color: "bg-orange-500" },
]

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new product landing page",
    status: 'in-progress',
    assignedTo: "2",
    createdBy: "2",
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-01-15T14:30:00Z"),
    isBeingEdited: false,
    editedBy: null,
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up login/register functionality with proper validation",
    status: 'pending',
    assignedTo: "1",
    createdBy: "1",
    createdAt: new Date("2024-01-15T09:15:00Z"),
    updatedAt: new Date("2024-01-15T09:15:00Z"),
    isBeingEdited: true,
    editedBy: "3",
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all endpoints with examples and response formats",
    status: 'completed',
    assignedTo: "3",
    createdBy: "2",
    createdAt: new Date("2024-01-14T16:20:00Z"),
    updatedAt: new Date("2024-01-15T11:45:00Z"),
    isBeingEdited: false,
    editedBy: null,
  },
]
