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
import { WelcomeScreen } from '@/components/welcome-screen';
import { Toaster } from '@/components/ui/toaster';

export type ViewType = "dashboard" | "table" | "page" | "workflow";

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
            <main className={`flex-1 overflow-auto transition-all duration-300 ${isChatOpen ? "mr-80" : "mr-0"}`}>
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
