"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, FileSearch, Rocket, ArrowRight } from "lucide-react"

export function GeneratedWorkflow() {
  const workflowSteps = [
    {
      id: "idea",
      title: "Idea",
      icon: Lightbulb,
      color: "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      id: "review",
      title: "Review",
      icon: FileSearch,
      color: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: "launch",
      title: "Launch",
      icon: Rocket,
      color: "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">🔄 AI Generated Workflow</CardTitle>
        <p className="text-sm text-gray-600">Draggable process flow with connected stages</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-4 overflow-x-auto">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div
                className={`
                  relative cursor-move transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-xl hover:-translate-y-1
                  min-w-[120px] p-4 rounded-lg border-2 ${step.color}
                `}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", step.id)
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  <span className="font-medium text-sm">{step.title}</span>
                </div>

                {/* Drag indicator */}
                <div className="absolute top-1 right-1 opacity-50">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full mt-0.5"></div>
                  <div className="w-1 h-1 bg-current rounded-full mt-0.5"></div>
                </div>
              </div>

              {index < workflowSteps.length - 1 && <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Tip:</strong> Drag and drop cards to reorder your workflow steps
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
