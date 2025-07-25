export type TUserType={
    name: string
    email: string
    password: string
}

export type TTodoType={
    title: string
    description?: string
    status: 'pending' | 'in-progress' | 'completed'
    assignedTo?: string,
    createdBy: string
}