import { Server, Socket } from "socket.io";
import { ITodoType } from "./model/todo.model.js";


interface TaskUpdatePayload {
    type: "CRAETE" | "UPDATE" | "DELETE";
    task?: ITodoType;
    taskId?: string;
}

export function setupSocket(io: Server): void {
    io.on("connection", (socket: Socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", (userId: string) => {
            socket.join(userId);
        });

        socket.on("task-created", (task: ITodoType) => {
            socket.broadcast.emit("task update", { type: "CRAETE", task } as TaskUpdatePayload);
        });
        socket.on("task-updated", (task: ITodoType) => {
            socket.broadcast.emit("task-update", { type: "UPDATE", task } as TaskUpdatePayload);
        });

        socket.on("task-deleted", (taskId: string) => {
            socket.broadcast.emit("task-update", { type: "DELETE", taskId } as TaskUpdatePayload);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}
