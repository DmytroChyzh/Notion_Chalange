"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Table, Workflow, Sparkles, Clock, Calendar } from "lucide-react"
import type { ViewType } from "@/app/page"
import { useState } from "react"

interface AIDashboardProps {
  onViewChange: (view: ViewType) => void
}

export function AIDashboard({ onViewChange }: AIDashboardProps) {
  const [isGeneratingTable, setIsGeneratingTable] = useState(false)
  const [isGeneratingWorkflow, setIsGeneratingWorkflow] = useState(false)
  const [showGeneratedTable, setShowGeneratedTable] = useState(false)
  const [showGeneratedWorkflow, setShowGeneratedWorkflow] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)

  const handleCreateTable = () => {
    setIsGeneratingTable(true)
    setTimeout(() => {
      setIsGeneratingTable(false)
      setShowGeneratedTable(true)
    }, 2000)
  }

  const handleCreateWorkflow = () => {
    setIsGeneratingWorkflow(true)
    setTimeout(() => {
      setIsGeneratingWorkflow(false)
      setShowGeneratedWorkflow(true)
    }, 2000)
  }

  const handleVisualizeData = () => {
    setShowChart(true)
  }

  const handleSummarizePage = () => {
    setIsGeneratingSummary(true)
    setTimeout(() => {
      setIsGeneratingSummary(false)
      setShowSummary(true)
    }, 1500)
  }

  const quickActions = [
    {
      title: "Generate New Page",
      description: "Create a structured page with AI assistance",
      icon: FileText,
      action: () => onViewChange("page"),
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
    {
      title: "Create Table with AI",
      description: "Build smart databases and track projects",
      icon: Table,
      action: handleCreateTable,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
      loading: isGeneratingTable,
    },
    {
      title: "Plan Workflow",
      description: "Design process flows with AI guidance",
      icon: Workflow,
      action: handleCreateWorkflow,
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      loading: isGeneratingWorkflow,
    },
  ]

  const recentPages = [
    { name: "Q1 Planning", type: "Page", updated: "2 hours ago", icon: FileText },
    { name: "Product Roadmap", type: "Database", updated: "1 day ago", icon: Table },
    { name: "Team Onboarding", type: "Workflow", updated: "3 days ago", icon: Workflow },
    { name: "Content Calendar", type: "Database", updated: "1 week ago", icon: Calendar },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSummarizePage}
          disabled={isGeneratingSummary}
          className="gap-2 bg-white border-gray-200 hover:bg-gray-50"
        >
          {isGeneratingSummary ? (
            <>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>Summarizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Summarize page with AI
            </>
          )}
        </Button>
      </div>

      {/* AI Summary Block */}
      {showSummary && (
        <div className="mb-8 animate-fade-in">
          <p className="text-sm text-gray-500 mb-2">Here's what I created based on your request...</p>
          <Card className="border border-gray-200 shadow-sm bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">📝 AI Page Summary</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    This page contains key tasks and a launch workflow. Next step: finalize copy and assign reviewers.
                    The current progress shows 1 completed task, 1 in progress, and 1 pending review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning! 👋</h1>
        <p className="text-gray-600">What would you like to create with AI today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${action.color} ${action.loading ? "opacity-75" : ""}`}
            onClick={action.loading ? undefined : action.action}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <action.icon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">{action.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {action.loading ? (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is creating...</span>
                </div>
              ) : (
                <CardDescription className="text-gray-600">{action.description}</CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generated Table */}
      {showGeneratedTable && (
        <div className="mt-8 animate-fade-in">
          <p className="text-sm text-gray-500 mb-3">Here's what I created based on your request...</p>
          <GeneratedTable />
        </div>
      )}

      {/* Generated Workflow */}
      {showGeneratedWorkflow && (
        <div className="mt-8 animate-fade-in">
          <p className="text-sm text-gray-500 mb-3">Here's what I created based on your request...</p>
          <GeneratedWorkflow />
        </div>
      )}

      {/* Data Visualization */}
      {showChart && (
        <div className="mt-8 animate-fade-in">
          <p className="text-sm text-gray-500 mb-3">Here's what I created based on your request...</p>
          <DataVisualization />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Clock className="w-5 h-5" />
              Recent Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <page.icon className="w-4 h-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{page.name}</p>
                    <p className="text-sm text-gray-500">
                      {page.type} • {page.updated}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Sparkles className="w-5 h-5" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-gray-900 mb-2">Create a Project Timeline</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your recent activity, you might want to create a timeline for your Q1 planning.
                </p>
                <Button size="sm" variant="outline" onClick={() => onViewChange("table")}>
                  Create Timeline
                </Button>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">Team Meeting Template</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Generate a structured meeting agenda template for your team.
                </p>
                <Button size="sm" variant="outline" onClick={() => onViewChange("page")}>
                  Generate Template
                </Button>
                <Button size="sm" variant="outline" onClick={handleVisualizeData}>
                  Visualize Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const GeneratedTable = () => {
  return (
    <div>
      <h2>Generated Table</h2>
      <p>This is a placeholder for the generated table component.</p>
    </div>
  )
}

const GeneratedWorkflow = () => {
  return (
    <div>
      <h2>Generated Workflow</h2>
      <p>This is a placeholder for the generated workflow component.</p>
    </div>
  )
}

const DataVisualization = () => {
  return (
    <div>
      <h2>Data Visualization</h2>
      <p>This is a placeholder for the data visualization component.</p>
    </div>
  )
}
