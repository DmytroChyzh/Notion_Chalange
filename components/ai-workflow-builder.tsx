"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, CheckCircle2, Clock, Users, FileText, Sparkles, Plus, Settings } from "lucide-react"

interface WorkflowStep {
  id: string
  title: string
  description: string
  status: "pending" | "active" | "completed"
  assignee: string
  duration: string
  type: "task" | "approval" | "review"
}

export function AIWorkflowBuilder() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: "1",
      title: "Project Initiation",
      description: "Define project scope, objectives, and initial requirements",
      status: "completed",
      assignee: "Project Manager",
      duration: "2 days",
      type: "task",
    },
    {
      id: "2",
      title: "Stakeholder Approval",
      description: "Get approval from key stakeholders and budget sign-off",
      status: "active",
      assignee: "Executive Team",
      duration: "1 day",
      type: "approval",
    },
    {
      id: "3",
      title: "Resource Allocation",
      description: "Assign team members and allocate necessary resources",
      status: "pending",
      assignee: "Resource Manager",
      duration: "1 day",
      type: "task",
    },
    {
      id: "4",
      title: "Development Phase",
      description: "Execute the main development work according to specifications",
      status: "pending",
      assignee: "Development Team",
      duration: "2 weeks",
      type: "task",
    },
    {
      id: "5",
      title: "Quality Review",
      description: "Comprehensive testing and quality assurance review",
      status: "pending",
      assignee: "QA Team",
      duration: "3 days",
      type: "review",
    },
    {
      id: "6",
      title: "Final Approval",
      description: "Final sign-off and approval for project completion",
      status: "pending",
      assignee: "Project Sponsor",
      duration: "1 day",
      type: "approval",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "active":
        return <Play className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle2 className="w-4 h-4" />
      case "review":
        return <FileText className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "approval":
        return "bg-purple-100 text-purple-800"
      case "review":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const handleGenerateWorkflow = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Development Workflow</h1>
          <p className="text-gray-600">AI-generated process flow with automated task management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleGenerateWorkflow}
            disabled={isGenerating}
            className="gap-2 bg-transparent"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate Workflow with AI"}
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
        </div>
      </div>

      {/* Workflow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Completed</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {workflowSteps.filter((step) => step.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Active</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {workflowSteps.filter((step) => step.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Pending</span>
            </div>
            <div className="text-2xl font-bold text-gray-600">
              {workflowSteps.filter((step) => step.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">Total Steps</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{workflowSteps.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Visualization */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Workflow Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}
                >
                  {getStatusIcon(step.status)}
                </div>

                <div className="flex-1">
                  <Card
                    className={`transition-all duration-200 hover:shadow-md ${step.status === "active" ? "ring-2 ring-blue-200" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{step.title}</h3>
                            <Badge variant="secondary" className={`text-xs ${getTypeColor(step.type)}`}>
                              <div className="flex items-center gap-1">
                                {getTypeIcon(step.type)}
                                {step.type}
                              </div>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {step.assignee}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(step.status)}>
                          {step.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {index < workflowSteps.length - 1 && (
                  <div className="flex-shrink-0 ml-4">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium">33%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33%" }}></div>
              </div>
              <div className="text-xs text-gray-500">2 of 6 steps completed • Estimated completion: 3 weeks</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Development Team</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  High
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">QA Team</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Medium
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Executive Team</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Low
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
