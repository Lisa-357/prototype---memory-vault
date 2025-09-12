import { useState, useEffect } from 'react';
import { TimeCapsule } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UnlockIcon, SparklesIcon } from 'lucide-react';

interface UnlockAnimationProps {
  open: boolean;
  capsule: TimeCapsule | null;
  onComplete: () => void;
}

export function UnlockAnimation({ open, capsule, onComplete }: UnlockAnimationProps) {
  const [stage, setStage] = useState<'initial' | 'unlocking' | 'complete'>('initial');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (open && capsule) {
      setStage('initial');
      // Generate random particles for animation
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    }
  }, [open, capsule]);

  const handleUnlock = () => {
    setStage('unlocking');
    
    // Simulate unlock animation duration
    setTimeout(() => {
      setStage('complete');
    }, 2000);
  };

  const handleComplete = () => {
    setStage('initial');
    onComplete();
  };

  if (!capsule) return null;

  const getThemeGradient = () => {
    switch (capsule.theme) {
      case 'birthday':
        return 'from-pink-500 via-purple-500 to-indigo-500';
      case 'anniversary':
        return 'from-red-500 via-pink-500 to-rose-500';
      case 'graduation':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      case 'travel':
        return 'from-green-500 via-teal-500 to-blue-500';
      default:
        return 'from-slate-500 via-gray-500 to-zinc-500';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="max-w-md border-0 bg-transparent shadow-none p-0">
          <div className="relative">
            {/* Background with theme gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getThemeGradient()} rounded-2xl opacity-90`} />
            
            {/* Animated particles */}
            {stage === 'unlocking' && particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
            
            {/* Main content */}
            <div className="relative z-10 p-8 text-center text-white">
              {stage === 'initial' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mx-auto w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <UnlockIcon className="h-10 w-10" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold leading-tight">
                      Ready to Unlock?
                    </h2>
                    <p className="text-white text-opacity-90 leading-relaxed">
                      Your time capsule "{capsule.title}" is ready to be opened!
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleUnlock}
                    className="bg-white text-slate-800 hover:bg-white hover:bg-opacity-90 font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105"
                  >
                    Unlock Time Capsule
                  </Button>
                </div>
              )}
              
              {stage === 'unlocking' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mx-auto w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                    <SparklesIcon className="h-12 w-12 animate-spin" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold leading-tight">
                      Unlocking...
                    </h2>
                    <p className="text-white text-opacity-90 leading-relaxed">
                      Opening your precious memories
                    </p>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full" 
                      style={{
                        width: '100%',
                        animation: 'progress-bar 2s ease-in-out'
                      }} 
                    />
                  </div>
                </div>
              )}
              
              {stage === 'complete' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mx-auto w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <SparklesIcon className="h-12 w-12 text-yellow-300" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold leading-tight">
                      Unlocked Successfully!
                    </h2>
                    <p className="text-white text-opacity-90 leading-relaxed">
                      Your memories are now ready to view
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleComplete}
                    className="bg-white text-slate-800 hover:bg-white hover:bg-opacity-90 font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105"
                  >
                    View Contents
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Global styles for progress animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes progress-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `
      }} />
    </>
  );
}