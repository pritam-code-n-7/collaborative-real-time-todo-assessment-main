import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Trash2, Save, X, Clock, UserIcon } from "lucide-react"
import { useState } from "react"
import { mockUsers } from "@/data/Todo"


export function TaskItem() {
    const [isEditing, setIsEditing] = useState(false)

  return (
    <Card
      className={"transition-all duration-200 hover:shadow-md ring-2 ring-orange-200 dark:ring-orange-800"}
    >
      <CardContent className="p-4 sm:p-6">
        {/* Real-time editing indicator */}

          <div className="flex items-center gap-2 mb-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-orange-700 dark:text-orange-300">
                Pritam is editing this task
              </span>
            </div>
          </div>


        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <Input
                value={"Design new landing page"}
                  className="text-lg font-semibold"
                  placeholder="Task title"
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{"Design new landing page"}</h3>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge className={"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}>
                {"In Progress"}
              </Badge>

              {!isEditing && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => onDeleteTask(task.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {(isEditing) && (
            <div>
              {isEditing ? (
                <Textarea
                value={"Create wireframes and mockups for the new product landing page"}
                  placeholder="Task description (optional)"
                  className="min-h-[80px]"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{"Create wireframes and mockups for the new product landing page"}</p>
              )}
            </div>
          )}

          {/* Edit Controls */}
          {isEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <Select value="pending">
                  <SelectTrigger className="w-full">
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"pending"}>Pending</SelectItem>
                    <SelectItem value={"in-progress"}>In Progress</SelectItem>
                    <SelectItem value={"completed"}>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assigned to</label>
                <Select value="👩 Alice">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger >
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <span>{user.avatar}</span>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">

                <div className="flex items-center gap-1">
                  <UserIcon className="h-3 w-3" />
                  <span>{"pritam"}</span>
                </div>

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  Created by {"Pritam"} • {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button size="sm" className="h-8">
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="h-8 bg-transparent">
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
