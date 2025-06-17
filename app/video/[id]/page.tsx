import { AnimatedBackground } from "@/components/animations/animated-background"
import { GradientButton, ModernButton } from "@/components/ui/gradient-button"

const VideoPage = () => {
  return (
    <div className="relative h-screen w-screen">
      <AnimatedBackground variant="geometric" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Video Page</h1>
        <p className="text-lg text-gray-300 mb-8">This is the video page with ID: [id]</p>
        <ModernButton>Watch Now</ModernButton>
        <GradientButton>Learn More</GradientButton>
      </div>
    </div>
  )
}

export default VideoPage
