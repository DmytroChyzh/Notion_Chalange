"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/hooks/use-ai"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Plus,
  Filter,
  SortAsc,
  MoreHorizontal,
  Sparkles,
  BarChart3,
  Link,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Target,
  TrendingUp,
  Milestone,
} from "lucide-react"

interface Project {
  id: number
  title: string
  status: string
  owner: string
  dueDate: string
  priority: string
  progress: number
  description: string
  milestones: string[]
}

export function ProjectRoadmap() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Q1 Marketing Campaign",
      status: "In Progress",
      owner: "Sarah Chen",
      dueDate: "2024-03-15",
      priority: "High",
      progress: 65,
      description: "Comprehensive marketing campaign for Q1 product launch",
      milestones: ["Research completed", "Strategy defined", "Content creation in progress"]
    },
    {
      id: 2,
      title: "Website Redesign",
      status: "Planning",
      owner: "Mike Johnson",
      dueDate: "2024-04-01",
      priority: "Medium",
      progress: 25,
      description: "Complete website redesign with modern UI/UX",
      milestones: ["Requirements gathered", "Design phase starting"]
    },
    {
      id: 3,
      title: "Product Launch Event",
      status: "Completed",
      owner: "Emily Davis",
      dueDate: "2024-02-28",
      priority: "High",
      progress: 100,
      description: "Major product launch event with press coverage",
      milestones: ["Event planned", "Venue booked", "Event completed successfully"]
    },
    {
      id: 4,
      title: "Customer Survey Analysis",
      status: "Not Started",
      owner: "Alex Kim",
      dueDate: "2024-03-30",
      priority: "Low",
      progress: 0,
      description: "Analyze customer feedback and survey results",
      milestones: ["Survey design", "Data collection", "Analysis and reporting"]
    },
  ])

  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    owner: "",
    dueDate: "",
    priority: "Medium",
    milestones: [""]
  })

  const { toast } = useToast()
  const { generateContent, isLoading } = useAI()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "Planning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddProject = () => {
    if (!newProject.title || !newProject.owner || !newProject.dueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const project: Project = {
      id: projects.length + 1,
      title: newProject.title,
      status: "Planning",
      owner: newProject.owner,
      dueDate: newProject.dueDate,
      priority: newProject.priority,
      progress: 0,
      description: newProject.description,
      milestones: newProject.milestones.filter(m => m.trim() !== "")
    }

    setProjects([...projects, project])
    setNewProject({
      title: "",
      description: "",
      owner: "",
      dueDate: "",
      priority: "Medium",
      milestones: [""]
    })
    setIsAddingProject(false)

    toast({
      title: "Project added",
      description: "New project has been added to the roadmap.",
    })
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
    toast({
      title: "Project deleted",
      description: "Project has been removed from the roadmap.",
    })
  }

  const handleGenerateRoadmap = async () => {
    try {
      const result = await generateContent(
        "Generate a comprehensive project roadmap with 5 projects including titles, descriptions, owners, due dates, and milestones",
        "table"
      )
      
      // Parse the AI response and add to projects
      // This is a simplified version - in a real app you'd parse the AI response properly
      const aiProject: Project = {
        id: projects.length + 1,
        title: "AI Generated Project",
        status: "Planning",
        owner: "AI Assistant",
        dueDate: "2024-04-15",
        priority: "Medium",
        progress: 0,
        description: result?.content || "AI generated project description",
        milestones: ["AI generated milestone 1", "AI generated milestone 2"]
      }

      setProjects([...projects, aiProject])
      toast({
        title: "AI Roadmap Generated",
        description: "New project has been added using AI.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate roadmap with AI.",
        variant: "destructive",
      })
    }
  }

  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === "Completed").length
  const inProgressProjects = projects.filter(p => p.status === "In Progress").length

  return (
    <div className="p-8 w-full max-w-none">
      <div className="mb-6 flex items-center justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Roadmap</h1>
          <p className="text-gray-600">AI-generated project tracking table with smart columns and data</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleGenerateRoadmap} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner type="inline" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
          <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>
                  Create a new project for your roadmap
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Project Title</label>
                  <Input
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Owner</label>
                    <Input
                      value={newProject.owner}
                      onChange={(e) => setNewProject({...newProject, owner: e.target.value})}
                      placeholder="Enter owner name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <Input
                      type="date"
                      value={newProject.dueDate}
                      onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject}>
                    Add Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{inProgressProjects}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {project.owner.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {project.owner}
                      </div>
                    </TableCell>
                    <TableCell>{project.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEditProject(project)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Milestone className="w-5 h-5" />
          Key Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{milestone}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 