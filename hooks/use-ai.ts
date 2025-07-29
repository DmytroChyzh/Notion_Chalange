import { useState, useCallback } from 'react';

export interface AIResponse {
  content: string;
  type: 'text' | 'table' | 'workflow' | 'visualization';
  metadata?: {
    tokens?: number;
    model?: string;
    timestamp?: string;
  };
}

export interface UseAIState {
  isLoading: boolean;
  error: string | null;
  response: AIResponse | null;
}

export const useAI = () => {
  const [state, setState] = useState<UseAIState>({
    isLoading: false,
    error: null,
    response: null,
  });

  const generateContent = useCallback(async (
    prompt: string,
    type: 'text' | 'table' | 'workflow' | 'visualization' = 'text',
    context?: string
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type, context }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        response: data,
      }));

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const clearResponse = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      response: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    generateContent,
    clearResponse,
    clearError,
  };
}; 