'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAI } from '@/hooks/use-ai';
import { LoadingSpinner } from '@/components/loading-spinner';
import { 
  FileText, 
  Workflow, 
  BarChart3, 
  MessageSquare, 
  Plus, 
  Send, 
  Sparkles,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Table,
  Calendar
} from 'lucide-react';
import type { ViewType } from '@/app/page';

interface AIDashboardProps {
  onViewChange: (view: ViewType) => void;
}

export function AIDashboard({ onViewChange }: AIDashboardProps) {
  const [isGeneratingTable, setIsGeneratingTable] = useState(false);
  const [isGeneratingWorkflow, setIsGeneratingWorkflow] = useState(false);
  const [showGeneratedTable, setShowGeneratedTable] = useState(false);
  const [showGeneratedWorkflow, setShowGeneratedWorkflow] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const { toast } = useToast();
  const { generateContent, isLoading, error, response } = useAI();

  const handleCreateTable = async () => {
    setIsGeneratingTable(true);
    try {
      const result = await generateContent('Create a project management table with tasks, assignees, status, and deadlines', 'table');
      setGeneratedContent(result);
      setShowGeneratedTable(true);
      toast({
        title: "Success!",
        description: "Table generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate table.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingTable(false);
    }
  };

  const handleCreateWorkflow = async () => {
    setIsGeneratingWorkflow(true);
    try {
      const result = await generateContent('Create a product development workflow with clear steps', 'workflow');
      setGeneratedContent(result);
      setShowGeneratedWorkflow(true);
      toast({
        title: "Success!",
        description: "Workflow generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate workflow.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingWorkflow(false);
    }
  };

  const handleVisualizeData = () => {
    setShowChart(true);
  };

  const handleSummarizePage = () => {
    setIsGeneratingSummary(true);
    setTimeout(() => {
      setIsGeneratingSummary(false);
      setShowSummary(true);
    }, 1500);
  };

  const handleAction = async (action: string) => {
    setCurrentAction(action);
    setIsDialogOpen(true);
  };

  const handleGenerate = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to generate content.",
        variant: "destructive",
      });
      return;
    }

    try {
      let type: 'text' | 'table' | 'workflow' | 'visualization' = 'text';
      
      switch (currentAction) {
        case 'workflow':
          type = 'workflow';
          break;
        case 'table':
          type = 'table';
          break;
        case 'visualization':
          type = 'visualization';
          break;
        default:
          type = 'text';
      }

      const result = await generateContent(inputValue, type);
      setGeneratedContent(result);
      
      toast({
        title: "Success!",
        description: "Content generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    }
  };

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
  ];

  const recentPages = [
    { name: "Q1 Planning", type: "Page", updated: "2 hours ago", icon: FileText },
    { name: "Product Roadmap", type: "Database", updated: "1 day ago", icon: Table },
    { name: "Team Onboarding", type: "Workflow", updated: "3 days ago", icon: Workflow },
    { name: "Content Calendar", type: "Database", updated: "1 week ago", icon: Calendar },
  ];

  return (
    <div className="p-8 w-full max-w-none">
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
                <Button size="sm" variant="outline" onClick={handleVisualizeData} className="ml-2">
                  Visualize Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Generation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>
                {currentAction === 'workflow' && 'Plan Workflow'}
                {currentAction === 'table' && 'Generate Table'}
                {currentAction === 'query' && 'AI Query'}
                {currentAction === 'page' && 'Create Page'}
              </span>
            </DialogTitle>
            <DialogDescription>
              {currentAction === 'workflow' && 'Describe the workflow you want to create'}
              {currentAction === 'table' && 'Describe the table structure and data you need'}
              {currentAction === 'query' && 'Ask any question to our AI assistant'}
              {currentAction === 'page' && 'Describe the content you want to create'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <Textarea
                placeholder={
                  currentAction === 'workflow' ? 'e.g., Create a workflow for launching a new product...' :
                  currentAction === 'table' ? 'e.g., Create a table for project tasks with columns for task, assignee, status, and deadline...' :
                  currentAction === 'query' ? 'Ask anything...' :
                  'e.g., Create a blog post about artificial intelligence...'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-h-[120px]"
              />
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setInputValue('');
                    setGeneratedContent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <InlineLoadingSpinner message="Generating..." />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="py-8">
                <LoadingSpinner type="ai-thinking" />
              </div>
            )}

            {/* Generated Content */}
            {!isLoading && generatedContent && (
              <div className="border-t pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Generated Content</h3>
                  <Card className="p-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const GeneratedTable = () => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Generated Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Task</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Assignee</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm">Design System Update</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">Sarah Chen</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">Mar 15, 2024</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm">API Integration</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">Mike Johnson</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">Mar 22, 2024</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm">User Testing</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">Emily Davis</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">Mar 30, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const GeneratedWorkflow = () => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Generated Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Project Initiation</h4>
              <p className="text-sm text-gray-600">Define project scope, objectives, and initial requirements</p>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Stakeholder Approval</h4>
              <p className="text-sm text-gray-600">Get approval from key stakeholders and budget sign-off</p>
            </div>
            <div className="w-5 h-5 bg-blue-500 rounded-full ml-auto"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Development Phase</h4>
              <p className="text-sm text-gray-600">Execute the main development work according to specifications</p>
            </div>
            <Clock className="w-5 h-5 text-gray-400 ml-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DataVisualization = () => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Data Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Chart visualization would appear here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Inline loading component for buttons
function InlineLoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>{message || 'Loading...'}</span>
    </div>
  );
}
