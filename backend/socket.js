export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", (userId) => {
            socket.join(userId);
        });

        socket.on("task-created", (task) => {
            socket.broadcast.emit("task update", { type: "CRAETE", task });
        });
        socket.on("task-updated", (task) => {
            socket.broadcast.emit("task-update", { type: "UPDATE", task });
        });

        socket.on("task-deleted", (taskId) => {
            socket.broadcast.emit("task-update", { type: "DELETE", taskId } );
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}
