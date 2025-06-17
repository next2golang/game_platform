"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, ArrowLeft, Sparkles, User, Mail, Lock, Gamepad2 } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { dispatch } = useApp()
  const router = useRouter()
  const [showFireworks, setShowFireworks] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteGame: "",
    role: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        favoriteGame: formData.favoriteGame,
        role: formData.role,
        totalVideos: 0,
        totalLikes: 0,
        totalViews: 0,
        rank: "Bronze I",
      }

      dispatch({ type: "SET_USER", payload: newUser })
      setShowFireworks(true)

      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Cursor Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Simple animated particles */}
        <motion.div
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
          animate={{
            x: [0, 100, 200, 100, 0],
            y: [0, 50, 100, 150, 200],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-40"
          animate={{
            x: [200, 300, 400, 300, 200],
            y: [100, 150, 200, 250, 300],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 2,
          }}
        />
      </div>

      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ["#ff0080", "#00ff80", "#8000ff", "#ff8000", "#0080ff"][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 0,
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 group">
                <ArrowLeft className="w-4 h-4" />
                ホームに戻る
              </Link>
            </motion.div>

            <div className="flex items-center justify-center gap-2 mb-4">
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
            </div>

            <motion.h1
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              アカウント作成
            </motion.h1>
            <motion.p
              className="text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ゲームスキル向上の旅を始めましょう
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
            }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h2 className="text-white text-lg font-semibold">新規登録</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Label htmlFor="username" className="text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      ユーザー名
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="あなたのユーザー名"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-colors"
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Label htmlFor="email" className="text-white flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      メールアドレス
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-colors"
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <Label htmlFor="password" className="text-white flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      パスワード
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="8文字以上のパスワード"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-colors"
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <Label htmlFor="confirmPassword" className="text-white flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      パスワード確認
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="パスワードを再入力"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 transition-colors"
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Label htmlFor="favoriteGame" className="text-white flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      得意なゲーム
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, favoriteGame: value })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400">
                        <SelectValue placeholder="ゲームを選択" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="lol" className="text-white hover:bg-slate-700">
                          League of Legends
                        </SelectItem>
                        <SelectItem value="valorant" className="text-white hover:bg-slate-700">
                          VALORANT
                        </SelectItem>
                        <SelectItem value="apex" className="text-white hover:bg-slate-700">
                          Apex Legends
                        </SelectItem>
                        <SelectItem value="overwatch" className="text-white hover:bg-slate-700">
                          Overwatch 2
                        </SelectItem>
                        <SelectItem value="csgo" className="text-white hover:bg-slate-700">
                          CS2
                        </SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-slate-700">
                          その他
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <Label htmlFor="role" className="text-white">
                      得意なロール/ポジション
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400">
                        <SelectValue placeholder="ロールを選択" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="top" className="text-white hover:bg-slate-700">
                          Top/Tank
                        </SelectItem>
                        <SelectItem value="jungle" className="text-white hover:bg-slate-700">
                          Jungle
                        </SelectItem>
                        <SelectItem value="mid" className="text-white hover:bg-slate-700">
                          Mid/DPS
                        </SelectItem>
                        <SelectItem value="adc" className="text-white hover:bg-slate-700">
                          ADC/Carry
                        </SelectItem>
                        <SelectItem value="support" className="text-white hover:bg-slate-700">
                          Support
                        </SelectItem>
                        <SelectItem value="flex" className="text-white hover:bg-slate-700">
                          フレックス
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm text-white/80">
                      <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                        利用規約
                      </Link>
                      と
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                        プライバシーポリシー
                      </Link>
                      に同意します
                    </Label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 relative overflow-hidden"
                        disabled={!formData.agreeToTerms || isLoading}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            "アカウントを作成"
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <p className="text-white/70 text-sm">
                    すでにアカウントをお持ちですか？{" "}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                      ログイン
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
