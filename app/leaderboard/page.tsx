"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagneticElement } from "@/components/animations/magnetic-cursor"
import {
  Trophy,
  Crown,
  Medal,
  Star,
  TrendingUp,
  Users,
  GamepadIcon,
  Shield,
  Target,
  Award,
  Flame,
  Calendar,
} from "lucide-react"

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [selectedGame, setSelectedGame] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("overall")

  const [leaderboards] = useState({
    overall: [
      {
        rank: 1,
        user: "ProGamer_Legend",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 15420,
        change: "+156",
        verified: true,
        country: "JP",
        videos: 89,
        totalViews: "2.1M",
        totalLikes: "156K",
        winRate: "94%",
        mainGame: "League of Legends",
        tier: "Challenger",
        badges: ["🏆", "⭐", "🔥"],
      },
      {
        rank: 2,
        user: "AimBot_Master",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 14890,
        change: "+89",
        verified: true,
        country: "KR",
        videos: 67,
        totalViews: "1.8M",
        totalLikes: "134K",
        winRate: "91%",
        mainGame: "VALORANT",
        tier: "Radiant",
        badges: ["🥈", "🎯", "⚡"],
      },
      {
        rank: 3,
        user: "Tactical_Genius",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 13560,
        change: "+234",
        verified: false,
        country: "US",
        videos: 45,
        totalViews: "1.2M",
        totalLikes: "98K",
        winRate: "88%",
        mainGame: "CS2",
        tier: "Global Elite",
        badges: ["🥉", "🧠", "💎"],
      },
      {
        rank: 4,
        user: "Apex_Predator",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 12340,
        change: "-45",
        verified: true,
        country: "BR",
        videos: 78,
        totalViews: "980K",
        totalLikes: "87K",
        winRate: "85%",
        mainGame: "Apex Legends",
        tier: "Predator",
        badges: ["4️⃣", "🦅", "🌟"],
      },
      {
        rank: 5,
        user: "Tank_Commander",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 11890,
        change: "+67",
        verified: true,
        country: "DE",
        videos: 56,
        totalViews: "756K",
        totalLikes: "76K",
        winRate: "82%",
        mainGame: "Overwatch 2",
        tier: "Grandmaster",
        badges: ["5️⃣", "🛡️", "💪"],
      },
    ],
    creators: [
      {
        rank: 1,
        user: "Content_King",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 25600,
        change: "+456",
        verified: true,
        country: "JP",
        videos: 234,
        totalViews: "5.6M",
        totalLikes: "456K",
        subscribers: "89K",
        avgViews: "24K",
        uploadFreq: "Daily",
      },
      {
        rank: 2,
        user: "Tutorial_Master",
        avatar: "/placeholder.svg?height=40&width=40",
        points: 23400,
        change: "+234",
        verified: true,
        country: "US",
        videos: 189,
        totalViews: "4.2M",
        totalLikes: "234K",
        subscribers: "67K",
        avgViews: "22K",
        uploadFreq: "3x/week",
      },
    ],
    games: {
      "League of Legends": [
        {
          rank: 1,
          user: "LoL_Emperor",
          avatar: "/placeholder.svg?height=40&width=40",
          points: 18900,
          tier: "Challenger",
          winRate: "96%",
          mainRole: "Mid",
          kda: "3.2",
        },
      ],
      VALORANT: [
        {
          rank: 1,
          user: "Radiant_Ace",
          avatar: "/placeholder.svg?height=40&width=40",
          points: 17800,
          tier: "Radiant",
          winRate: "93%",
          mainAgent: "Jett",
          adr: "245",
        },
      ],
    },
  })

  const [stats] = useState({
    totalPlayers: "2.5M+",
    activeToday: "156K",
    totalMatches: "45M+",
    avgSkillGain: "+15%",
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="text-white/60 font-bold text-lg">{rank}</span>
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-400"
    if (change.startsWith("-")) return "text-red-400"
    return "text-white/60"
  }

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
              <Link href="/browse" className="text-white/80 hover:text-white transition-colors">
                動画を見る
              </Link>
              <Link href="/upload" className="text-white/80 hover:text-white transition-colors">
                アップロード
              </Link>
              <Link href="/community" className="text-white/80 hover:text-white transition-colors">
                コミュニティ
              </Link>
              <Link href="/leaderboard" className="text-white font-medium">
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
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">グローバルランキング</h1>
          </div>
          <p className="text-white/70 text-lg">世界中のプレイヤーと競い合い、スキルを証明しよう</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { label: "総プレイヤー数", value: stats.totalPlayers, icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "今日のアクティブ", value: stats.activeToday, icon: Flame, color: "from-red-500 to-orange-500" },
            { label: "総マッチ数", value: stats.totalMatches, icon: Target, color: "from-green-500 to-emerald-500" },
            {
              label: "平均スキル向上",
              value: stats.avgSkillGain,
              icon: TrendingUp,
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="daily" className="text-white">
                今日
              </SelectItem>
              <SelectItem value="weekly" className="text-white">
                今週
              </SelectItem>
              <SelectItem value="monthly" className="text-white">
                今月
              </SelectItem>
              <SelectItem value="alltime" className="text-white">
                全期間
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <GamepadIcon className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">
                すべてのゲーム
              </SelectItem>
              <SelectItem value="lol" className="text-white">
                League of Legends
              </SelectItem>
              <SelectItem value="valorant" className="text-white">
                VALORANT
              </SelectItem>
              <SelectItem value="apex" className="text-white">
                Apex Legends
              </SelectItem>
              <SelectItem value="overwatch" className="text-white">
                Overwatch 2
              </SelectItem>
              <SelectItem value="cs2" className="text-white">
                CS2
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <Trophy className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="overall" className="text-white">
                総合
              </SelectItem>
              <SelectItem value="creators" className="text-white">
                クリエイター
              </SelectItem>
              <SelectItem value="analysts" className="text-white">
                アナリスト
              </SelectItem>
              <SelectItem value="viewers" className="text-white">
                視聴者
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overall" className="space-y-6">
              <TabsList className="bg-white/5 border-white/10">
                <TabsTrigger value="overall" className="data-[state=active]:bg-white/10 text-white">
                  <Trophy className="w-4 h-4 mr-2" />
                  総合ランキング
                </TabsTrigger>
                <TabsTrigger value="creators" className="data-[state=active]:bg-white/10 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  クリエイター
                </TabsTrigger>
                <TabsTrigger value="games" className="data-[state=active]:bg-white/10 text-white">
                  <GamepadIcon className="w-4 h-4 mr-2" />
                  ゲーム別
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overall" className="space-y-4">
                {leaderboards.overall.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <MagneticElement>
                      <Card
                        className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${
                          player.rank <= 3
                            ? "border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-transparent"
                            : ""
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            {/* Rank */}
                            <div className="flex items-center justify-center w-12 h-12">{getRankIcon(player.rank)}</div>

                            {/* Avatar and Info */}
                            <div className="flex items-center gap-3 flex-1">
                              <Avatar className="w-12 h-12 border-2 border-white/20">
                                <AvatarImage src={player.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{player.user[0]}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-white font-semibold">{player.user}</h3>
                                  {player.verified && <Shield className="w-4 h-4 text-blue-400" />}
                                  <Badge className="bg-white/10 text-white/80 text-xs">{player.country}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/60">
                                  <span>{player.mainGame}</span>
                                  <span>{player.tier}</span>
                                  <span>勝率: {player.winRate}</span>
                                </div>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="hidden md:flex items-center gap-6 text-sm">
                              <div className="text-center">
                                <div className="text-white font-semibold">{player.videos}</div>
                                <div className="text-white/60">動画</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white font-semibold">{player.totalViews}</div>
                                <div className="text-white/60">視聴</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white font-semibold">{player.totalLikes}</div>
                                <div className="text-white/60">いいね</div>
                              </div>
                            </div>

                            {/* Points and Change */}
                            <div className="text-right">
                              <div className="text-xl font-bold text-white mb-1">{player.points.toLocaleString()}</div>
                              <div className={`text-sm font-medium ${getChangeColor(player.change)}`}>
                                {player.change}
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-1">
                              {player.badges.map((badge, badgeIndex) => (
                                <span key={badgeIndex} className="text-lg">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </MagneticElement>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="creators" className="space-y-4">
                {leaderboards.creators.map((creator, index) => (
                  <motion.div
                    key={creator.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <MagneticElement>
                      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12">
                              {getRankIcon(creator.rank)}
                            </div>

                            <div className="flex items-center gap-3 flex-1">
                              <Avatar className="w-12 h-12 border-2 border-white/20">
                                <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{creator.user[0]}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-white font-semibold">{creator.user}</h3>
                                  {creator.verified && <Shield className="w-4 h-4 text-blue-400" />}
                                  <Badge className="bg-white/10 text-white/80 text-xs">{creator.country}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/60">
                                  <span>{creator.subscribers} 登録者</span>
                                  <span>平均: {creator.avgViews}</span>
                                  <span>{creator.uploadFreq}</span>
                                </div>
                              </div>
                            </div>

                            <div className="hidden md:flex items-center gap-6 text-sm">
                              <div className="text-center">
                                <div className="text-white font-semibold">{creator.videos}</div>
                                <div className="text-white/60">動画</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white font-semibold">{creator.totalViews}</div>
                                <div className="text-white/60">総視聴</div>
                              </div>
                              <div className="text-center">
                                <div className="text-white font-semibold">{creator.totalLikes}</div>
                                <div className="text-white/60">総いいね</div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold text-white mb-1">{creator.points.toLocaleString()}</div>
                              <div className={`text-sm font-medium ${getChangeColor(creator.change)}`}>
                                {creator.change}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </MagneticElement>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="games" className="space-y-6">
                {Object.entries(leaderboards.games).map(([game, players]) => (
                  <motion.div
                    key={game}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                          <GamepadIcon className="w-5 h-5 text-purple-400" />
                          {game}
                        </h3>
                        <div className="space-y-3">
                          {players.map((player, index) => (
                            <div key={player.rank} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                              <div className="flex items-center justify-center w-8 h-8">{getRankIcon(player.rank)}</div>
                              <Avatar className="w-10 h-10 border border-white/20">
                                <AvatarImage src={player.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{player.user[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="text-white font-medium">{player.user}</h4>
                                <div className="flex items-center gap-3 text-sm text-white/60">
                                  <span>{player.tier}</span>
                                  <span>勝率: {player.winRate}</span>
                                  {player.mainRole && <span>{player.mainRole}</span>}
                                  {player.mainAgent && <span>{player.mainAgent}</span>}
                                  {player.kda && <span>KDA: {player.kda}</span>}
                                  {player.adr && <span>ADR: {player.adr}</span>}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-white">{player.points.toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
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
            {/* Your Rank */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    あなたのランク
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">#1,234</div>
                    <p className="text-white/80 text-sm mb-4">グローバルランキング</p>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      asChild
                    >
                      <Link href="/dashboard">詳細を見る</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    今月の実績
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "連続ログイン", progress: 15, max: 30, reward: "100pt" },
                      { title: "動画投稿", progress: 3, max: 5, reward: "500pt" },
                      { title: "いいね獲得", progress: 89, max: 100, reward: "200pt" },
                    ].map((achievement, index) => (
                      <div key={achievement.title} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/80">{achievement.title}</span>
                          <span className="text-purple-400">{achievement.reward}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(achievement.progress / achievement.max) * 100}%` }}
                            transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-white/60">
                          <span>{achievement.progress}</span>
                          <span>{achievement.max}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rewards */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    報酬
                  </h3>
                  <div className="space-y-3">
                    {[
                      { rank: "Top 100", reward: "限定バッジ", color: "text-yellow-400" },
                      { rank: "Top 500", reward: "プレミアム1ヶ月", color: "text-purple-400" },
                      { rank: "Top 1000", reward: "特別称号", color: "text-blue-400" },
                    ].map((reward, index) => (
                      <div key={reward.rank} className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-white/80 text-sm">{reward.rank}</span>
                        <span className={`text-sm font-medium ${reward.color}`}>{reward.reward}</span>
                      </div>
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
