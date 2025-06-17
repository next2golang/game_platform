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
  MessageCircle,
  Share2,
  Edit,
  SkipBack,
  SkipForward,
  Settings,
  ThumbsUp,
  Download,
  Bookmark,
  Star,
  Shield,
  Eye,
  Clock,
  Trophy,
  Target,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Send,
  Smile,
  Gift,
} from "lucide-react"

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showDescription, setShowDescription] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [quality, setQuality] = useState("1080p")

  // Mock video data
  const [video] = useState({
    id: params.id,
    title: "完璧なガンク回避テクニック - プロが教える視界管理の極意",
    description: `ミニマップの情報を活用した効果的なガンク回避方法を詳しく解説します。

🎯 この動画で学べること:
• ワードの効果的な配置方法
• 敵ジャングラーの動きを予測するテクニック
• ガンクを事前に察知する方法
• 安全な逃げルートの確保
• チームとの連携方法

📊 統計データ:
• ガンク回避率: 89%向上
• デス数: 平均42%減少
• ランク上昇: 平均1.3ティア

⏰ タイムスタンプ:
0:00 イントロダクション
1:30 基本的な視界管理
4:15 ワード配置の極意
7:45 敵の動きを読む方法
11:20 実戦での応用例
14:30 まとめ

🔗 関連動画:
• チームファイト完全攻略
• ジャングル効率化テクニック
• ランクアップ戦略ガイド`,
    game: "League of Legends",
    author: "ProGamer123",
    authorId: "user123",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorSubscribers: "125K",
    authorVerified: true,
    thumbnail: "/placeholder.svg?height=400&width=700",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "15:45",
    views: 125000,
    likes: 8900,
    dislikes: 234,
    comments: 567,
    createdAt: "2024-01-15",
    tags: ["ガンク", "視界管理", "ミニマップ", "ジャングル", "LoL", "プロテクニック"],
    category: "教育・解説",
    language: "日本語",
    rating: 4.8,
    premium: false,
    chapters: [
      { time: 0, title: "イントロダクション" },
      { time: 90, title: "基本的な視界管理" },
      { time: 255, title: "ワード配置の極意" },
      { time: 465, title: "敵の動きを読む方法" },
      { time: 680, title: "実戦での応用例" },
      { time: 870, title: "まとめ" },
    ],
  })

  const [comments] = useState([
    {
      id: 1,
      user: "GamerPro_2024",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "この動画のおかげでランクが2つ上がりました！特にワード配置の部分が目から鱗でした。ありがとうございます！",
      timestamp: "2時間前",
      likes: 156,
      replies: 12,
      verified: false,
      pinned: true,
    },
    {
      id: 2,
      user: "LoLMaster_JP",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "プロの視点からの解説が本当に分かりやすい。特に7:45からの敵の動きを読む部分は何度も見返しています。",
      timestamp: "5時間前",
      likes: 89,
      replies: 8,
      verified: true,
      pinned: false,
    },
    {
      id: 3,
      user: "JungleMain_2023",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "ジャングラー側の視点からも解説してほしいです！ガンクを成功させるコツも知りたい。",
      timestamp: "8時間前",
      likes: 67,
      replies: 15,
      verified: false,
      pinned: false,
    },
    {
      id: 4,
      user: "Rookie_Player",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "初心者にも分かりやすい説明でした。実際に試してみたら本当にガンクを避けられるようになりました！",
      timestamp: "12時間前",
      likes: 45,
      replies: 6,
      verified: false,
      pinned: false,
    },
    {
      id: 5,
      user: "eSports_Fan",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "世界大会でも使われているテクニックですね。プロの試合でも同じような場面をよく見ます。",
      timestamp: "1日前",
      likes: 78,
      replies: 9,
      verified: false,
      pinned: false,
    },
  ])

  const [relatedVideos] = useState([
    {
      id: 2,
      title: "チームファイト完全攻略 - ADCポジショニングの教科書",
      author: "ProGamer123",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "18:30",
      views: "89K",
      verified: true,
    },
    {
      id: 3,
      title: "ジャングル効率化テクニック - 経験値とゴールド最大化",
      author: "JungleMaster",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "12:15",
      views: "67K",
      verified: true,
    },
    {
      id: 4,
      title: "ランクアップ戦略ガイド - メンタル管理から戦術まで",
      author: "RankUpCoach",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "22:45",
      views: "156K",
      verified: false,
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

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/browse" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <SkipBack className="w-4 h-4" />
              動画一覧に戻る
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
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                ダウンロード
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 text-sm min-w-[45px] font-mono">{formatTime(currentTime)}</span>
                        <Slider
                          value={[currentTime]}
                          max={duration}
                          step={0.1}
                          onValueChange={handleSeek}
                          className="flex-1"
                        />
                        <span className="text-white/80 text-sm min-w-[45px] font-mono">{formatTime(duration)}</span>
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MagneticElement>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white hover:bg-white/20 p-2"
                              onClick={togglePlay}
                            >
                              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            </Button>
                          </MagneticElement>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 p-2"
                            onClick={() => handleSeek([Math.max(0, currentTime - 10)])}
                          >
                            <SkipBack className="w-4 h-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 p-2"
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
                            <span className="text-white/60 text-xs min-w-[30px]">{volume}%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={playbackRate}
                            onChange={(e) => setPlaybackRate(Number(e.target.value))}
                            className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20"
                          >
                            <option value={0.25}>0.25x</option>
                            <option value={0.5}>0.5x</option>
                            <option value={0.75}>0.75x</option>
                            <option value={1}>1x</option>
                            <option value={1.25}>1.25x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                          </select>

                          <select
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20"
                          >
                            <option value="360p">360p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="1440p">1440p</option>
                          </select>

                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                            <Settings className="w-4 h-4" />
                          </Button>

                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Title and Stats */}
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-3 leading-tight">{video.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views.toLocaleString()} 回視聴</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{video.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{video.rating}/5</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/10 text-white/80">
                        {video.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {video.game}
                      </Badge>
                    </div>
                  </div>

                  {/* Author and Actions */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-white/20">
                        <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{video.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-semibold">{video.author}</p>
                          {video.authorVerified && <Shield className="w-4 h-4 text-blue-400" />}
                        </div>
                        <p className="text-white/60 text-sm">{video.authorSubscribers} 登録者</p>
                      </div>
                      <MagneticElement>
                        <Button
                          className={`ml-4 ${
                            isSubscribed
                              ? "bg-white/20 text-white border border-white/30"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          }`}
                          onClick={handleSubscribe}
                        >
                          {isSubscribed ? "登録済み" : "チャンネル登録"}
                        </Button>
                      </MagneticElement>
                    </div>

                    <div className="flex items-center gap-2">
                      <MagneticElement>
                        <Button
                          variant="outline"
                          className={`border-white/20 hover:bg-white/10 ${
                            isLiked ? "bg-purple-500/20 border-purple-500/50 text-purple-300" : "text-white"
                          }`}
                          onClick={handleLike}
                        >
                          <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                          {(video.likes + (isLiked ? 1 : 0)).toLocaleString()}
                        </Button>
                      </MagneticElement>

                      <Button
                        variant="outline"
                        className={`border-white/20 hover:bg-white/10 ${
                          isBookmarked ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" : "text-white"
                        }`}
                        onClick={handleBookmark}
                      >
                        <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                        保存
                      </Button>

                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Share2 className="w-4 h-4 mr-2" />
                        共有
                      </Button>

                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className={`text-white/80 leading-relaxed ${showDescription ? "" : "line-clamp-3"}`}>
                        {video.description.split("\n").map((line, index) => (
                          <div key={index} className="mb-2">
                            {line}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-400 hover:text-purple-300 mt-2 p-0"
                        onClick={() => setShowDescription(!showDescription)}
                      >
                        {showDescription ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            折りたたむ
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            もっと見る
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {video.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/10 text-white/80 hover:bg-white/20 cursor-pointer"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Chapters */}
                  <div>
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      チャプター
                    </h3>
                    <div className="space-y-2">
                      {video.chapters.map((chapter, index) => (
                        <motion.button
                          key={index}
                          className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-3"
                          onClick={() => handleSeek([chapter.time])}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-purple-400 font-mono text-sm min-w-[50px]">
                            {formatTime(chapter.time)}
                          </span>
                          <span className="text-white">{chapter.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      コメント ({comments.length})
                    </h3>
                    <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm">
                      <option value="top">人気順</option>
                      <option value="newest">新しい順</option>
                      <option value="oldest">古い順</option>
                    </select>
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="flex gap-3 mb-4">
                      <Avatar className="w-10 h-10 border border-white/20">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="コメントを追加..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                          rows={3}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-2">
                              <Smile className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-2">
                              <Gift className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
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
                              <Send className="w-4 h-4 mr-2" />
                              投稿
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        className={`flex gap-3 ${comment.pinned ? "bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Avatar className="w-10 h-10 border border-white/20">
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-medium">{comment.user}</span>
                            {comment.verified && <Shield className="w-3 h-3 text-blue-400" />}
                            {comment.pinned && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 text-xs">ピン留め</Badge>
                            )}
                            <span className="text-white/60 text-sm">{comment.timestamp}</span>
                          </div>
                          <p className="text-white/80 mb-3 leading-relaxed">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              <ThumbsUp className="w-3 h-3 mr-2" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              返信
                            </Button>
                            {comment.replies > 0 && (
                              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-1">
                                <ChevronDown className="w-3 h-3 mr-1" />
                                {comment.replies}件の返信を表示
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1 ml-auto">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      さらにコメントを読み込む
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Videos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    関連動画
                  </h3>
                  <div className="space-y-4">
                    {relatedVideos.map((relatedVideo, index) => (
                      <motion.div
                        key={relatedVideo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <MagneticElement>
                          <Link href={`/video/${relatedVideo.id}`}>
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
                              <CardContent className="p-3">
                                <div className="flex gap-3">
                                  <div className="relative">
                                    <img
                                      src={relatedVideo.thumbnail || "/placeholder.svg"}
                                      alt={relatedVideo.title}
                                      className="w-24 h-16 object-cover rounded"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                      <Play className="w-4 h-4 text-white" />
                                    </div>
                                    <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                                      {relatedVideo.duration}
                                    </Badge>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-medium text-sm line-clamp-2 mb-1 group-hover:text-purple-400 transition-colors">
                                      {relatedVideo.title}
                                    </h4>
                                    <div className="flex items-center gap-1 mb-1">
                                      <span className="text-white/60 text-xs">{relatedVideo.author}</span>
                                      {relatedVideo.verified && <Shield className="w-3 h-3 text-blue-400" />}
                                    </div>
                                    <span className="text-white/60 text-xs">{relatedVideo.views} 回視聴</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </MagneticElement>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Video Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    動画統計
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">視聴回数</span>
                      <span className="text-white font-semibold">{video.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">いいね</span>
                      <span className="text-white font-semibold">{video.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">コメント</span>
                      <span className="text-white font-semibold">{video.comments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">評価</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-semibold">{video.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">公開日</span>
                      <span className="text-white font-semibold">{video.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    共有
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Twitter", color: "bg-blue-500" },
                      { name: "Discord", color: "bg-indigo-500" },
                      { name: "LINE", color: "bg-green-500" },
                      { name: "コピー", color: "bg-gray-500" },
                    ].map((platform) => (
                      <MagneticElement key={platform.name}>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`w-full border-white/20 text-white hover:bg-white/10 ${platform.color}/20`}
                        >
                          {platform.name}
                        </Button>
                      </MagneticElement>
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
