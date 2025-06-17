"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { GradientButton } from "@/components/ui/gradient-button"
import { AnimatedBackground } from "@/components/animations/animated-background"
import { XCircle, ArrowLeft, CreditCard } from "lucide-react"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <AnimatedBackground variant="waves" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">お支払いがキャンセルされました</h1>
            <p className="text-white/80 text-lg">お支払い処理が中断されました。いつでも再度お試しいただけます。</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <h2 className="text-white font-semibold mb-4">お困りですか？</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">複数の支払い方法をご利用いただけます</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">セキュアな決済システムで安全にお支払い</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">24時間サポートでお手伝いします</span>
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
            <GradientButton size="lg" icon={<CreditCard className="w-4 h-4" />} asChild>
              <Link href="/upload">再度お支払い</Link>
            </GradientButton>
            <GradientButton variant="secondary" size="lg" icon={<ArrowLeft className="w-4 h-4" />} asChild>
              <Link href="/dashboard">ダッシュボードに戻る</Link>
            </GradientButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
