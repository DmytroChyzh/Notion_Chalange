"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Send, Bot, User, Sparkles } from "lucide-react"
import type { ViewType } from "@/app/page"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: () => void
  }>
}

interface AIChatPanelProps {
  isOpen: boolean
  onClose: () => void
  onViewChange: (view: ViewType) => void
}

export function AIChatPanel({ isOpen, onClose, onViewChange }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm your AI assistant. I can help you create pages, tables, workflows, and more. What would you like to build today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Create a content calendar for 3 months",
    "Plan a product launch workflow",
    "Generate a project roadmap table",
    "Build a team meeting template",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const simulateAIResponse = (userMessage: string) => {
    setIsThinking(true)

    setTimeout(() => {
      setIsThinking(false)

      let aiResponse = ""
      let actions: Array<{ label: string; action: () => void }> = []

      if (userMessage.toLowerCase().includes("content calendar")) {
        aiResponse =
          "Here's a structure I created for your content calendar:\n\n# Content Planning\n\n✅ Define target audience\n✅ Research trending topics\n☐ Create content templates\n☐ Schedule publishing dates\n\nThis calendar will help you organize your content strategy with automated scheduling and performance tracking."
        actions = [{ label: "Create Content Calendar", action: () => onViewChange("table") }]
      } else if (userMessage.toLowerCase().includes("product launch")) {
        aiResponse =
          "Here's a structure I created for your product launch:\n\n# Launch Strategy\n\n✅ Market research completed\n✅ Product development finished\n☐ Marketing campaign setup\n☐ Launch event planning\n\nI've designed a comprehensive workflow that covers all phases from planning to post-launch analysis."
        actions = [{ label: "Build Launch Workflow", action: () => onViewChange("workflow") }]
      } else if (userMessage.toLowerCase().includes("roadmap")) {
        aiResponse =
          "Here's a structure I created for your project roadmap:\n\n# Project Roadmap\n\n✅ Requirements gathering\n✅ Technical specifications\n☐ Development milestones\n☐ Testing and deployment\n\nThis roadmap includes priority levels, estimated effort, and team assignments for better project tracking."
        actions = [{ label: "Generate Roadmap", action: () => onViewChange("table") }]
      } else if (userMessage.toLowerCase().includes("meeting template")) {
        aiResponse =
          "Here's a structure I created for your meeting template:\n\n# Team Meeting Agenda\n\n✅ Review previous action items\n✅ Discuss current projects\n☐ Plan upcoming tasks\n☐ Set next meeting date\n\nThis template includes sections for attendees, agenda items, and action items to keep meetings productive."
        actions = [{ label: "Create Template", action: () => onViewChange("page") }]
      } else {
        aiResponse =
          "Here's a structure I created for your page:\n\n# Getting Started\n\n✅ Set up your workspace\n✅ Invite team members\n☐ Create your first project\n☐ Explore AI features\n\nI can help you with various tasks like creating structured pages, generating tables and databases, or building workflows. What specific project are you working on?"
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "ai",
          content: aiResponse,
          timestamp: new Date(),
          actions,
        },
      ])
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    simulateAIResponse(inputValue)
    setInputValue("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-12 bottom-0 w-96 bg-white border-l border-gray-200 flex flex-col z-10">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "ai" && (
                <Avatar className="w-8 h-8 bg-blue-100">
                  <AvatarFallback>
                    <Bot className="w-4 h-4 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[320px] ${message.type === "user" ? "order-first" : ""}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                </div>

                {message.actions && message.actions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="w-full text-xs bg-transparent"
                        onClick={action.action}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {message.type === "user" && (
                <Avatar className="w-8 h-8 bg-gray-100">
                  <AvatarFallback>
                    <User className="w-4 h-4 text-gray-600" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 bg-blue-100">
                <AvatarFallback>
                  <Bot className="w-4 h-4 text-blue-600" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg">
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
                  <span className="text-sm text-gray-600 ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {messages.length === 1 && (
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-2 text-xs text-gray-600 hover:bg-gray-50 rounded border border-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI to help you..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 text-sm"
          />
          <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
