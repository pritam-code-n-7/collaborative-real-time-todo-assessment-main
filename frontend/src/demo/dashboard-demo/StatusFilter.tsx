import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function StatusFilter() {
  const filters = [
    { key: "all" as const, label: "All Tasks", count: 2 },
    { key: "pending", label: "Pending", count: 0 },
    { key: "in-progress", label: "In Progress", count: 2 },
    { key: "completed", label: "Completed", count: 0 },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={"all" === filter.key ? "default" : "outline"}
          size="sm"
        //   onClick={}
          className="flex items-center gap-2"
        >
          <span>{filter.label}</span>
          <Badge
            variant="secondary"
            className={`
              ${
                "all" === filter.key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }
            `}
          >
            {filter.count}
          </Badge>
        </Button>
      ))}
    </div>
  )
}
