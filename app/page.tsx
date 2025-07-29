'use client';

import { useState } from 'react';
import { WelcomeScreen } from '@/components/welcome-screen';
import { AIDashboard } from '@/components/ai-dashboard';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full px-6 py-8">
        <AIDashboard onNavigate={() => {}} />
      </main>
      <Toaster />
    </div>
  );
}
