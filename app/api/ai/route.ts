import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, type, context } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    let systemPrompt = 'You are a helpful AI assistant integrated into a Notion-like interface. Generate clear, concise, and well-structured content.';

    // Customize system prompt based on type
    switch (type) {
      case 'workflow':
        systemPrompt += ' Create a detailed workflow with clear steps. Return as JSON array with id, title, description, order, estimatedTime, and dependencies fields.';
        break;
      case 'table':
        systemPrompt += ' Create a table with headers and rows. Return as JSON object with headers array and rows array.';
        break;
      case 'visualization':
        systemPrompt += ' Suggest a visualization type and provide chart data. Return as JSON with type, data, and config fields.';
        break;
      default:
        systemPrompt += ' Provide helpful and informative responses.';
    }

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: prompt }
    ];

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages,
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
    });

    const content = response.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({
      content,
      type,
      metadata: {
        tokens: response.usage?.total_tokens,
        model: response.model,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
} 