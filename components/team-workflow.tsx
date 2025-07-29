"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/hooks/use-ai"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Plus,
  Users,
  Workflow,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  User,
  ArrowRight,
  Sparkles,
  Target,
  Calendar,
  MessageSquare,
} from "lucide-react"

interface WorkflowStep {
  id: number
  title: string
  description: string
  assignee: string
  status: string
  dueDate: string
  order: number
}

interface TeamWorkflow {
  id: number
  name: string
  description: string
  steps: WorkflowStep[]
  status: string
  createdAt: string
}

export function TeamWorkflow() {
  const [workflows, setWorkflows] = useState<TeamWorkflow[]>([
    {
      id: 1,
      name: "Product Development Process",
      description: "Complete workflow for developing new products",
      status: "Active",
      createdAt: "2024-03-01",
      steps: [
        {
          id: 1,
          title: "Requirements Gathering",
          description: "Collect and document product requirements",
          assignee: "Sarah Chen",
          status: "Completed",
          dueDate: "2024-03-05",
          order: 1
        },
        {
          id: 2,
          title: "Design Phase",
          description: "Create wireframes and mockups",
          assignee: "Mike Johnson",
          status: "In Progress",
          dueDate: "2024-03-15",
          order: 2
        },
        {
          id: 3,
          title: "Development",
          description: "Build the product features",
          assignee: "Alex Kim",
          status: "Not Started",
          dueDate: "2024-04-01",
          order: 3
        },
        {
          id: 4,
          title: "Testing & QA",
          description: "Test and quality assurance",
          assignee: "Emily Davis",
          status: "Not Started",
          dueDate: "2024-04-15",
          order: 4
        }
      ]
    },
    {
      id: 2,
      name: "Content Creation Workflow",
      description: "Process for creating and publishing content",
      status: "Active",
      createdAt: "2024-03-10",
      steps: [
        {
          id: 5,
          title: "Topic Research",
          description: "Research and select content topics",
          assignee: "Sarah Chen",
          status: "Completed",
          dueDate: "2024-03-12",
          order: 1
        },
        {
          id: 6,
          title: "Content Writing",
          description: "Write the content draft",
          assignee: "Mike Johnson",
          status: "In Progress",
          dueDate: "2024-03-20",
          order: 2
        },
        {
          id: 7,
          title: "Review & Edit",
          description: "Review and edit content",
          assignee: "Emily Davis",
          status: "Not Started",
          dueDate: "2024-03-25",
          order: 3
        }
      ]
    }
  ])

  const [isAddingWorkflow, setIsAddingWorkflow] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    steps: [{ title: "", description: "", assignee: "", dueDate: "" }]
  })

  const { toast } = useToast()
  const { generateContent, isLoading } = useAI()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4" />
      case "In Progress":
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleAddWorkflow = () => {
    if (!newWorkflow.name || !newWorkflow.description) {
      toast({
        title: "Missing information",
        description: "Please fill in workflow name and description.",
        variant: "destructive",
      })
      return
    }

    const workflow: TeamWorkflow = {
      id: workflows.length + 1,
      name: newWorkflow.name,
      description: newWorkflow.description,
      status: "Active",
      createdAt: new Date().toISOString().split('T')[0],
      steps: newWorkflow.steps
        .filter(step => step.title && step.assignee)
        .map((step, index) => ({
          id: Date.now() + index,
          title: step.title,
          description: step.description,
          assignee: step.assignee,
          status: "Not Started",
          dueDate: step.dueDate,
          order: index + 1
        }))
    }

    setWorkflows([...workflows, workflow])
    setNewWorkflow({
      name: "",
      description: "",
      steps: [{ title: "", description: "", assignee: "", dueDate: "" }]
    })
    setIsAddingWorkflow(false)

    toast({
      title: "Workflow added",
      description: "New team workflow has been created.",
    })
  }

  const handleDeleteWorkflow = (id: number) => {
    setWorkflows(workflows.filter(w => w.id !== id))
    toast({
      title: "Workflow deleted",
      description: "Workflow has been removed.",
    })
  }

  const handleGenerateWorkflow = async () => {
    try {
      const result = await generateContent(
        "Generate a team workflow for project management with clear steps, assignees, and timelines",
        "workflow"
      )
      
      const aiWorkflow: TeamWorkflow = {
        id: workflows.length + 1,
        name: "AI Generated Workflow",
        description: result?.content || "AI generated workflow description",
        status: "Active",
        createdAt: new Date().toISOString().split('T')[0],
        steps: [
          {
            id: Date.now(),
            title: "AI Generated Step 1",
            description: "First step in the AI generated workflow",
            assignee: "AI Assistant",
            status: "Not Started",
            dueDate: "2024-04-15",
            order: 1
          }
        ]
      }

      setWorkflows([...workflows, aiWorkflow])
      toast({
        title: "AI Workflow Generated",
        description: "New workflow has been created using AI.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate workflow with AI.",
        variant: "destructive",
      })
    }
  }

  const addStep = () => {
    setNewWorkflow({
      ...newWorkflow,
      steps: [...newWorkflow.steps, { title: "", description: "", assignee: "", dueDate: "" }]
    })
  }

  const removeStep = (index: number) => {
    setNewWorkflow({
      ...newWorkflow,
      steps: newWorkflow.steps.filter((_, i) => i !== index)
    })
  }

  const updateStep = (index: number, field: string, value: string) => {
    const updatedSteps = [...newWorkflow.steps]
    updatedSteps[index] = { ...updatedSteps[index], [field]: value }
    setNewWorkflow({ ...newWorkflow, steps: updatedSteps })
  }

  return (
    <div className="p-8 w-full max-w-none">
      <div className="mb-6 flex items-center justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Workflow</h1>
          <p className="text-gray-600">Manage team processes and workflows</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGenerateWorkflow} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner type="inline" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
          <Dialog open={isAddingWorkflow} onOpenChange={setIsAddingWorkflow}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogDescription>
                  Define a new team workflow with steps and assignees
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Workflow Name</label>
                    <Input
                      value={newWorkflow.name}
                      onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                      placeholder="Enter workflow name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={newWorkflow.description}
                      onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                      placeholder="Enter workflow description"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium">Workflow Steps</label>
                    <Button type="button" variant="outline" size="sm" onClick={addStep}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Step
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {newWorkflow.steps.map((step, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Step {index + 1}</h4>
                          {newWorkflow.steps.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStep(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Step Title</label>
                            <Input
                              value={step.title}
                              onChange={(e) => updateStep(index, "title", e.target.value)}
                              placeholder="Enter step title"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Assignee</label>
                            <Input
                              value={step.assignee}
                              onChange={(e) => updateStep(index, "assignee", e.target.value)}
                              placeholder="Enter assignee name"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                              value={step.description}
                              onChange={(e) => updateStep(index, "description", e.target.value)}
                              placeholder="Enter step description"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Due Date</label>
                            <Input
                              type="date"
                              value={step.dueDate}
                              onChange={(e) => updateStep(index, "dueDate", e.target.value)}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddingWorkflow(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddWorkflow}>
                    Create Workflow
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="w-5 h-5" />
                    {workflow.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteWorkflow(workflow.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflow.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{step.order}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{step.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{step.dueDate}</span>
                      </div>
                      <Badge className={getStatusColor(step.status)}>
                        {getStatusIcon(step.status)}
                        <span className="ml-1">{step.status}</span>
                      </Badge>
                    </div>
                    {index < workflow.steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 