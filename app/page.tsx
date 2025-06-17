"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MagneticCursor, MagneticElement } from "@/components/animations/magnetic-cursor"
import { ParticleSystem } from "@/components/animations/particle-system"
import { Play, Users, Trophy, Zap, ArrowRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [showParticles, setShowParticles] = useState(false)
  const [currentText, setCurrentText] = useState(0)

  const heroTexts = ["可視化", "分析", "共有", "上達"]

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

      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
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
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <MagneticElement>
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Play className="w-4 h-4 text-white" />
              </motion.div>
              <motion.span className="text-xl font-bold text-white" whileHover={{ scale: 1.05 }}>
                GameAnalyzer
              </motion.span>
            </Link>
          </MagneticElement>

          <nav className="hidden md:flex items-center gap-6">
            {["動画を見る", "アップロード", "コミュニティ"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <MagneticElement strength={0.2}>
                  <Link
                    href={`/${item === "動画を見る" ? "browse" : item === "アップロード" ? "upload" : "community"}`}
                    className="text-white/80 hover:text-white transition-colors relative group"
                  >
                    {item}
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
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 hover:bg-white/10 px-6 py-2 h-auto text-fuchsia-600"
                  asChild
                >
                  <Link href="/login">ログイン</Link>
                </Button>
              </motion.div>
            </MagneticElement>
            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-2 h-auto relative overflow-hidden"
                  onClick={() => setShowParticles(true)}
                  asChild
                >
                  <Link href="/register">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">新規登録</span>
                  </Link>
                </Button>
              </motion.div>
            </MagneticElement>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                ゲームスキルを
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
                して上達
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-white/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            プレイ動画にインタラクティブな分析を追加し、戦略的思考を共有。
            <br />
            コミュニティと一緒に成長しましょう。
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3 h-auto relative overflow-hidden"
                  onClick={() => setShowParticles(true)}
                  asChild
                >
                  <Link href="/register">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      今すぐ始める
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </MagneticElement>

            <MagneticElement>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 hover:bg-white/10 text-lg px-8 py-3 h-auto relative overflow-hidden text-fuchsia-600"
                  asChild
                >
                  <Link href="/browse">
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      サンプルを見る
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </MagneticElement>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">主な機能</h2>
          <p className="text-white/80 text-lg">ゲーマーのための革新的な学習プラットフォーム</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "インタラクティブ分析",
              description: "動画に視界範囲、危険ゾーン、移動経路を描画して戦略を可視化",
              features: ["思考ポイントマーカー", "リアルタイム描画ツール", "スロー再生・コマ送り"],
              gradient: "from-blue-500 to-cyan-500",
              delay: 0,
            },
            {
              icon: Users,
              title: "コミュニティ",
              description: "他のプレイヤーと分析を共有し、フィードバックを受け取る",
              features: ["いいね・コメント機能", "SNS共有", "検索・タグ機能"],
              gradient: "from-green-500 to-emerald-500",
              delay: 0.2,
            },
            {
              icon: Trophy,
              title: "ランキング",
              description: "優秀な分析をランキングで表彰し、モチベーションを向上",
              features: ["デイリー・ウィークリー", "ゲーム別ランキング", "バッジシステム"],
              gradient: "from-yellow-500 to-orange-500",
              delay: 0.4,
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
                      className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/70 mb-4">{feature.description}</p>

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
                          <motion.div className="w-1 h-1 bg-purple-400 rounded-full" whileHover={{ scale: 3 }} />
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

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">今すぐスキルアップを始めよう</h2>
          <p className="text-white/80 text-lg mb-8">無料でアカウントを作成して、あなたのプレイを分析・共有しましょう</p>

          <MagneticElement>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3 h-auto relative overflow-hidden"
                onClick={() => setShowParticles(true)}
                asChild
              >
                <Link href="/register">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    無料で始める
                  </span>
                </Link>
              </Button>
            </motion.div>
          </MagneticElement>
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <motion.div
                className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Play className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-white font-semibold">GameAnalyzer</span>
            </div>
            <div className="flex gap-6 text-white/60 text-sm">
              {["利用規約", "プライバシーポリシー", "お問い合わせ"].map((item, index) => (
                <MagneticElement key={item} strength={0.1}>
                  <motion.div whileHover={{ scale: 1.05, color: "#ffffff" }} transition={{ duration: 0.2 }}>
                    <Link href={`/${item.replace(/\s+/g, "-").toLowerCase()}`}>{item}</Link>
                  </motion.div>
                </MagneticElement>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
