import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { GradientButton, ModernButton } from "@/components/ui/gradient-button"

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AnimatedBackground variant="gradient" />
      <FloatingElements />
      <h1 className="text-3xl font-bold text-white mb-4 relative z-10">Welcome to the Dashboard</h1>
      <p className="text-gray-300 mb-8 relative z-10">This is your personalized dashboard.</p>
      <div className="space-x-4 relative z-10">
        <GradientButton>Get Started</GradientButton>
        <ModernButton>Learn More</ModernButton>
      </div>
    </div>
  )
}
