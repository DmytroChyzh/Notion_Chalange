'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MessageSquare, Workflow, Table, BarChart3, ArrowRight, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Get instant help and answers to your questions with our intelligent AI assistant.',
      color: 'bg-blue-500',
    },
    {
      icon: Workflow,
      title: 'Smart Workflow Planning',
      description: 'Create detailed workflows and project plans with AI-powered step-by-step guidance.',
      color: 'bg-green-500',
    },
    {
      icon: Table,
      title: 'Dynamic Table Generation',
      description: 'Generate organized tables and data structures based on your requirements.',
      color: 'bg-purple-500',
    },
    {
      icon: BarChart3,
      title: 'Data Visualization',
      description: 'Transform your data into beautiful charts and visual representations.',
      color: 'bg-orange-500',
    },
  ];

  const steps = [
    {
      title: 'Welcome to AI Notion Assistant',
      description: 'Your intelligent workspace powered by advanced AI technology.',
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Notion Assistant
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the future of productivity with our AI-powered workspace. 
              Create, plan, and visualize with intelligent assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${feature.color} text-white shadow-lg`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'How It Works',
      description: 'Simple steps to get started with AI-powered productivity.',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg">Choose Your Task</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select from creating pages, planning workflows, generating tables, or asking AI questions.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg">AI Processing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI analyzes your request and generates intelligent, contextual responses.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg">Get Results</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Receive your content instantly, ready to use and customize as needed.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-6xl shadow-2xl border-0">
        <CardHeader className="text-center pb-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Badge variant="secondary" className="text-base px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Powered by GPT-4
            </Badge>
          </div>
          <CardTitle className="text-3xl">{steps[currentStep].title}</CardTitle>
          <CardDescription className="text-lg mt-2">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-10 pb-10">
          {steps[currentStep].content}
          
          <div className="flex items-center justify-between mt-12">
            <div className="flex space-x-3">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <Button size="lg" onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button 
                  size="lg"
                  onClick={onGetStarted} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Get Started
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 