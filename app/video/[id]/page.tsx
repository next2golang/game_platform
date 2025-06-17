"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { GradientButton } from "@/components/ui/gradient-button"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Heart,
  Share2,
  Bookmark,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Clock,
  Star,
  Shield,
  GamepadIcon,
  Download,
  Edit,
  MoreHorizontal,
  Send,
  Reply,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react"

export default function VideoPage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("comments")

  const [video] = useState({
    id: params.id,
    title: "プロが教える完璧なエイムテクニック - VALORANT完全ガイド",
    description: `このビデオでは、世界トップクラスのプロゲーマーが実践するエイム練習方法を詳しく解説します。

初心者から上級者まで役立つテクニックを段階的に説明し、実際のゲームプレイでの応用方法も紹介します。

【内容】
0:00 - イントロダクション
2:30 - 基本的なエイム設定
5:45 - ウォームアップルーティン
10:20 - 実践的な練習方法
15:30 - ゲーム内での応用
18:45 - よくある間違いと修正方法
22:10 - まとめ

【使用ツール】
- Aim Lab
- KovaaK's FPS Aim Trainer
- VALORANT Practice Range

プロレベルのエイムを身につけて、ランクアップを目指しましょう！`,
    thumbnail: "/placeholder.svg?height=400&width=700",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    author: "FPS_Master_JP",
    authorAvatar: "/placeholder.svg?height=50&width=50",
    authorSubscribers: "125K",
    verified: true,
    views: 125000,
    likes: 8900,
    dislikes: 234,
    comments: 456,
    duration: "24:35",
    uploadDate: "2024-01-15",
    game: "VALORANT",
    category: "チュートリアル",
    tags: ["エイム", "練習", "テクニック", "プロ", "ガイド"],
    difficulty: "中級",
    rating: 4.8,
    language: "日本語",
  })

  const [comments] = useState([
    {
      id: "1",
      author: "GamerPro123",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "とても分かりやすい解説でした！特にウォームアップルーティンの部分が参考になりました。毎日実践してみます。",
      timestamp: "2時間前",
      likes: 45,
      replies: 3,
      isLiked: false,
    },
    {
      id: "2",
      author: "ValorantNewbie",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "初心者ですが、この動画のおかげでエイムが少し良くなった気がします。感度設定の部分をもう一度見直してみます。",
      timestamp: "4時間前",
      likes: 23,
      replies: 1,
      isLiked: true,
    },
    {
      id: "3",
      author: "CompetitivePlayer",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      content: "プロの練習方法が知れて良かったです。特にクロスヘアプレースメントの重要性を再認識しました。",
      timestamp: "6時間前",
      likes: 67,
      replies: 5,
      isLiked: false,
    },
  ])

  const [relatedVideos] = useState([
    {
      id: "2",
      title: "VALORANT ランク戦で勝つための戦術",
      thumbnail: "/placeholder.svg?height=120&width=200",
      author: "Tactical_Master",
      views: "89K",
      duration: "18:45",
    },
    {
      id: "3",
      title: "エージェント別立ち回り完全ガイド",
      thumbnail: "/placeholder.svg?height=120&width=200",
      author: "Agent_Specialist",
      views: "67K",
      duration: "22:10",
    },
    {
      id: "4",
      title: "プロが使うクロスヘア設定集",
      thumbnail: "/placeholder.svg?height=120&width=200",
      author: "Settings_Guru",
      views: "45K",
      duration: "12:30",
    },
  ])

  const [analysisPoints] = useState([
    {
      time: 150,
      title: "感度設定のポイント",
      description: "プロが推奨する感度設定の考え方",
      type: "tip",
    },
    {
      time: 345,
      title: "ウォームアップの重要性",
      description: "効果的なウォームアップルーティン",
      type: "technique",
    },
    {
      time: 620,
      title: "クロスヘアプレースメント",
      description: "正しいクロスヘアの位置について",
      type: "strategy",
    },
  ])

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100
      setVolume(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground variant="geometric" />
      <FloatingElements />

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <GamepadIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GameAnalyzer Pro</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/browse" className="text-white/80 hover:text-white transition-colors">
                動画を見る
              </Link>
              <Link href="/upload" className="text-white/80 hover:text-white transition-colors">
                アップロード
              </Link>
              <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                コミュニティ
              </Link>
              <Link href="/leaderboard" className="text-white/80 hover:text-white transition-colors">
                ランキング
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                asChild
              >
                <Link href="/register">新規登録</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Video Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-full"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      src={video.videoUrl}
                      poster={video.thumbnail}
                    />

                    {/* Analysis Points Overlay */}
                    {analysisPoints.map((point, index) => {
                      const position = (point.time / duration) * 100
                      return (
                        <motion.div
                          key={index}
                          className="absolute top-4 bg-purple-500/90 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                          style={{ left: `${position}%` }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: Math.abs(currentTime - point.time) < 5 ? 1 : 0.7, y: 0 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleSeek([point.time])}
                        >
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {point.title}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Video Controls */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm min-w-[50px]">{formatTime(currentTime)}</span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={0.1}
                        onValueChange={handleSeek}
                        className="flex-1"
                      />
                      <span className="text-white/60 text-sm min-w-[50px]">{formatTime(duration)}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white hover:bg-white/10"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white hover:bg-white/10"
                          onClick={() => handleSeek([Math.max(0, currentTime - 10)])}
                        >
                          <SkipBack className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white hover:bg-white/10"
                          onClick={() => handleSeek([Math.min(duration, currentTime + 10)])}
                        >
                          <SkipForward className="w-5 h-5" />
                        </Button>

                        <div className="flex items-center gap-2 ml-4 hidden sm:flex">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={toggleMute}
                          >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </Button>
                          <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            onValueChange={handleVolumeChange}
                            className="w-20"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 hidden sm:flex">
                          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <Button
                              key={rate}
                              size="sm"
                              variant={playbackRate === rate ? "default" : "ghost"}
                              className={`text-xs ${playbackRate === rate ? "bg-purple-500" : "text-white hover:bg-white/10"}`}
                              onClick={() => {
                                if (videoRef.current) {
                                  videoRef.current.playbackRate = rate
                                  setPlaybackRate(rate)
                                }
                              }}
                            >
                              {rate}x
                            </Button>
                          ))}
                        </div>
                        <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 hidden sm:flex">
                          <Settings className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 hidden sm:flex">
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Video Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
                      <div className="flex items-center gap-4 text-white/60 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {video.views.toLocaleString()} 回視聴
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {video.uploadDate}
                        </span>
                        <Badge className="bg-purple-500/20 text-purple-300">{video.game}</Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-300">{video.difficulty}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{video.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{video.author}</span>
                          {video.verified && <Shield className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="text-white/60 text-sm">{video.authorSubscribers} 登録者</div>
                      </div>
                    </div>
                    <GradientButton size="sm">チャンネル登録</GradientButton>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mb-6">
                    <MagneticElement>
                      <Button
                        variant="ghost"
                        className={`text-white hover:bg-white/10 ${isLiked ? "text-red-400" : ""}`}
                        onClick={handleLike}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                        {video.likes + (isLiked ? 1 : 0)}
                      </Button>
                    </MagneticElement>

                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      {video.dislikes}
                    </Button>

                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      <Share2 className="w-4 h-4 mr-2" />
                      シェア
                    </Button>

                    <MagneticElement>
                      <Button
                        variant="ghost"
                        className={`text-white hover:bg-white/10 ${isBookmarked ? "text-yellow-400" : ""}`}
                        onClick={handleBookmark}
                      >
                        <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                        保存
                      </Button>
                    </MagneticElement>

                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      <Download className="w-4 h-4 mr-2" />
                      ダウンロード
                    </Button>

                    <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                      <Link href={`/video/${video.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        分析編集
                      </Link>
                    </Button>
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <pre className="text-white/80 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                      {video.description}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Comments and Analysis */}
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-white/5 border-white/10">
                  <TabsTrigger value="comments" className="data-[state=active]:bg-white/10 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    コメント ({video.comments})
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="data-[state=active]:bg-white/10 text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    分析ポイント
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="data-[state=active]:bg-white/10 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    文字起こし
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comments" className="space-y-6">
                  {/* Comment Form */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <form onSubmit={handleCommentSubmit} className="space-y-3">
                        <Textarea
                          placeholder="コメントを追加..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" className="text-white hover:bg-white/10" type="button">
                            キャンセル
                          </Button>
                          <GradientButton type="submit" disabled={!newComment.trim()}>
                            <Send className="w-4 h-4 mr-2" />
                            投稿
                          </GradientButton>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-white font-medium">{comment.author}</span>
                                  <span className="text-white/60 text-sm">{comment.timestamp}</span>
                                </div>
                                <p className="text-white/80 mb-3">{comment.content}</p>
                                <div className="flex items-center gap-4">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className={`text-white/60 hover:text-white ${comment.isLiked ? "text-red-400" : ""}`}
                                  >
                                    <ThumbsUp className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                                    {comment.likes}
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                                    <Reply className="w-3 h-3 mr-1" />
                                    返信
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                                    <Flag className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  {analysisPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleSeek([point.time])}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <Target className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-1">{point.title}</h3>
                              <p className="text-white/70 text-sm mb-2">{point.description}</p>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                                  {formatTime(point.time)}
                                </Badge>
                                <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                                  {point.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="transcript" className="space-y-4">
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">AI文字起こし</h3>
                      <p className="text-white/70 mb-4">
                        この動画の文字起こしは現在処理中です。しばらくお待ちください。
                      </p>
                      <GradientButton>文字起こしを生成</GradientButton>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Videos */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4">関連動画</h3>
                  <div className="space-y-3">
                    {relatedVideos.map((relatedVideo, index) => (
                      <motion.div
                        key={relatedVideo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <MagneticElement>
                          <Link href={`/video/${relatedVideo.id}`}>
                            <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                              <div className="relative">
                                <img
                                  src={relatedVideo.thumbnail || "/placeholder.svg"}
                                  alt={relatedVideo.title}
                                  className="w-24 h-16 object-cover rounded"
                                />
                                <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                                  {relatedVideo.duration}
                                </Badge>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                                  {relatedVideo.title}
                                </h4>
                                <div className="text-white/60 text-xs">{relatedVideo.author}</div>
                                <div className="text-white/60 text-xs">{relatedVideo.views} 回視聴</div>
                              </div>
                            </div>
                          </Link>
                        </MagneticElement>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Video Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4">動画統計</h3>
                  <div className="space-y-3">
                    {[
                      { label: "視聴回数", value: video.views.toLocaleString(), icon: Eye },
                      { label: "いいね", value: video.likes.toLocaleString(), icon: Heart },
                      { label: "コメント", value: video.comments.toString(), icon: MessageCircle },
                      { label: "評価", value: `${video.rating}/5.0`, icon: Star },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{stat.value}</div>
                          <div className="text-white/60 text-xs">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                      >
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        {/* Related Videos (Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:hidden"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-4">関連動画</h3>
              <div className="space-y-3">
                {relatedVideos.map((relatedVideo, index) => (
                  <motion.div
                    key={relatedVideo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <MagneticElement>
                      <Link href={`/video/${relatedVideo.id}`}>
                        <div className="flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                          <div className="relative">
                            <img
                              src={relatedVideo.thumbnail || "/placeholder.svg"}
                              alt={relatedVideo.title}
                              className="w-24 h-16 object-cover rounded"
                            />
                            <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                              {relatedVideo.duration}
                            </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">{relatedVideo.title}</h4>
                            <div className="text-white/60 text-xs">{relatedVideo.author}</div>
                            <div className="text-white/60 text-xs">{relatedVideo.views} 回視聴</div>
                          </div>
                        </div>
                      </Link>
                    </MagneticElement>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
