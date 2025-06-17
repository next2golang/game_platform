"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { GradientButton } from "@/components/ui/gradient-button"
import { AnimatedBackground, FloatingElements } from "@/components/animations/animated-background"
import { CheckCircle, Download, Share2, Star } from "lucide-react"

export default function PaymentSuccessPage() {
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    setConfetti(true)
    const timer = setTimeout(() => setConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <AnimatedBackground variant="gaming" />
      <FloatingElements />

      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">お支払い完了！</h1>
            <p className="text-white/80 text-lg">ありがとうございます。お支払いが正常に処理されました。</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <h2 className="text-white font-semibold mb-4">次のステップ</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white/80">アカウントがアップグレードされました</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white/80">プレミアム機能が利用可能になりました</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white/80">領収書をメールで送信しました</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GradientButton size="lg" icon={<Download className="w-4 h-4" />} asChild>
              <Link href="/dashboard">ダッシュボードへ</Link>
            </GradientButton>
            <GradientButton
              variant="secondary"
              size="lg"
              icon={<Share2 className="w-4 h-4" />}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "GameAnalyzer Pro",
                    text: "ゲーム分析プラットフォームでプレミアム機能を利用中！",
                    url: window.location.origin,
                  })
                }
              }}
            >
              シェア
            </GradientButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-white/60 text-sm mb-4">ご不明な点がございましたら、お気軽にお問い合わせください。</p>
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-white/80 text-sm ml-2">お客様満足度 4.9/5</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
