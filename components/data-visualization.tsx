"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DataVisualization() {
  const chartData = [
    { task: "Design", duration: 5, color: "bg-blue-500" },
    { task: "Dev", duration: 10, color: "bg-green-500" },
    { task: "Test", duration: 3, color: "bg-orange-500" },
  ]

  const maxDuration = Math.max(...chartData.map((item) => item.duration))

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">📊 Task Duration Analysis</CardTitle>
        <p className="text-sm text-gray-600">AI-generated visualization of project timelines</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-700 text-right">{item.task}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
                  style={{
                    width: `${(item.duration / maxDuration) * 100}%`,
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <span className="text-white text-sm font-medium">{item.duration}d</span>
                </div>
              </div>
              <div className="w-12 text-sm text-gray-500">{item.duration}d</div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Duration:</span>
            <span className="font-medium">{chartData.reduce((sum, item) => sum + item.duration, 0)} days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
