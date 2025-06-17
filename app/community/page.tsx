"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Search, Users, MessageCircle, Trophy, TrendingUp, Heart, Share2, Plus } from "lucide-react"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const [discussions] = useState([
    {
      id: 1,
      title: "LoLの新メタについて議論しましょう",
      author: "ProGamer123",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 23,
      likes: 45,
      lastActivity: "2時間前",
      tags: ["League of Legends", "メタ", "戦略"],
      category: "discussion",
    },
    {
      id: 2,
      title: "VALORANT: エイム練習の効果的な方法",
      author: "AimMaster",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 18,
      likes: 32,
      lastActivity: "4時間前",
      tags: ["VALORANT", "エイム", "練習"],
      category: "tips",
    },
    {
      id: 3,
      title: "今週のベスト分析動画を共有しよう",
      author: "AnalysisKing",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      replies: 12,
      likes: 28,
      lastActivity: "6時間前",
      tags: ["動画", "分析", "共有"],
      category: "showcase",
    },
  ])

  const [topContributors] = useState([
    { name: "ProGamer123", contributions: 156, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "AnalysisKing", contributions: 134, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "AimMaster", contributions: 98, avatar: "/placeholder.svg?height=40&width=40" },
    { name: "StrategyGuru", contributions: 87, avatar: "/placeholder.svg?height=40&width=40" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Play className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">GameAnalyzer</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-white/80 hover:text-white transition-colors">
              動画を見る
            </Link>
            <Link href="/upload" className="text-white/80 hover:text-white transition-colors">
              アップロード
            </Link>
            <Link href="/community" className="text-white font-medium">
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
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-bold text-white mb-4">コミュニティ</h1>
              <p className="text-white/70">ゲーマー同士で知識を共有し、一緒に成長しましょう</p>
            </motion.div>

            {/* Search and Create */}
            <motion.div
              className="flex flex-col md:flex-row gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="ディスカッションを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                新しいトピック
              </Button>
            </motion.div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger value="all" className="data-[state=active]:bg-white/10 text-white">
                  すべて
                </TabsTrigger>
                <TabsTrigger value="discussion" className="data-[state=active]:bg-white/10 text-white">
                  ディスカッション
                </TabsTrigger>
                <TabsTrigger value="tips" className="data-[state=active]:bg-white/10 text-white">
                  ヒント
                </TabsTrigger>
                <TabsTrigger value="showcase" className="data-[state=active]:bg-white/10 text-white">
                  ショーケース
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10 border border-white/20">
                            <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-2 hover:text-purple-400 transition-colors cursor-pointer">
                              {discussion.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-3">
                              by {discussion.author} • {discussion.lastActivity}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {discussion.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {discussion.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {discussion.likes}
                              </span>
                              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
                                <Share2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="discussion" className="space-y-4">
                {discussions
                  .filter((d) => d.category === "discussion")
                  .map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10 border border-white/20">
                              <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-2">{discussion.title}</h3>
                              <p className="text-white/60 text-sm mb-3">
                                by {discussion.author} • {discussion.lastActivity}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-white/60">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {discussion.replies}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {discussion.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </TabsContent>

              <TabsContent value="tips" className="space-y-4">
                {discussions
                  .filter((d) => d.category === "tips")
                  .map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10 border border-white/20">
                              <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-2">{discussion.title}</h3>
                              <p className="text-white/60 text-sm mb-3">
                                by {discussion.author} • {discussion.lastActivity}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-white/60">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {discussion.replies}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {discussion.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </TabsContent>

              <TabsContent value="showcase" className="space-y-4">
                {discussions
                  .filter((d) => d.category === "showcase")
                  .map((discussion, index) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10 border border-white/20">
                              <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-2">{discussion.title}</h3>
                              <p className="text-white/60 text-sm mb-3">
                                by {discussion.author} • {discussion.lastActivity}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-white/60">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {discussion.replies}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {discussion.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Contributors */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-white font-semibold">トップコントリビューター</h3>
                  </div>
                  <div className="space-y-3">
                    {topContributors.map((user, index) => (
                      <motion.div
                        key={user.name}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
                          {index < 3 ? (
                            <span className="text-lg">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
                          ) : (
                            <span className="text-white/60 font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <Avatar className="w-8 h-8 border border-white/20">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{user.name}</p>
                          <p className="text-white/60 text-xs">{user.contributions} 投稿</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="text-white font-semibold">コミュニティ統計</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70 text-sm">総メンバー</span>
                      <span className="text-white font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70 text-sm">今日の投稿</span>
                      <span className="text-white font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70 text-sm">アクティブユーザー</span>
                      <span className="text-white font-semibold">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Join CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">コミュニティに参加</h3>
                  <p className="text-white/80 text-sm mb-4">ゲーマー同士で知識を共有し、一緒に成長しましょう</p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    asChild
                  >
                    <Link href="/register">今すぐ参加</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
