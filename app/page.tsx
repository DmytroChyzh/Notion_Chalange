'use client';

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { TopNavigation } from '@/components/top-navigation';
import { AIDashboard } from '@/components/ai-dashboard';
import { AIChatPanel } from '@/components/ai-chat-panel';
import { AITableGenerator } from '@/components/ai-table-generator';
import { AIPageBuilder } from '@/components/ai-page-builder';
import { AIWorkflowBuilder } from '@/components/ai-workflow-builder';
import { ProjectRoadmap } from '@/components/project-roadmap';
import { ContentCalendar } from '@/components/content-calendar';
import { TeamWorkflow } from '@/components/team-workflow';
import { MeetingNotes } from '@/components/meeting-notes';
import { GettingStarted } from '@/components/getting-started';
import { WelcomeScreen } from '@/components/welcome-screen';
import { Toaster } from '@/components/ui/toaster';

export type ViewType = "dashboard" | "table" | "page" | "workflow" | "project-roadmap" | "content-calendar" | "team-workflow" | "meeting-notes" | "getting-started";

export default function NotionAI() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  const handleGetStarted = () => {
    setHasSeenWelcome(true);
  };

  if (!hasSeenWelcome) {
    return (
      <>
        <WelcomeScreen onGetStarted={handleGetStarted} />
        <Toaster />
      </>
    );
  }

  const renderMainContent = () => {
    switch (currentView) {
      case "table":
        return <AITableGenerator />;
      case "page":
        return <AIPageBuilder />;
      case "workflow":
        return <AIWorkflowBuilder />;
      case "project-roadmap":
        return <ProjectRoadmap />;
      case "content-calendar":
        return <ContentCalendar />;
      case "team-workflow":
        return <TeamWorkflow />;
      case "meeting-notes":
        return <MeetingNotes />;
      case "getting-started":
        return <GettingStarted />;
      default:
        return <AIDashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-white">
        <AppSidebar onViewChange={setCurrentView} currentView={currentView} />

        <div className="flex-1 flex flex-col">
          <TopNavigation onChatToggle={() => setIsChatOpen(!isChatOpen)} />

          <div className="flex-1 flex overflow-hidden">
                            <main className={`flex-1 overflow-auto transition-all duration-300 ${isChatOpen ? "mr-[420px]" : "mr-0"}`}>
              {renderMainContent()}
            </main>

            <AIChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onViewChange={setCurrentView} />
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
