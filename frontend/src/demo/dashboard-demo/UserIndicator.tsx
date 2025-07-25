import { Card, CardContent } from "@/components/ui/card"
import { mockUsers } from "@/data/Todo"
import type { User } from "@/types/Todo"
import { Wifi } from "lucide-react"

const UserIndicator = () => {
    const onlineUsers = mockUsers.filter((user:User)=>user.isOnline)
  return (
    <Card className="w-full sm:w-auto">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Online ({onlineUsers.length})</span>
          </div>

          <div className="flex items-center gap-1">
            {onlineUsers.slice(0, 4).map((user) => (
              <div key={user.id} className="relative group" title={user.name}>
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
                  ${user.color} ${user.id === "1" ? "ring-2 ring-blue-400" : ""}
                  transition-transform hover:scale-110
                `}
                >
                  {user.avatar}
                </div>
                {user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {user.name} {user.id === "1"  && "(You)"}
                </div>
              </div>
            ))}

            {onlineUsers.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                +{onlineUsers.length - 4}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserIndicator