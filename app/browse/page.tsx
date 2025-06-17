"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import {
  Play,
  Search,
  MessageCircle,
  Share2,
  Trophy,
  Filter,
  Grid,
  List,
  Eye,
  Star,
  Shield,
  GamepadIcon,
  Upload,
  Users,
  Bookmark,
  MoreVertical,
  ThumbsUp,
} from "lucide-react"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("trending")

  const [videos] = useState([
    {
      id: 1,
      title: "完璧なガンク回避テクニック - プロが教える視界管理の極意",
      description:
        "ミニマップの情報を活用した効果的なガンク回避方法を詳しく解説。ワード配置から敵の動きの予測まで完全ガイド",
      game: "League of Legends",
      author: "ProGamer123",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "12:45",
      views: 125000,
      likes: 8900,
      comments: 234,
      createdAt: "2024-01-15",
      tags: ["ガンク", "視界管理", "ミニマップ", "ジャングル"],
      verified: true,
      premium: false,
      rating: 4.8,
    },
    {
      id: 2,
      title: "チームファイト完全攻略 - ADCポジショニングの教科書",
      description: "世界大会レベルのチームファイトにおけるADCの立ち回りを徹底分析。ダメージ最大化のコツを伝授",
      game: "League of Legends",
      author: "ADCMaster",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "18:30",
      views: 89000,
      likes: 6700,
      comments: 189,
      createdAt: "2024-01-14",
      tags: ["チームファイト", "ポジショニング", "ADC", "DPS"],
      verified: true,
      premium: true,
      rating: 4.9,
    },
    {
      id: 3,
      title: "VALORANT エイム練習革命 - 1週間で劇的改善する方法",
      description: "科学的根拠に基づいたエイム練習メソッド。プロが実践する効率的なトレーニングルーチンを公開",
      game: "VALORANT",
      author: "AimGenius",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "15:22",
      views: 156000,
      likes: 12000,
      comments: 445,
      createdAt: "2024-01-13",
      tags: ["エイム", "練習", "FPS", "テクニック"],
      verified: true,
      premium: false,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Apex Legends 第三者対策の極意 - 漁夫を完全回避",
      description: "バトロワで最も重要な第三者対策を完全マスター。ポジション取りから戦闘タイミングまで",
      game: "Apex Legends",
      author: "ApexLegend",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "21:15",
      views: 78000,
      likes: 5600,
      comments: 167,
      createdAt: "2024-01-12",
      tags: ["第三者", "ポジション", "バトロワ", "戦術"],
      verified: false,
      premium: false,
      rating: 4.6,
    },
    {
      id: 5,
      title: "Overwatch 2 タンク革命 - 新メタ完全対応ガイド",
      description: "シーズン最新メタに対応したタンクの立ち回り。各ヒーローの特性を活かした戦術を解説",
      game: "Overwatch 2",
      author: "TankMaster",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "14:08",
      views: 67000,
      likes: 4200,
      comments: 123,
      createdAt: "2024-01-11",
      tags: ["タンク", "メタ", "戦術", "ヒーロー"],
      verified: true,
      premium: true,
      rating: 4.5,
    },
    {
      id: 6,
      title: "CS2 スモーク戦術大全 - プロチーム分析から学ぶ",
      description: "世界トップチームのスモーク戦術を徹底分析。マップ別の効果的な使い方を完全解説",
      game: "CS2",
      author: "TacticalPro",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "19:45",
      views: 92000,
      likes: 7800,
      comments: 298,
      createdAt: "2024-01-10",
      tags: ["スモーク", "戦術", "チーム", "マップ"],
      verified: true,
      premium: false,
      rating: 4.8,
    },
  ])

  const [rankings] = useState([
    { rank: 1, user: "ProGamer123", points: 12340, badge: "🥇", verified: true },
    { rank: 2, user: "ADCMaster", points: 11890, badge: "🥈", verified: true },
    { rank: 3, user: "AimGenius", points: 10560, badge: "🥉", verified: true },
    { rank: 4, user: "ApexLegend", points: 9870, badge: "4", verified: false },
    { rank: 5, user: "TankMaster", points: 9340, badge: "5", verified: true },
  ])

  const [categories] = useState([
    { name: "すべて", value: "all", count: "1.2K" },
    { name: "League of Legends", value: "lol", count: "456" },
    { name: "VALORANT", value: "valorant", count: "389" },
    { name: "Apex Legends", value: "apex", count: "234" },
    { name: "Overwatch 2", value: "overwatch", count: "178" },
    { name: "CS2", value: "cs2", count: "156" },
  ])

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      video.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGame = selectedGame === "all" || video.game.toLowerCase().includes(selectedGame.toLowerCase())
    return matchesSearch && matchesGame
  })

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.views + b.likes * 10 - (a.views + a.likes * 10)
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popular":
        return b.likes - a.likes
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header
        className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50"
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
              <Link href="/browse" className="text-white font-medium flex items-center gap-2">
                <Play className="w-4 h-4" />
                動画を見る
              </Link>
              <Link href="/upload" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                アップロード
              </Link>
              <Link
                href="/community"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                コミュニティ
              </Link>
              <Link
                href="/leaderboard"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    カテゴリー
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <MagneticElement key={category.value} strength={0.1}>
                        <motion.button
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                            selectedGame === category.value
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                          onClick={() => setSelectedGame(category.value)}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-sm">{category.name}</span>
                          <Badge variant="secondary" className="bg-white/10 text-white/60 text-xs">
                            {category.count}
                          </Badge>
                        </motion.button>
                      </MagneticElement>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Rankings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-white font-semibold">週間ランキング</h3>
                  </div>
                  <div className="space-y-3">
                    {rankings.map((user, index) => (
                      <motion.div
                        key={user.rank}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          {user.rank <= 3 ? (
                            <span className="text-lg">{user.badge}</span>
                          ) : (
                            <span className="text-white/60 font-semibold text-sm">{user.badge}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="text-white text-sm font-medium truncate">{user.user}</p>
                            {user.verified && <Shield className="w-3 h-3 text-blue-400 flex-shrink-0" />}
                          </div>
                          <p className="text-white/60 text-xs">{user.points.toLocaleString()} pts</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/leaderboard">全ランキングを見る</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upload CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Upload className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">あなたも投稿しませんか？</h3>
                  <p className="text-white/80 text-sm mb-4">プレイ動画を分析して、コミュニティと知識を共有しましょう</p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    asChild
                  >
                    <Link href="/upload">動画をアップロード</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Controls */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input
                    placeholder="動画、作者、タグで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="trending" className="text-white">
                        トレンド
                      </SelectItem>
                      <SelectItem value="latest" className="text-white">
                        最新
                      </SelectItem>
                      <SelectItem value="popular" className="text-white">
                        人気
                      </SelectItem>
                      <SelectItem value="rating" className="text-white">
                        評価順
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border border-white/20 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className={viewMode === "grid" ? "bg-purple-500" : "text-white hover:bg-white/10"}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className={viewMode === "list" ? "bg-purple-500" : "text-white hover:bg-white/10"}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60 text-sm">{sortedVideos.length} 件の動画が見つかりました</p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span>表示:</span>
                  <Badge variant="secondary" className="bg-white/10 text-white/80">
                    {viewMode === "grid" ? "グリッド" : "リスト"}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Video Grid/List */}
            <motion.div
              className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {sortedVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <MagneticElement>
                    <Card
                      className={`bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-all duration-300 ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className={`object-cover ${viewMode === "list" ? "w-full h-28" : "w-full h-48"}`}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                            <Link href={`/video/${video.id}`}>
                              <Play className="w-6 h-6 mr-2" />
                              再生
                            </Link>
                          </Button>
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                          {video.premium && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              PRO
                            </Badge>
                          )}
                          {video.verified && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              認証済み
                            </Badge>
                          )}
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
                          {video.duration}
                        </Badge>
                      </div>

                      <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="w-8 h-8 border border-white/20 flex-shrink-0">
                            <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{video.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white mb-1 line-clamp-2 hover:text-purple-400 transition-colors">
                              <Link href={`/video/${video.id}`}>{video.title}</Link>
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-sm text-white/60">{video.author}</p>
                              {video.verified && <Shield className="w-3 h-3 text-blue-400" />}
                            </div>
                            {viewMode === "list" && (
                              <p className="text-sm text-white/70 line-clamp-2 mb-3">{video.description}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-white p-1 flex-shrink-0"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {video.tags.slice(0, viewMode === "list" ? 4 : 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-white/60">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {video.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {video.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {video.comments}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span>{video.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              <Bookmark className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                          <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs">
                            {video.game}
                          </Badge>
                          <span className="text-xs text-white/60">{video.createdAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </MagneticElement>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8">
                さらに読み込む
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
