"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Search, Heart, MessageCircle, Share2, Trophy, TrendingUp, Clock } from "lucide-react"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState("all")

  const [videos] = useState([
    {
      id: 1,
      title: "完璧なガンク回避テクニック",
      description: "ミニマップの情報を活用した効果的なガンク回避方法",
      game: "League of Legends",
      author: "ProGamer123",
      authorAvatar: "/placeholder-user.jpg",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:45",
      views: 1234,
      likes: 89,
      comments: 23,
      createdAt: "2024-01-15",
      tags: ["ガンク", "視界管理", "ミニマップ"],
    },
    {
      id: 2,
      title: "チームファイト時の完璧なポジショニング",
      description: "ADCとして最適なポジションを維持する方法",
      game: "League of Legends",
      author: "ADCMaster",
      authorAvatar: "/placeholder-user.jpg",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:20",
      views: 2156,
      likes: 156,
      comments: 45,
      createdAt: "2024-01-14",
      tags: ["チームファイト", "ポジショニング", "ADC"],
    },
    {
      id: 3,
      title: "VALORANT: スモーク活用術",
      description: "コントローラーとしてのスモークの効果的な使い方",
      game: "VALORANT",
      author: "SmokeKing",
      authorAvatar: "/placeholder-user.jpg",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "0:38",
      views: 987,
      likes: 67,
      comments: 12,
      createdAt: "2024-01-13",
      tags: ["スモーク", "コントローラー", "戦術"],
    },
    {
      id: 4,
      title: "Apex: 第三者漁夫対策",
      description: "戦闘中に第三者に狙われないためのポジション取り",
      game: "Apex Legends",
      author: "ApexPro",
      authorAvatar: "/placeholder-user.jpg",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:05",
      views: 1567,
      likes: 123,
      comments: 34,
      createdAt: "2024-01-12",
      tags: ["第三者", "ポジション", "戦術"],
    },
  ])

  const [rankings] = useState([
    { rank: 1, user: "ProGamer123", likes: 1234, badge: "🥇" },
    { rank: 2, user: "ADCMaster", likes: 987, badge: "🥈" },
    { rank: 3, user: "SmokeKing", likes: 756, badge: "🥉" },
    { rank: 4, user: "ApexPro", likes: 654, badge: "4" },
    { rank: 5, user: "MidLaner", likes: 543, badge: "5" },
  ])

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesGame = selectedGame === "all" || video.game === selectedGame
    return matchesSearch && matchesGame
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GameAnalyzer</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-white font-medium">
              動画を見る
            </Link>
            <Link href="/upload" className="text-white/80 hover:text-white transition-colors">
              アップロード
            </Link>
            <Link href="/community" className="text-white/80 hover:text-white transition-colors">
              コミュニティ
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
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input
                    placeholder="動画やタグで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "League of Legends", "VALORANT", "Apex Legends", "Overwatch 2"].map((game) => (
                    <Button
                      key={game}
                      size="sm"
                      variant={selectedGame === game ? "default" : "ghost"}
                      className={selectedGame === game ? "bg-purple-500" : "text-white hover:bg-white/10"}
                      onClick={() => setSelectedGame(game)}
                    >
                      {game === "all" ? "すべて" : game}
                    </Button>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="trending" className="space-y-6">
                <TabsList className="bg-white/5 border-white/10">
                  <TabsTrigger value="trending" className="data-[state=active]:bg-white/10 text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    トレンド
                  </TabsTrigger>
                  <TabsTrigger value="latest" className="data-[state=active]:bg-white/10 text-white">
                    <Clock className="w-4 h-4 mr-2" />
                    最新
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="data-[state=active]:bg-white/10 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    人気
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="trending" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredVideos.map((video) => (
                      <Card
                        key={video.id}
                        className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-colors"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                              <Link href={`/video/${video.id}`}>
                                <Play className="w-6 h-6 mr-2" />
                                再生
                              </Link>
                            </Button>
                          </div>
                          <Badge className="absolute top-3 right-3 bg-black/60 text-white text-sm">
                            {video.duration}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="w-8 h-8 border border-white/20">
                              <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{video.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white mb-1 line-clamp-2">{video.title}</h3>
                              <p className="text-sm text-white/60 mb-2">{video.author}</p>
                              <p className="text-sm text-white/80 line-clamp-2 mb-3">{video.description}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {video.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-white/60">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                {video.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {video.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {video.comments}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="latest" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...filteredVideos].reverse().map((video) => (
                      <Card
                        key={video.id}
                        className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-colors"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                              <Link href={`/video/${video.id}`}>
                                <Play className="w-6 h-6 mr-2" />
                                再生
                              </Link>
                            </Button>
                          </div>
                          <Badge className="absolute top-3 right-3 bg-black/60 text-white text-sm">
                            {video.duration}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="w-8 h-8 border border-white/20">
                              <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{video.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white mb-1 line-clamp-2">{video.title}</h3>
                              <p className="text-sm text-white/60 mb-2">{video.author}</p>
                              <p className="text-sm text-white/80 line-clamp-2 mb-3">{video.description}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {video.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-white/60">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Play className="w-3 h-3" />
                                {video.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {video.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {video.comments}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="popular" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...filteredVideos]
                      .sort((a, b) => b.likes - a.likes)
                      .map((video) => (
                        <Card
                          key={video.id}
                          className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-colors"
                        >
                          <div className="relative">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                                <Link href={`/video/${video.id}`}>
                                  <Play className="w-6 h-6 mr-2" />
                                  再生
                                </Link>
                              </Button>
                            </div>
                            <Badge className="absolute top-3 right-3 bg-black/60 text-white text-sm">
                              {video.duration}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="w-8 h-8 border border-white/20">
                                <AvatarImage src={video.authorAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{video.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white mb-1 line-clamp-2">{video.title}</h3>
                                <p className="text-sm text-white/60 mb-2">{video.author}</p>
                                <p className="text-sm text-white/80 line-clamp-2 mb-3">{video.description}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {video.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-white/60">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Play className="w-3 h-3" />
                                  {video.views.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {video.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-3 h-3" />
                                  {video.comments}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                                <Share2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Weekly Rankings */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-white font-semibold">週間ランキング</h3>
                </div>
                <div className="space-y-3">
                  {rankings.map((user) => (
                    <div key={user.rank} className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {user.rank <= 3 ? (
                          <span className="text-lg">{user.badge}</span>
                        ) : (
                          <span className="text-white/60 font-semibold">{user.badge}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{user.user}</p>
                        <p className="text-white/60 text-xs">{user.likes} いいね</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-4">人気タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "ガンク",
                    "視界管理",
                    "チームファイト",
                    "ポジショニング",
                    "スモーク",
                    "戦術",
                    "第三者",
                    "ミニマップ",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-white/10 text-white/80 hover:bg-white/20 cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload CTA */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
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
          </div>
        </div>
      </div>
    </div>
  )
}
