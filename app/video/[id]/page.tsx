"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Heart,
  MessageCircle,
  Share2,
  Edit,
  SkipBack,
  SkipForward,
  Settings,
  ThumbsUp,
  Flag,
} from "lucide-react"

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isLiked, setIsLiked] = useState(false)
  const [newComment, setNewComment] = useState("")

  // Mock video data
  const [video] = useState({
    id: params.id,
    title: "完璧なガンク回避テクニック",
    description:
      "ミニマップの情報を活用した効果的なガンク回避方法を詳しく解説します。視界管理の重要性と、敵ジャングラーの動きを予測するテクニックを学びましょう。",
    game: "League of Legends",
    author: "ProGamer123",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=400&width=700",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "2:45",
    views: 1234,
    likes: 89,
    comments: 23,
    createdAt: "2024-01-15",
    tags: ["ガンク", "視界管理", "ミニマップ", "ジャングル"],
  })

  const [comments] = useState([
    {
      id: 1,
      user: "GamerPro",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "とても参考になりました！特にミニマップの見方が勉強になりました。",
      timestamp: "2時間前",
      likes: 12,
    },
    {
      id: 2,
      user: "LoLMaster",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "この技術を使ってランクが上がりました。ありがとうございます！",
      timestamp: "5時間前",
      likes: 8,
    },
    {
      id: 3,
      user: "JungleKing",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "ジャングラー視点からの解説も見てみたいです。",
      timestamp: "1日前",
      likes: 5,
    },
  ])

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/browse" className="text-white/80 hover:text-white transition-colors">
            ← 動画一覧に戻る
          </Link>
          <div className="flex items-center gap-2">
            <MagneticElement>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link href={`/video/${video.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  編集
                </Link>
              </Button>
            </MagneticElement>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="relative aspect-video bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    poster={video.thumbnail}
                    src={video.videoUrl}
                  />

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="space-y-2">
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
                          <MagneticElement>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/10"
                              onClick={togglePlay}
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </MagneticElement>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={() => handleSeek([Math.max(0, currentTime - 10)])}
                          >
                            <SkipBack className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={() => handleSeek([Math.min(duration, currentTime + 10)])}
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
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                            <Maximize className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Video Info */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <span>{video.views.toLocaleString()} 回視聴</span>
                        <span>{video.createdAt}</span>
                        <Badge variant="secondary" className="bg-white/10 text-white/80">
                          {video.game}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-white/20">
                        <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{video.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{video.author}</p>
                        <p className="text-white/60 text-sm">チャンネル登録者 1.2K人</p>
                      </div>
                      <Button className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        チャンネル登録
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <MagneticElement>
                        <Button
                          variant="outline"
                          className={`border-white/20 hover:bg-white/10 ${isLiked ? "bg-purple-500/20 border-purple-500/50" : ""}`}
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                          {video.likes + (isLiked ? 1 : 0)}
                        </Button>
                      </MagneticElement>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Share2 className="w-4 h-4 mr-2" />
                        共有
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white/80 leading-relaxed">{video.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Comments Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MessageCircle className="w-5 h-5 text-white" />
                    <h3 className="text-white font-semibold">コメント ({comments.length})</h3>
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <Textarea
                      placeholder="コメントを追加..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-3"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                        onClick={() => setNewComment("")}
                      >
                        キャンセル
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        disabled={!newComment.trim()}
                      >
                        投稿
                      </Button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        className="flex gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Avatar className="w-8 h-8 border border-white/20">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium">{comment.user}</span>
                            <span className="text-white/60 text-xs">{comment.timestamp}</span>
                          </div>
                          <p className="text-white/80 text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              <Heart className="w-3 h-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              返信
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
