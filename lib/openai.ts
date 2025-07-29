import OpenAI from 'openai';

// Types for AI responses
export interface AIResponse {
  content: string;
  type: 'text' | 'table' | 'workflow' | 'visualization';
  metadata?: {
    tokens?: number;
    model?: string;
    timestamp?: string;
  };
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedTime?: string;
  dependencies?: string[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
  title?: string;
}

export interface VisualizationData {
  type: 'chart' | 'graph' | 'diagram';
  data: any;
  config?: any;
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use API routes
});

// AI Service class
export class AIService {
  private static instance: AIService;
  private conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Generate text content
  async generateText(prompt: string, context?: string): Promise<AIResponse> {
    try {
      const messages = [
        {
          role: 'system' as const,
          content: `You are a helpful AI assistant integrated into a Notion-like interface. 
          Generate clear, concise, and well-structured content. 
          ${context ? `Context: ${context}` : ''}`
        },
        ...this.conversationHistory,
        { role: 'user' as const, content: prompt }
      ];

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages,
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      });

      const content = response.choices[0]?.message?.content || 'No response generated';
      
      // Update conversation history
      this.conversationHistory.push(
        { role: 'user', content: prompt },
        { role: 'assistant', content }
      );

      return {
        content,
        type: 'text',
        metadata: {
          tokens: response.usage?.total_tokens,
          model: response.model,
          timestamp: new Date().toISOString(),
        }
      };
    } catch (error) {
      console.error('Error generating text:', error);
      throw new Error('Failed to generate text content');
    }
  }

  // Generate workflow
  async generateWorkflow(topic: string): Promise<AIResponse> {
    try {
      const prompt = `Create a detailed workflow for: "${topic}". 
      Return the response as a JSON array with the following structure:
      [
        {
          "id": "step-1",
          "title": "Step Title",
          "description": "Detailed description",
          "order": 1,
          "estimatedTime": "30 minutes",
          "dependencies": []
        }
      ]`;

      const response = await this.generateText(prompt);
      
      // Parse workflow from response
      const workflowData = JSON.parse(response.content);
      
      return {
        content: response.content,
        type: 'workflow',
        metadata: response.metadata
      };
    } catch (error) {
      console.error('Error generating workflow:', error);
      throw new Error('Failed to generate workflow');
    }
  }

  // Generate table data
  async generateTable(prompt: string): Promise<AIResponse> {
    try {
      const tablePrompt = `Create a table based on: "${prompt}". 
      Return the response as a JSON object with the following structure:
      {
        "headers": ["Column 1", "Column 2", "Column 3"],
        "rows": [
          ["Data 1", "Data 2", "Data 3"],
          ["Data 4", "Data 5", "Data 6"]
        ],
        "title": "Table Title"
      }`;

      const response = await this.generateText(tablePrompt);
      
      return {
        content: response.content,
        type: 'table',
        metadata: response.metadata
      };
    } catch (error) {
      console.error('Error generating table:', error);
      throw new Error('Failed to generate table');
    }
  }

  // Generate visualization
  async generateVisualization(prompt: string): Promise<AIResponse> {
    try {
      const vizPrompt = `Create a visualization suggestion for: "${prompt}". 
      Return the response as a JSON object with the following structure:
      {
        "type": "chart",
        "data": {
          "labels": ["Label 1", "Label 2"],
          "datasets": [{"data": [10, 20]}]
        },
        "config": {
          "title": "Visualization Title",
          "type": "bar"
        }
      }`;

      const response = await this.generateText(vizPrompt);
      
      return {
        content: response.content,
        type: 'visualization',
        metadata: response.metadata
      };
    } catch (error) {
      console.error('Error generating visualization:', error);
      throw new Error('Failed to generate visualization');
    }
  }

  // Clear conversation history
  clearHistory(): void {
    this.conversationHistory = [];
  }

  // Get conversation history
  getHistory(): Array<{ role: 'user' | 'assistant'; content: string }> {
    return [...this.conversationHistory];
  }
}

// Export singleton instance
export const aiService = AIService.getInstance(); 