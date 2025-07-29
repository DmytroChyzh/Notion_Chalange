"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Home, FileText, Table, Workflow, Plus, Settings, Trash2 } from "lucide-react"
import type { ViewType } from "@/app/page"

interface AppSidebarProps {
  onViewChange: (view: ViewType) => void
  currentView: ViewType
}

export function AppSidebar({ onViewChange, currentView }: AppSidebarProps) {
  const [pages] = useState([
    { id: 1, name: "Getting Started", icon: FileText, type: "page" as ViewType },
    { id: 2, name: "Project Roadmap", icon: Table, type: "table" as ViewType },
    { id: 3, name: "Content Calendar", icon: Table, type: "table" as ViewType },
    { id: 4, name: "Team Workflow", icon: Workflow, type: "workflow" as ViewType },
    { id: 5, name: "Meeting Notes", icon: FileText, type: "page" as ViewType },
  ])

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="font-semibold text-gray-900">Notion AI</span>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-gray-100"
          onClick={() => onViewChange("dashboard")}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Page
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange("dashboard")}
                  isActive={currentView === "dashboard"}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  <Home className="w-4 h-4" />
                  <span>AI Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-gray-500 uppercase tracking-wide px-2 py-1">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem key={page.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(page.type)}
                    isActive={currentView === page.type}
                    className="text-gray-700 hover:bg-gray-100 group"
                  >
                    <page.icon className="w-4 h-4" />
                    <span className="truncate">{page.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-700 hover:bg-gray-100">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-700 hover:bg-gray-100">
                  <Trash2 className="w-4 h-4" />
                  <span>Trash</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
