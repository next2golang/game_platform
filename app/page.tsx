"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { GradientButton, ModernButton } from "@/components/ui/gradient-button"
import { MagneticCursor, MagneticElement } from "@/components/animations/magnetic-cursor"
import { ParticleSystem } from "@/components/animations/particle-system"
import {
  Play,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Star,
  TrendingUp,
  Eye,
  GamepadIcon,
  Shield,
  Target,
  Crosshair,
  Upload,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [showParticles, setShowParticles] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [featuredVideos] = useState([
    {
      id: 1,
      title: "プロが教える完璧なエイムテクニック",
      author: "FPS_Master_JP",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: "125K",
      duration: "12:34",
      game: "VALORANT",
      verified: true,
    },
    {
      id: 2,
      title: "LoL世界大会優勝チームの戦術分析",
      author: "eSports_Analyst",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: "89K",
      duration: "18:45",
      game: "League of Legends",
      verified: true,
    },
    {
      id: 3,
      title: "Apex Legends ランク1位の立ち回り",
      author: "Apex_Legend_Pro",
      thumbnail: "/placeholder.svg?height=200&width=350",
      views: "67K",
      duration: "15:22",
      game: "Apex Legends",
      verified: true,
    },
  ])

  const heroTexts = ["分析", "共有", "上達", "勝利"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <MagneticCursor />
      <ParticleSystem trigger={showParticles} />
      <AnimatedBackground variant="gaming" />
      <FloatingElements />

      {/* Header */}
      <motion.header
        className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <MagneticElement>
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <GamepadIcon className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <motion.span className="text-xl font-bold text-white" whileHover={{ scale: 1.05 }}>
                    GameAnalyzer Pro
                  </motion.span>
                  <div className="text-xs text-purple-400">ゲーミング分析プラットフォーム</div>
                </div>
              </Link>
            </MagneticElement>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: "動画を見る", href: "/browse", icon: Play },
                { name: "アップロード", href: "/upload", icon: Upload },
                { name: "コミュニティ", href: "/community", icon: Users },
                { name: "ランキング", href: "/leaderboard", icon: Trophy },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <MagneticElement strength={0.2}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-white/80 hover:text-white transition-colors relative group px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </MagneticElement>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ModernButton variant="outline" size="md" asChild>
                    <Link href="/login">ログイン</Link>
                  </ModernButton>
                </motion.div>
              </MagneticElement>
              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GradientButton
                    size="md"
                    onClick={() => setShowParticles(true)}
                    icon={<Sparkles className="w-4 h-4" />}
                    asChild
                  >
                    <Link href="/register">無料で始める</Link>
                  </GradientButton>
                </motion.div>
              </MagneticElement>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  日本No.1ゲーミング分析
                </Badge>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  プレイを
                </motion.span>
                <br />
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: -90 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  {heroTexts[currentText]}
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  して勝利へ
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              AIを活用したゲームプレイ分析で、あなたのスキルを次のレベルへ。
              <br />
              プロゲーマーと同じ視点で戦略を学び、ランクアップを実現しましょう。
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GradientButton
                    size="lg"
                    onClick={() => setShowParticles(true)}
                    icon={<ArrowRight className="w-5 h-5" />}
                    asChild
                  >
                    <Link href="/register">今すぐ無料で始める</Link>
                  </GradientButton>
                </motion.div>
              </MagneticElement>

              <MagneticElement>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ModernButton variant="outline" size="lg" icon={<Play className="w-5 h-5" />} asChild>
                    <Link href="/browse">デモを見る</Link>
                  </ModernButton>
                </motion.div>
              </MagneticElement>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">50,000+ ユーザー</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span className="text-sm">100万+ 分析済み</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="text-sm">4.9/5 評価</span>
              </div>
            </motion.div>
          </div>

          {/* Featured Videos */}
          <div className="space-y-4">
            <motion.h3
              className="text-white font-semibold mb-4 flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <TrendingUp className="w-5 h-5 text-purple-400" />
              注目の分析動画
            </motion.h3>
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <MagneticElement>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="relative">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                          <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1">
                            {video.duration}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white/60 text-xs">{video.author}</span>
                            {video.verified && <Shield className="w-3 h-3 text-blue-400" />}
                          </div>
                          <div className="flex items-center gap-3 text-white/60 text-xs">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {video.views}
                            </span>
                            <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs">
                              {video.game}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MagneticElement>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">なぜGameAnalyzer Proが選ばれるのか</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            最新のAI技術と豊富な機能で、あなたのゲーミングライフを革新します
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Target,
              title: "AI分析エンジン",
              description: "最新のAIがあなたのプレイを詳細分析し、改善点を具体的に提案",
              features: ["リアルタイム分析", "パフォーマンス予測", "カスタム提案"],
              gradient: "from-blue-500 to-cyan-500",
              delay: 0,
            },
            {
              icon: Users,
              title: "プロコミュニティ",
              description: "プロゲーマーや上級者と直接交流し、実戦的なアドバイスを受け取り",
              features: ["プロ認証システム", "メンタリング機能", "チーム募集"],
              gradient: "from-green-500 to-emerald-500",
              delay: 0.1,
            },
            {
              icon: Trophy,
              title: "競技システム",
              description: "リアルタイムランキングと大会システムで競技性を追求",
              features: ["グローバルランキング", "トーナメント", "賞金システム"],
              gradient: "from-yellow-500 to-orange-500",
              delay: 0.2,
            },
            {
              icon: Crosshair,
              title: "専門ツール",
              description: "ゲーム別の専門分析ツールで詳細なパフォーマンス向上を実現",
              features: ["エイム分析", "戦術ボード", "統計ダッシュボード"],
              gradient: "from-purple-500 to-pink-500",
              delay: 0.3,
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
              }}
            >
              <MagneticElement>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-white/70 mb-4 text-sm leading-relaxed">{feature.description}</p>

                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          className="text-white/60 text-sm flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: feature.delay + itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div className="w-1.5 h-1.5 bg-purple-400 rounded-full" whileHover={{ scale: 2 }} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MagneticElement>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-white/10 backdrop-blur-sm p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: "アクティブユーザー", value: "50,000+", icon: Users },
              { label: "分析済み動画", value: "1M+", icon: Play },
              { label: "スキル向上率", value: "89%", icon: TrendingUp },
              { label: "満足度", value: "4.9/5", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">今すぐ始めて、明日から違いを実感しよう</h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            無料アカウント作成で、すべての基本機能をご利用いただけます。
            <br />
            プロ機能は30日間無料でお試しください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <GradientButton
                  size="lg"
                  onClick={() => setShowParticles(true)}
                  icon={<Sparkles className="w-5 h-5" />}
                  asChild
                >
                  <Link href="/register">無料で始める</Link>
                </GradientButton>
              </motion.div>
            </MagneticElement>

            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ModernButton variant="outline" size="lg" icon={<Play className="w-5 h-5" />} asChild>
                  <Link href="/browse">デモを見る</Link>
                </ModernButton>
              </motion.div>
            </MagneticElement>
          </div>

          <p className="text-white/60 text-sm">クレジットカード不要 • いつでもキャンセル可能 • 30日間返金保証</p>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <GamepadIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold">GameAnalyzer Pro</span>
              </div>
              <p className="text-white/60 text-sm mb-4">次世代ゲーミング分析プラットフォーム</p>
              <div className="flex gap-2">
                {["Twitter", "Discord", "YouTube"].map((social) => (
                  <MagneticElement key={social} strength={0.1}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <span className="text-white/60 text-xs">{social[0]}</span>
                    </motion.div>
                  </MagneticElement>
                ))}
              </div>
            </div>

            {[
              {
                title: "プラットフォーム",
                links: ["動画分析", "コミュニティ", "ランキング", "トーナメント"],
              },
              {
                title: "サポート",
                links: ["ヘルプセンター", "お問い合わせ", "API", "開発者向け"],
              },
              {
                title: "会社情報",
                links: ["利用規約", "プライバシーポリシー", "会社概要", "採用情報"],
              },
            ].map((section, index) => (
              <div key={section.title}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <MagneticElement strength={0.1}>
                        <motion.a
                          href="#"
                          className="text-white/60 hover:text-white text-sm transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {link}
                        </motion.a>
                      </MagneticElement>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">© 2024 GameAnalyzer Pro. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-white/60 text-sm">Made with ❤️ in Japan</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
