"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { GradientButton } from "@/components/ui/gradient-button"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import {
  MessageCircle,
  Users,
  Heart,
  MoreHorizontal,
  Search,
  Plus,
  GamepadIcon,
  Trophy,
  Star,
  Clock,
  Eye,
  Reply,
  Pin,
  Calendar,
  Target,
  Zap,
} from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [newPostContent, setNewPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [discussions] = useState([
    {
      id: "1",
      title: "VALORANT新エージェント「Clove」の使い方について",
      content:
        "新エージェントのCloveを使ってみたのですが、アビリティの使いどころがよく分からないです。特にスモークの配置とタイミングについてアドバイスをお願いします。",
      author: "ValorantPlayer123",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorLevel: 25,
      createdAt: "2時間前",
      replies: 23,
      likes: 45,
      views: 234,
      tags: ["VALORANT", "エージェント", "質問"],
      category: "質問",
      pinned: false,
      solved: false,
    },
    {
      id: "2",
      title: "LoL世界大会2024の予想と注目選手",
      content:
        "今年の世界大会が近づいてきましたね！皆さんの優勝予想チームと注目している選手を教えてください。個人的にはT1のFakerの復活に期待しています。",
      author: "LoL_Enthusiast",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorLevel: 42,
      createdAt: "4時間前",
      replies: 67,
      likes: 128,
      views: 892,
      tags: ["League of Legends", "世界大会", "予想"],
      category: "雑談",
      pinned: true,
      solved: false,
    },
    {
      id: "3",
      title: "Apex Legends ランクマッチでのチーム連携のコツ",
      content:
        "ソロでランクマッチをプレイしているのですが、野良チームでの連携がうまくいきません。ピンやボイスチャットを使った効果的なコミュニケーション方法を教えてください。",
      author: "ApexSolo_Grinder",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorLevel: 18,
      createdAt: "6時間前",
      replies: 34,
      likes: 76,
      views: 456,
      tags: ["Apex Legends", "ランク", "チーム連携"],
      category: "攻略",
      pinned: false,
      solved: true,
    },
    {
      id: "4",
      title: "CS2のエイム練習ルーティンを共有します",
      content:
        "毎日やっているエイム練習のルーティンを共有します。Aim Lab、KovaaK's、CS2のDMを組み合わせた効果的な練習方法です。詳細は以下の通りです...",
      author: "CS_AimMaster",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      authorLevel: 35,
      createdAt: "8時間前",
      replies: 89,
      likes: 234,
      views: 1234,
      tags: ["CS2", "エイム", "練習", "ガイド"],
      category: "ガイド",
      pinned: false,
      solved: false,
    },
  ])

  const [events] = useState([
    {
      id: "1",
      title: "GameAnalyzer Pro 月間トーナメント",
      description: "全ゲーム対象の月間トーナメント開催！優勝者には豪華賞品をプレゼント",
      date: "2024-02-15",
      time: "20:00",
      participants: 156,
      maxParticipants: 256,
      game: "全ゲーム",
      prize: "¥100,000",
      status: "募集中",
    },
    {
      id: "2",
      title: "VALORANT コミュニティマッチ",
      description: "初心者歓迎のフレンドリーマッチ。楽しく交流しながらスキルアップしよう！",
      date: "2024-02-10",
      time: "19:00",
      participants: 23,
      maxParticipants: 50,
      game: "VALORANT",
      prize: "参加賞あり",
      status: "募集中",
    },
    {
      id: "3",
      title: "プロゲーマー講習会 - FPS編",
      description: "現役プロゲーマーによる特別講習会。エイムテクニックから戦術まで徹底解説",
      date: "2024-02-20",
      time: "18:00",
      participants: 89,
      maxParticipants: 100,
      game: "FPS全般",
      prize: "限定バッジ",
      status: "募集中",
    },
  ])

  const [topContributors] = useState([
    {
      id: "1",
      name: "GameMaster_Pro",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 67,
      posts: 234,
      helpfulAnswers: 189,
      reputation: 4567,
      badges: ["🏆", "⭐", "🔥"],
      speciality: "FPS全般",
    },
    {
      id: "2",
      name: "Strategy_Guru",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 54,
      posts: 178,
      helpfulAnswers: 145,
      reputation: 3892,
      badges: ["🧠", "📊", "💎"],
      speciality: "戦略・分析",
    },
    {
      id: "3",
      name: "Newbie_Helper",
      avatar: "/placeholder.svg?height=50&width=50",
      level: 43,
      posts: 156,
      helpfulAnswers: 134,
      reputation: 3245,
      badges: ["🤝", "📚", "🌟"],
      speciality: "初心者サポート",
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "質問":
        return "bg-blue-500/20 text-blue-300"
      case "雑談":
        return "bg-green-500/20 text-green-300"
      case "攻略":
        return "bg-purple-500/20 text-purple-300"
      case "ガイド":
        return "bg-orange-500/20 text-orange-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground variant="waves" />
      <FloatingElements />

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0"
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
              <Link href="/community" className="text-white font-medium">
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
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            ゲーマー
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              コミュニティ
            </span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            世界中のゲーマーと繋がり、知識を共有し、一緒に成長しましょう
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { label: "アクティブメンバー", value: "25,000+", icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "今日の投稿", value: "156", icon: MessageCircle, color: "from-green-500 to-emerald-500" },
            { label: "解決済み質問", value: "8,900", icon: Target, color: "from-purple-500 to-pink-500" },
            { label: "開催イベント", value: "45", icon: Calendar, color: "from-yellow-500 to-orange-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TabsList className="bg-white/5 border-white/10">
                  <TabsTrigger value="discussions" className="data-[state=active]:bg-white/10 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    ディスカッション
                  </TabsTrigger>
                  <TabsTrigger value="events" className="data-[state=active]:bg-white/10 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    イベント
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="data-[state=active]:bg-white/10 text-white">
                    <Star className="w-4 h-4 mr-2" />
                    ガイド
                  </TabsTrigger>
                </TabsList>

                <GradientButton icon={<Plus className="w-4 h-4" />} size="sm">
                  新規投稿
                </GradientButton>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="コミュニティを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                />
              </div>

              <TabsContent value="discussions" className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MagneticElement>
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={discussion.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {discussion.pinned && <Pin className="w-4 h-4 text-yellow-400" />}
                                  <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors cursor-pointer">
                                    {discussion.title}
                                  </h3>
                                  {discussion.solved && (
                                    <Badge className="bg-green-500/20 text-green-300 text-xs">解決済み</Badge>
                                  )}
                                </div>
                                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>

                              <p className="text-white/80 mb-3 line-clamp-2">{discussion.content}</p>

                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={getCategoryColor(discussion.category)}>{discussion.category}</Badge>
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-white/20 text-white/60 text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-white/60">
                                  <span className="flex items-center gap-1">
                                    <span className="font-medium text-white/80">{discussion.author}</span>
                                    <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                                      Lv.{discussion.authorLevel}
                                    </Badge>
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {discussion.createdAt}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-white/60">
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {discussion.views}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {discussion.likes}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Reply className="w-3 h-3" />
                                    {discussion.replies}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </MagneticElement>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MagneticElement>
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                              <p className="text-white/80 mb-3">{event.description}</p>
                            </div>
                            <Badge
                              className={`${event.status === "募集中" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"}`}
                            >
                              {event.status}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-white/80">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {event.date} {event.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-white/80">
                                <GamepadIcon className="w-4 h-4" />
                                <span>{event.game}</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/80">
                                <Trophy className="w-4 h-4" />
                                <span>賞品: {event.prize}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-white/80">
                                <Users className="w-4 h-4" />
                                <span>
                                  {event.participants}/{event.maxParticipants} 参加者
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                  style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                              参加する
                            </Button>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              詳細を見る
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </MagneticElement>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="guides" className="space-y-4">
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">コミュニティガイド</h3>
                  <p className="text-white/70 mb-6">近日公開予定です。お楽しみに！</p>
                  <GradientButton>ガイドを作成する</GradientButton>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Top Contributors */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    トップコントリビューター
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <motion.div
                      key={contributor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1">
                          {index + 1}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-white font-medium text-sm truncate">{contributor.name}</span>
                          <div className="flex gap-1">
                            {contributor.badges.map((badge, badgeIndex) => (
                              <span key={badgeIndex} className="text-xs">
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-white/60 text-xs mb-1">{contributor.speciality}</div>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <span>Lv.{contributor.level}</span>
                          <span>•</span>
                          <span>{contributor.reputation} pt</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Rules */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    コミュニティルール
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "相手を尊重し、建設的な議論を心がけましょう",
                    "スパムや宣伝目的の投稿は禁止です",
                    "適切なカテゴリーとタグを使用してください",
                    "個人情報の共有は避けてください",
                    "著作権を尊重し、適切な引用を行ってください",
                  ].map((rule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{rule}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">質問がありますか？</h3>
                  <p className="text-white/70 text-sm mb-4">コミュニティメンバーがあなたの質問にお答えします</p>
                  <GradientButton className="w-full">質問を投稿</GradientButton>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
