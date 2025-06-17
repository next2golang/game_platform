"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedCard, Block3D } from "@/components/ui/animated-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/animations/animated-button"
import { CursorTrail, CursorAttract } from "@/components/animations/cursor-effects"
import { Play, Upload, Heart, MessageCircle, Share2, Trophy, Settings, LogOut, TrendingUp, Eye } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalVideos: 12,
    totalLikes: 156,
    totalViews: 2340,
    weeklyGrowth: 15,
  })

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/login")
    }
  }, [state.isAuthenticated, router])

  if (!state.isAuthenticated || !state.user) {
    return null
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <CursorTrail />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-10"
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
          <CursorAttract>
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
          </CursorAttract>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "動画を見る", href: "/browse" },
              { name: "アップロード", href: "/upload" },
              { name: "コミュニティ", href: "/community" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link href={item.href} className="text-white/80 hover:text-white transition-colors relative group">
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </motion.div>
            <CursorAttract>
              <Avatar className="w-8 h-8 border border-white/20">
                <AvatarImage src={state.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{state.user.username[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </CursorAttract>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Block3D>
              <div className="text-center">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-purple-500">
                    <AvatarImage src={state.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {state.user.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <h2 className="text-white text-xl font-bold mb-2">{state.user.username}</h2>
                <p className="text-white/70 mb-2">
                  {state.user.favoriteGame} • {state.user.role}
                </p>

                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-4">
                    <Trophy className="w-3 h-3 mr-1" />
                    {state.user.rank}
                  </Badge>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  {[
                    { label: "動画", value: stats.totalVideos },
                    { label: "いいね", value: stats.totalLikes },
                    { label: "再生数", value: stats.totalViews },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <AnimatedButton className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Link href="/upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    動画をアップロード
                  </Link>
                </AnimatedButton>
              </div>
            </Block3D>

            {/* Weekly Growth */}
            <AnimatedCard delay={0.3} className="mt-6">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <h3 className="text-white font-semibold">週間成長</h3>
                </div>
                <div className="text-2xl font-bold text-green-400 mb-1">+{stats.weeklyGrowth}%</div>
                <p className="text-white/60 text-sm">先週比でいいね数が増加</p>
              </div>
            </AnimatedCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="videos" className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <TabsList className="bg-white/5 border-white/10">
                  <TabsTrigger value="videos" className="data-[state=active]:bg-white/10 text-white">
                    マイ動画
                  </TabsTrigger>
                  <TabsTrigger value="liked" className="data-[state=active]:bg-white/10 text-white">
                    いいねした動画
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10 text-white">
                    分析データ
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="videos" className="space-y-6">
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white">アップロードした動画</h2>
                  <AnimatedButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Link href="/upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      新しい動画
                    </Link>
                  </AnimatedButton>
                </motion.div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {state.videos.slice(0, 6).map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <CursorAttract>
                        <AnimatedCard>
                          <div className="relative overflow-hidden">
                            <img
                              src={video.thumbnail || "/placeholder.svg?height=120&width=200"}
                              alt={video.title}
                              className="w-full h-32 object-cover"
                            />
                            <motion.div
                              className="absolute inset-0 bg-black/40 opacity-0 flex items-center justify-center"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex gap-2">
                                <Button size="sm" variant="secondary" asChild>
                                  <Link href={`/video/${video.id}`}>
                                    <Play className="w-3 h-3 mr-1" />
                                    再生
                                  </Link>
                                </Button>
                                <Button size="sm" variant="secondary" asChild>
                                  <Link href={`/video/${video.id}/edit`}>
                                    <Settings className="w-3 h-3 mr-1" />
                                    編集
                                  </Link>
                                </Button>
                              </div>
                            </motion.div>
                            <Badge className="absolute top-2 right-2 bg-black/60 text-white text-xs">
                              {video.duration}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                            <p className="text-sm text-white/60 mb-3">{video.game}</p>
                            <div className="flex items-center justify-between text-xs text-white/60">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {video.views}
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
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white/60 hover:text-white p-1"
                              >
                                <Share2 className="w-3 h-3" />
                              </motion.button>
                            </div>
                          </div>
                        </AnimatedCard>
                      </CursorAttract>
                    </motion.div>
                  ))}
                </div>

                {state.videos.length === 0 && (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">まだ動画をアップロードしていません</p>
                    <AnimatedButton className="bg-gradient-to-r from-purple-500 to-pink-500">
                      <Link href="/upload">最初の動画をアップロード</Link>
                    </AnimatedButton>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="liked" className="space-y-6">
                <motion.h2
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  いいねした動画
                </motion.h2>
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Heart className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">まだいいねした動画がありません</p>
                  <AnimatedButton variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Link href="/browse">動画を探す</Link>
                  </AnimatedButton>
                </motion.div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <motion.h2
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  分析データ
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "総再生時間",
                      value: "24.5時間",
                      change: "+15%",
                      icon: Play,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "平均エンゲージメント",
                      value: "8.2%",
                      change: "業界平均 6.5%",
                      icon: TrendingUp,
                      color: "from-green-500 to-emerald-500",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Block3D>
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                          >
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{stat.title}</h3>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <p className="text-white/60 text-sm">{stat.change}</p>
                          </div>
                        </div>
                      </Block3D>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
