export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  assignedTo?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  isBeingEdited: boolean
  editedBy: string | null
}

export interface User {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  color: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface TaskFormData {
  title: string
  description?: string
  status: TaskStatus
  assignedTo?: string
}
