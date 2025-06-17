"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { GradientButton } from "@/components/ui/gradient-button"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import {
  Play,
  Upload,
  TrendingUp,
  Users,
  Trophy,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Target,
  Award,
  GamepadIcon,
  BarChart3,
  Settings,
  Bell,
  Plus,
} from "lucide-react"
import { useApp } from "@/lib/context/app-context"

export default function DashboardPage() {
  const { state } = useApp()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalVideos: 12,
    totalViews: 45600,
    totalLikes: 3420,
    totalComments: 890,
    rank: 1247,
    skillRating: 2850,
    winRate: 73,
    hoursPlayed: 156,
  })

  const [recentVideos] = useState([
    {
      id: "1",
      title: "完璧なガンク回避テクニック解説",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 12500,
      likes: 890,
      comments: 45,
      uploadDate: "2024-01-15",
      duration: "8:45",
      game: "League of Legends",
      status: "published",
    },
    {
      id: "2",
      title: "VALORANTエイム練習ルーティン",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 8900,
      likes: 567,
      comments: 32,
      uploadDate: "2024-01-12",
      duration: "12:30",
      game: "VALORANT",
      status: "published",
    },
    {
      id: "3",
      title: "Apex Legends ランク戦略",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 15600,
      likes: 1200,
      comments: 78,
      uploadDate: "2024-01-10",
      duration: "15:22",
      game: "Apex Legends",
      status: "published",
    },
  ])

  const [achievements] = useState([
    {
      id: 1,
      title: "初回アップロード",
      description: "最初の動画をアップロードしました",
      icon: Upload,
      unlocked: true,
      date: "2024-01-01",
    },
    {
      id: 2,
      title: "人気クリエイター",
      description: "10,000回再生を達成しました",
      icon: Eye,
      unlocked: true,
      date: "2024-01-05",
    },
    {
      id: 3,
      title: "コミュニティの星",
      description: "1,000いいねを獲得しました",
      icon: Heart,
      unlocked: true,
      date: "2024-01-08",
    },
    {
      id: 4,
      title: "ランキング入り",
      description: "トップ1500にランクインしました",
      icon: Trophy,
      unlocked: false,
      progress: 83,
    },
  ])

  const [weeklyGoals] = useState([
    {
      title: "動画アップロード",
      current: 2,
      target: 3,
      reward: "500 XP",
    },
    {
      title: "視聴時間",
      current: 45,
      target: 60,
      reward: "300 XP",
    },
    {
      title: "コメント返信",
      current: 8,
      target: 10,
      reward: "200 XP",
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground variant="gradient" />
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

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                おかえりなさい、{state.user?.username || "ゲーマー"}さん！
              </h1>
              <p className="text-white/70">今日も素晴らしいプレイを分析しましょう</p>
            </div>
            <div className="flex gap-3">
              <MagneticElement>
                <GradientButton icon={<Upload className="w-4 h-4" />} asChild>
                  <Link href="/upload">動画をアップロード</Link>
                </GradientButton>
              </MagneticElement>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "総動画数", value: stats.totalVideos, icon: Play, color: "from-blue-500 to-cyan-500" },
              {
                label: "総視聴回数",
                value: stats.totalViews.toLocaleString(),
                icon: Eye,
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "総いいね数",
                value: stats.totalLikes.toLocaleString(),
                icon: Heart,
                color: "from-red-500 to-pink-500",
              },
              { label: "現在のランク", value: `#${stats.rank}`, icon: Trophy, color: "from-yellow-500 to-orange-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
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
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              概要
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-white/10 text-white">
              <Play className="w-4 h-4 mr-2" />
              動画管理
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10 text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              分析
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white/10 text-white">
              <Award className="w-4 h-4 mr-2" />
              実績
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Weekly Goals */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      今週の目標
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weeklyGoals.map((goal, index) => (
                      <motion.div
                        key={goal.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{goal.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white/80 text-sm">
                              {goal.current}/{goal.target}
                            </span>
                            <Badge className="bg-purple-500/20 text-purple-300">{goal.reward}</Badge>
                          </div>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">クイックアクション</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "新しい動画をアップロード", href: "/upload", icon: Upload },
                      { label: "動画を見る", href: "/browse", icon: Play },
                      { label: "コミュニティに参加", href: "/community", icon: Users },
                      { label: "ランキングを確認", href: "/leaderboard", icon: Trophy },
                    ].map((action, index) => (
                      <motion.div
                        key={action.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <MagneticElement>
                          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" asChild>
                            <Link href={action.href}>
                              <action.icon className="w-4 h-4 mr-2" />
                              {action.label}
                            </Link>
                          </Button>
                        </MagneticElement>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-semibold">あなたの動画</h2>
              <GradientButton icon={<Plus className="w-4 h-4" />} asChild>
                <Link href="/upload">新しい動画</Link>
              </GradientButton>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MagneticElement>
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-40 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-lg">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">{video.duration}</Badge>
                          <Badge className="absolute top-2 left-2 bg-green-500/80 text-white">{video.status}</Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
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
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="bg-white/10 text-white/80">
                              {video.game}
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" asChild>
                                <Link href={`/video/${video.id}/edit`}>編集</Link>
                              </Button>
                              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" asChild>
                                <Link href={`/video/${video.id}`}>表示</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </MagneticElement>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">パフォーマンス統計</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      label: "スキルレーティング",
                      value: stats.skillRating,
                      max: 3000,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      label: "勝率",
                      value: stats.winRate,
                      max: 100,
                      color: "from-green-500 to-emerald-500",
                      suffix: "%",
                    },
                    {
                      label: "プレイ時間",
                      value: stats.hoursPlayed,
                      max: 200,
                      color: "from-blue-500 to-cyan-500",
                      suffix: "h",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="text-white/80">{stat.label}</span>
                        <span className="text-white font-semibold">
                          {stat.value}
                          {stat.suffix || ""}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">最近の活動</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { action: "動画をアップロード", time: "2時間前", icon: Upload },
                    { action: "コメントに返信", time: "4時間前", icon: MessageCircle },
                    { action: "ランクアップ", time: "1日前", icon: Trophy },
                    { action: "新しいフォロワー", time: "2日前", icon: Users },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{activity.action}</div>
                        <div className="text-white/60 text-xs">{activity.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MagneticElement>
                    <Card
                      className={`border backdrop-blur-sm transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              achievement.unlocked ? "bg-gradient-to-r from-yellow-500 to-orange-500" : "bg-white/10"
                            }`}
                          >
                            <achievement.icon
                              className={`w-6 h-6 ${achievement.unlocked ? "text-white" : "text-white/60"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold mb-1 ${
                                achievement.unlocked ? "text-yellow-300" : "text-white"
                              }`}
                            >
                              {achievement.title}
                            </h3>
                            <p className="text-white/70 text-sm mb-2">{achievement.description}</p>
                            {achievement.unlocked ? (
                              <div className="text-yellow-400 text-xs">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {achievement.date}
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="text-white/60 text-xs">進捗: {achievement.progress}%</div>
                                <Progress value={achievement.progress} className="h-1" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </MagneticElement>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
