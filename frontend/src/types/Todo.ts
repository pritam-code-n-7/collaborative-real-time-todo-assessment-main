export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  _id: string
  id: string
  title: string
  description?: string
  status: TaskStatus
  assignedTo?: string
  createdBy: string
  createdAt?: Date
  updatedAt?: Date
  isBeingEdited?: boolean
  editedBy?: string | null
}

export interface User {
  _id: string
  name: string
  email: string
  password: string
  avatar?: string
  isOnline?: boolean
  color?: string
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
