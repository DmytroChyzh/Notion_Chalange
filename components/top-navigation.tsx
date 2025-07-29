"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bot, MessageSquare } from "lucide-react"

interface TopNavigationProps {
  onChatToggle: () => void
}

export function TopNavigation({ onChatToggle }: TopNavigationProps) {
  return (
    <header className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white w-full fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 gap-2">
          <Bot className="w-4 h-4" />
          Ask Notion AI
        </Button>

        <Button variant="ghost" size="sm" onClick={onChatToggle} className="text-gray-600 hover:bg-gray-100">
          <MessageSquare className="w-4 h-4" />
        </Button>

        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-blue-500 text-white text-sm">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
