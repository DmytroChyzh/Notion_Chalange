'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles, Brain, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  type?: 'default' | 'ai-thinking' | 'generating';
}

const aiMessages = [
  'AI is thinking...',
  'Analyzing your request...',
  'Generating intelligent response...',
  'Processing with GPT-4...',
  'Creating content...',
  'Almost ready...',
];

const generatingMessages = [
  'Generating content...',
  'Building structure...',
  'Formatting data...',
  'Finalizing...',
  'Almost done...',
];

export function LoadingSpinner({ message, type = 'default' }: LoadingSpinnerProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [dots, setDots] = useState('');

  const messages = type === 'ai-thinking' ? aiMessages : 
                   type === 'generating' ? generatingMessages : 
                   [message || 'Loading...'];

  useEffect(() => {
    if (type === 'default' && message) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, [messages.length, type, message]);

  const getIcon = () => {
    switch (type) {
      case 'ai-thinking':
        return <Brain className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'generating':
        return <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />;
      default:
        return <Loader2 className="w-5 h-5 animate-spin" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {getIcon()}
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-700">
          {messages[currentMessageIndex]}
          {type !== 'default' && dots}
        </p>
        {type === 'ai-thinking' && (
          <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Powered by GPT-4</span>
          </p>
        )}
      </div>
      
      {type !== 'default' && (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
}

// Compact version for inline use
export function InlineLoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{message || 'Loading...'}</span>
    </div>
  );
} 