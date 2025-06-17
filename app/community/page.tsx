import { AnimatedBackground } from "@/components/animations/animated-background"
import { GradientButton, ModernButton } from "@/components/ui/gradient-button"

export default function CommunityPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatedBackground variant="waves" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="rounded-lg bg-white/10 p-8 shadow-lg backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white">Welcome to the Community!</h1>
          <p className="mt-4 text-gray-300">Connect, collaborate, and share your ideas.</p>
          <div className="mt-6 space-x-4">
            <GradientButton>Get Started</GradientButton>
            <ModernButton>Learn More</ModernButton>
          </div>
        </div>
      </div>
    </div>
  )
}
