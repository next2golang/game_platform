import { AnimatedBackground } from "@/components/animations/animated-background"
import { GradientButton, ModernButton } from "@/components/ui/gradient-button"

export default function BrowsePage() {
  return (
    <div className="relative h-screen w-screen">
      <AnimatedBackground variant="particles" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Browse Page</h1>
        <p className="mt-4 text-lg text-gray-300">Welcome to the browse page!</p>
        <div className="mt-8 space-x-4">
          <GradientButton>Explore</GradientButton>
          <ModernButton>Learn More</ModernButton>
        </div>
      </div>
    </div>
  )
}
