'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function AIDashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const { toast } = useToast();
  const { generateContent, isLoading, error, response } = useAI();

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

  const renderGeneratedContent = () => {
    if (!generatedContent) return null;

    try {
      const content = JSON.parse(generatedContent.content);
      
      switch (currentAction) {
        case 'workflow':
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Workflow</h3>
              <div className="space-y-3">
                {content.map((step: any, index: number) => (
                  <Card key={step.id || index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-blue-600 font-semibold text-sm">{step.order || index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                          {step.estimatedTime && (
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">{step.estimatedTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );

        case 'table':
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{content.title || 'Generated Table'}</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {content.headers?.map((header: string, index: number) => (
                        <th key={index} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.rows?.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex} className="border-t">
                        {row.map((cell: string, cellIndex: number) => (
                          <td key={cellIndex} className="px-4 py-3 text-sm text-gray-900">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

        case 'visualization':
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{content.config?.title || 'Generated Visualization'}</h3>
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <BarChart3 className="w-16 h-16 mx-auto text-blue-500" />
                  <div>
                    <h4 className="font-semibold">Chart Type: {content.config?.type || content.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      Data points: {content.data?.datasets?.[0]?.data?.length || 'N/A'}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
              </Card>
            </div>
          );

        default:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Content</h3>
              <Card className="p-4">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{generatedContent.content}</p>
                </div>
              </Card>
            </div>
          );
      }
    } catch (error) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Content</h3>
          <Card className="p-4">
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{generatedContent.content}</p>
            </div>
          </Card>
        </div>
      );
    }
  };

  const actionCards = [
    {
      title: 'Create Page',
      description: 'Generate new content with AI assistance',
      icon: FileText,
      action: 'page',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Plan Workflow',
      description: 'Create detailed project workflows',
      icon: Workflow,
      action: 'workflow',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Generate Table',
      description: 'Create organized data tables',
      icon: BarChart3,
      action: 'table',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'AI Query',
      description: 'Ask questions and get AI responses',
      icon: MessageSquare,
      action: 'query',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="w-full max-w-none space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">AI Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Your intelligent workspace powered by GPT-4
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1 text-base px-4 py-2">
          <Zap className="w-4 h-4" />
          <span>AI Powered</span>
        </Badge>
      </div>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {actionCards.map((card) => (
          <Card 
            key={card.action}
            className="group cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/50 h-full"
            onClick={() => handleAction(card.action)}
          >
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl ${card.color} text-white shadow-lg`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {card.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Generation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span>
                {currentAction === 'workflow' && 'Plan Workflow'}
                {currentAction === 'table' && 'Generate Table'}
                {currentAction === 'query' && 'AI Query'}
                {currentAction === 'page' && 'Create Page'}
              </span>
            </DialogTitle>
            <DialogDescription className="text-base">
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
                className="min-h-[150px] text-base"
              />
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setInputValue('');
                    setGeneratedContent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <InlineLoadingSpinner message="Generating..." />
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="py-12">
                <LoadingSpinner type="ai-thinking" />
              </div>
            )}

            {/* Generated Content */}
            {!isLoading && generatedContent && (
              <div className="border-t pt-8">
                {renderGeneratedContent()}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-base">{error}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Inline loading component for buttons
function InlineLoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="text-base">{message || 'Loading...'}</span>
    </div>
  );
}
