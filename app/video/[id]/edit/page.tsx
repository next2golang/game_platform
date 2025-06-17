"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Save,
  Eye,
  Circle,
  Square,
  Minus,
  MapPin,
  Undo,
  Redo,
  Trash2,
} from "lucide-react"

interface DrawingElement {
  id: string
  type: "circle" | "rectangle" | "line" | "text" | "marker"
  x: number
  y: number
  width?: number
  height?: number
  radius?: number
  text?: string
  color: string
  startTime: number
  endTime: number
}

interface ThinkingPoint {
  id: string
  time: number
  question: string
  answer: string
  x: number
  y: number
}

export default function VideoEditorPage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [playbackRate, setPlaybackRate] = useState(1)

  const [selectedTool, setSelectedTool] = useState<"select" | "circle" | "rectangle" | "line" | "text" | "marker">(
    "select",
  )
  const [selectedColor, setSelectedColor] = useState("#ff0000")
  const [drawingElements, setDrawingElements] = useState<DrawingElement[]>([])
  const [thinkingPoints, setThinkingPoints] = useState<ThinkingPoint[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null)

  const [showThinkingDialog, setShowThinkingDialog] = useState(false)
  const [newThinkingPoint, setNewThinkingPoint] = useState({ question: "", answer: "", x: 0, y: 0 })

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === "select") return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (selectedTool === "marker") {
      setNewThinkingPoint({ ...newThinkingPoint, x, y })
      setShowThinkingDialog(true)
      return
    }

    const newElement: DrawingElement = {
      id: Date.now().toString(),
      type: selectedTool,
      x,
      y,
      color: selectedColor,
      startTime: currentTime,
      endTime: currentTime + 5, // Default 5 seconds duration
    }

    if (selectedTool === "circle") {
      newElement.radius = 0
    } else if (selectedTool === "rectangle") {
      newElement.width = 0
      newElement.height = 0
    }

    setCurrentElement(newElement)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement || selectedTool === "select") return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const updatedElement = { ...currentElement }

    if (selectedTool === "circle") {
      const radius = Math.sqrt(Math.pow(x - currentElement.x, 2) + Math.pow(y - currentElement.y, 2))
      updatedElement.radius = radius
    } else if (selectedTool === "rectangle") {
      updatedElement.width = x - currentElement.x
      updatedElement.height = y - currentElement.y
    }

    setCurrentElement(updatedElement)
    drawCanvas()
  }

  const stopDrawing = () => {
    if (currentElement && isDrawing) {
      setDrawingElements([...drawingElements, currentElement])
      setCurrentElement(null)
    }
    setIsDrawing(false)
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw existing elements that should be visible at current time
    drawingElements.forEach((element) => {
      if (currentTime >= element.startTime && currentTime <= element.endTime) {
        drawElement(ctx, element)
      }
    })

    // Draw current element being drawn
    if (currentElement) {
      drawElement(ctx, currentElement)
    }

    // Draw thinking points
    thinkingPoints.forEach((point) => {
      if (Math.abs(currentTime - point.time) < 0.5) {
        ctx.fillStyle = "#fbbf24"
        ctx.beginPath()
        ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI)
        ctx.fill()
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.fillText("?", point.x - 3, point.y + 4)
      }
    })
  }

  const drawElement = (ctx: CanvasRenderingContext2D, element: DrawingElement) => {
    ctx.strokeStyle = element.color
    ctx.lineWidth = 2

    switch (element.type) {
      case "circle":
        if (element.radius) {
          ctx.beginPath()
          ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI)
          ctx.stroke()
        }
        break
      case "rectangle":
        if (element.width && element.height) {
          ctx.strokeRect(element.x, element.y, element.width, element.height)
        }
        break
      case "line":
        ctx.beginPath()
        ctx.moveTo(element.x, element.y)
        ctx.lineTo(element.x + (element.width || 0), element.y + (element.height || 0))
        ctx.stroke()
        break
    }
  }

  const addThinkingPoint = () => {
    if (newThinkingPoint.question && newThinkingPoint.answer) {
      const point: ThinkingPoint = {
        id: Date.now().toString(),
        time: currentTime,
        question: newThinkingPoint.question,
        answer: newThinkingPoint.answer,
        x: newThinkingPoint.x,
        y: newThinkingPoint.y,
      }
      setThinkingPoints([...thinkingPoints, point])
      setNewThinkingPoint({ question: "", answer: "", x: 0, y: 0 })
      setShowThinkingDialog(false)
    }
  }

  useEffect(() => {
    drawCanvas()
  }, [currentTime, drawingElements, thinkingPoints])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-white/80 hover:text-white">
            ← ダッシュボードに戻る
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Eye className="w-4 h-4 mr-2" />
              プレビュー
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Save className="w-4 h-4 mr-2" />
              保存して公開
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Player and Canvas */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                    width={800}
                    height={450}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                  />
                </div>

                {/* Video Controls */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm min-w-[40px]">{formatTime(currentTime)}</span>
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="flex-1"
                    />
                    <span className="text-white/60 text-sm min-w-[40px]">{formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" onClick={togglePlay}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                        onClick={() => handleSeek([Math.max(0, currentTime - 1)])}
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                        onClick={() => handleSeek([Math.min(duration, currentTime + 1)])}
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2 ml-4">
                        <Volume2 className="w-4 h-4 text-white" />
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setVolume(value[0])}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                          <Button
                            key={rate}
                            size="sm"
                            variant={playbackRate === rate ? "default" : "ghost"}
                            className={`text-xs ${playbackRate === rate ? "bg-purple-500" : "text-white hover:bg-white/10"}`}
                            onClick={() => changePlaybackRate(rate)}
                          >
                            {rate}x
                          </Button>
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-4">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-3">タイムライン</h3>
                <div className="space-y-2">
                  {drawingElements.map((element) => (
                    <div key={element.id} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: element.color }} />
                      <span className="text-white text-sm capitalize">{element.type}</span>
                      <span className="text-white/60 text-sm">
                        {formatTime(element.startTime)} - {formatTime(element.endTime)}
                      </span>
                      <Button size="sm" variant="ghost" className="ml-auto text-white/60 hover:text-white">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  {thinkingPoints.map((point) => (
                    <div key={point.id} className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                      <span className="text-white text-sm">思考ポイント</span>
                      <span className="text-white/60 text-sm">{formatTime(point.time)}</span>
                      <Button size="sm" variant="ghost" className="ml-auto text-white/60 hover:text-white">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="tools" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border-white/10">
                <TabsTrigger value="tools" className="data-[state=active]:bg-white/10 text-white">
                  ツール
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-white/10 text-white">
                  設定
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tools" className="space-y-4">
                {/* Drawing Tools */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-3">描画ツール</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant={selectedTool === "circle" ? "default" : "ghost"}
                        className={selectedTool === "circle" ? "bg-purple-500" : "text-white hover:bg-white/10"}
                        onClick={() => setSelectedTool("circle")}
                      >
                        <Circle className="w-4 h-4 mr-1" />円
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedTool === "rectangle" ? "default" : "ghost"}
                        className={selectedTool === "rectangle" ? "bg-purple-500" : "text-white hover:bg-white/10"}
                        onClick={() => setSelectedTool("rectangle")}
                      >
                        <Square className="w-4 h-4 mr-1" />
                        四角
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedTool === "line" ? "default" : "ghost"}
                        className={selectedTool === "line" ? "bg-purple-500" : "text-white hover:bg-white/10"}
                        onClick={() => setSelectedTool("line")}
                      >
                        <Minus className="w-4 h-4 mr-1" />線
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedTool === "marker" ? "default" : "ghost"}
                        className={selectedTool === "marker" ? "bg-purple-500" : "text-white hover:bg-white/10"}
                        onClick={() => setSelectedTool("marker")}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        思考
                      </Button>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-white text-sm font-medium mb-2">色</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#000000"].map(
                          (color) => (
                            <button
                              key={color}
                              className={`w-8 h-8 rounded border-2 ${selectedColor === color ? "border-white" : "border-white/20"}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setSelectedColor(color)}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        <Undo className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        <Redo className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preset Shapes */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-3">プリセット</h3>
                    <div className="space-y-2">
                      <Button size="sm" variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        視界範囲
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        危険ゾーン
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        安全ゾーン
                      </Button>
                      <Button size="sm" variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                        移動経路
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-3">動画設定</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-white text-sm">タイトル</label>
                        <Input
                          className="mt-1 bg-white/10 border-white/20 text-white"
                          defaultValue="完璧なガンク回避テクニック"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm">説明</label>
                        <Textarea
                          className="mt-1 bg-white/10 border-white/20 text-white"
                          rows={3}
                          defaultValue="ミニマップの情報を活用した効果的なガンク回避方法を解説"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Thinking Point Dialog */}
      {showThinkingDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4">思考ポイントを追加</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm">質問</label>
                  <Input
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    placeholder="ここであなたならどうする？"
                    value={newThinkingPoint.question}
                    onChange={(e) => setNewThinkingPoint({ ...newThinkingPoint, question: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-white text-sm">解説</label>
                  <Textarea
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    rows={3}
                    placeholder="実際の判断とその理由を説明..."
                    value={newThinkingPoint.answer}
                    onChange={(e) => setNewThinkingPoint({ ...newThinkingPoint, answer: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    className="flex-1 text-white hover:bg-white/10"
                    onClick={() => setShowThinkingDialog(false)}
                  >
                    キャンセル
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500" onClick={addThinkingPoint}>
                    追加
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
