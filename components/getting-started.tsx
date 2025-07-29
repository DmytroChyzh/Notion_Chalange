"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAI } from "@/hooks/use-ai"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  Target,
  Users,
  FileText,
  Table,
  Workflow,
  Calendar,
  MessageSquare,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react"

export function GettingStarted() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2])
  const [isGenerating, setIsGenerating] = useState(false)

  const { toast } = useToast()
  const { generateContent, isLoading } = useAI()

  const steps = [
    {
      id: 1,
      title: "Welcome to Notion AI",
      description: "Get familiar with your AI-powered workspace",
      icon: BookOpen,
      completed: true,
      action: "Explore the dashboard"
    },
    {
      id: 2,
      title: "Create Your First Page",
      description: "Start building content with AI assistance",
      icon: FileText,
      completed: true,
      action: "Create a page"
    },
    {
      id: 3,
      title: "Set Up Project Roadmap",
      description: "Organize your projects with AI-generated timelines",
      icon: Target,
      completed: false,
      action: "Create roadmap"
    },
    {
      id: 4,
      title: "Plan Content Calendar",
      description: "Schedule and manage your content strategy",
      icon: Calendar,
      completed: false,
      action: "Set up calendar"
    },
    {
      id: 5,
      title: "Build Team Workflows",
      description: "Create processes for your team collaboration",
      icon: Workflow,
      completed: false,
      action: "Create workflow"
    },
    {
      id: 6,
      title: "Start AI Chat",
      description: "Begin using AI assistant for help and suggestions",
      icon: MessageSquare,
      completed: false,
      action: "Open chat"
    }
  ]

  const features = [
    {
      title: "AI-Powered Content Creation",
      description: "Generate pages, tables, and workflows with AI assistance",
      icon: Sparkles,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Smart Project Management",
      description: "Track projects with intelligent timelines and milestones",
      icon: Target,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Team Collaboration",
      description: "Work together with shared workflows and meeting notes",
      icon: Users,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Content Planning",
      description: "Plan and schedule content across all platforms",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600"
    }
  ]

  const quickActions = [
    {
      title: "Create a Blog Post",
      description: "Generate engaging content with AI",
      icon: FileText,
      action: () => toast({ title: "Coming soon", description: "Blog post creation will be available soon!" })
    },
    {
      title: "Plan a Project",
      description: "Set up project timeline and milestones",
      icon: Target,
      action: () => toast({ title: "Coming soon", description: "Project planning will be available soon!" })
    },
    {
      title: "Schedule Content",
      description: "Create content calendar for your team",
      icon: Calendar,
      action: () => toast({ title: "Coming soon", description: "Content scheduling will be available soon!" })
    },
    {
      title: "Build Workflow",
      description: "Design team processes and automation",
      icon: Workflow,
      action: () => toast({ title: "Coming soon", description: "Workflow builder will be available soon!" })
    }
  ]

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
      toast({
        title: "Step completed!",
        description: `Great job completing "${steps.find(s => s.id === stepId)?.title}"`,
      })
    }
  }

  const handleGenerateWelcome = async () => {
    setIsGenerating(true)
    try {
      const result = await generateContent(
        "Generate a personalized welcome message and getting started guide for a new user",
        "text"
      )
      
      toast({
        title: "Welcome Generated!",
        description: "AI has created a personalized welcome message for you.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate welcome message.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <div className="p-8 w-full max-w-none">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6 w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Getting Started</h1>
            <p className="text-gray-600">Welcome to your AI-powered workspace! Let's get you set up.</p>
          </div>
          <Button variant="outline" onClick={handleGenerateWelcome} disabled={isGenerating || isLoading}>
            {isGenerating || isLoading ? (
              <LoadingSpinner type="inline" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Welcome
              </>
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Setup Progress</span>
            <span className="text-sm text-gray-500">{completedSteps.length} of {steps.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Getting Started Steps */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Play className="w-5 h-5" />
            Setup Steps
          </h2>
          <div className="space-y-4 w-full">
            {steps.map((step) => (
              <Card key={step.id} className={`transition-all duration-200 ${completedSteps.includes(step.id) ? 'border-green-200 bg-green-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${completedSteps.includes(step.id) ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <step.icon className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={() => handleStepComplete(step.id)}
                        disabled={completedSteps.includes(step.id)}
                      >
                        {completedSteps.includes(step.id) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            {step.action}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Key Features
          </h2>
          <div className="space-y-4 w-full">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 w-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-2"
                  onClick={action.action}
                >
                  <div className="flex items-center gap-2">
                    <action.icon className="w-4 h-4" />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <span className="text-xs text-gray-600 text-left">{action.description}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 w-full">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <TrendingUp className="w-5 h-5" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-blue-900">Use AI Chat</h4>
                  <p className="text-sm text-blue-700">Ask the AI assistant for help with any task or content creation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-purple-900">Organize with Tags</h4>
                  <p className="text-sm text-purple-700">Use tags to categorize and find your content quickly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-green-900">Collaborate</h4>
                  <p className="text-sm text-green-700">Share workflows and notes with your team members</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 