"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AnimatedCard, Block3D } from "@/components/ui/animated-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animations/animated-button"
import { CursorTrail, CursorAttract } from "@/components/animations/cursor-effects"
import { Fireworks } from "@/components/animations/fireworks"
import { Play, Upload, AlertCircle, CheckCircle, CreditCard, FileVideo, Sparkles } from "lucide-react"
import { useApp } from "@/lib/context/app-context"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [uploadStep, setUploadStep] = useState<"select" | "uploading" | "details" | "payment">("select")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [needsPayment, setNeedsPayment] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    game: "",
    tags: "",
    visibility: "public",
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      // Check file size (50MB = 52428800 bytes)
      if (file.size > 52428800) {
        setNeedsPayment(true)
        setUploadStep("payment")
      } else {
        setUploadStep("uploading")
        simulateUpload()
      }
    }
  }

  const simulateUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => setUploadStep("details"), 500)
      }
      setUploadProgress(progress)
    }, 200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!state.user) return

    const newVideo = {
      id: Date.now().toString(),
      title: videoDetails.title,
      description: videoDetails.description,
      game: videoDetails.game,
      author: state.user.username,
      authorId: state.user.id,
      authorAvatar: state.user.avatar,
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "1:23",
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split("T")[0],
      tags: videoDetails.tags.split(" ").filter((tag) => tag.trim()),
      isLiked: false,
    }

    dispatch({ type: "ADD_VIDEO", payload: newVideo })
    setShowFireworks(true)

    setTimeout(() => {
      router.push(`/video/${newVideo.id}/edit`)
    }, 2000)
  }

  const handlePayment = () => {
    console.log("Processing payment...")
    setUploadStep("uploading")
    simulateUpload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <CursorTrail />
      <Fireworks trigger={showFireworks} />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
            <Link href="/dashboard" className="flex items-center gap-2">
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
          <AnimatedButton variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/dashboard">ダッシュボードに戻る</Link>
          </AnimatedButton>
        </div>
      </motion.header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">動画をアップロード</h1>
            <p className="text-white/70">ゲームプレイ動画をアップロードして分析を作成しましょう</p>
          </motion.div>

          {/* File Selection Step */}
          {uploadStep === "select" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Block3D>
                <div className="text-center mb-6">
                  <FileVideo className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h2 className="text-white text-xl font-semibold">動画ファイルを選択</h2>
                  <p className="text-white/70 mt-2">MP4形式、最大50MB（無料）、30秒〜1分の動画を推奨</p>
                </div>

                <CursorAttract>
                  <motion.div
                    className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-white/40 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-white mb-2">クリックして動画を選択</p>
                    <p className="text-white/60 text-sm">または、ファイルをドラッグ&ドロップ</p>
                  </motion.div>
                </CursorAttract>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="mt-6 space-y-2">
                  <motion.div
                    className="flex items-center gap-2 text-sm text-white/80"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    50MB以下: 無料でアップロード
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-sm text-white/80"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <CreditCard className="w-4 h-4 text-yellow-400" />
                    50MB以上: プレミアムアップロード（¥100）
                  </motion.div>
                </div>
              </Block3D>
            </motion.div>
          )}

          {/* Payment Step */}
          {uploadStep === "payment" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedCard>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-white text-xl font-semibold">プレミアムアップロード</h2>
                  </div>
                  <p className="text-white/70 mb-6">選択したファイルは50MBを超えています</p>

                  {selectedFile && (
                    <motion.div
                      className="bg-white/10 rounded-lg p-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{selectedFile.name}</p>
                          <p className="text-white/60 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                          大容量ファイル
                        </Badge>
                      </div>
                    </motion.div>
                  )}

                  <Block3D className="mb-6">
                    <h3 className="text-white font-semibold mb-2">プレミアムアップロード</h3>
                    <ul className="text-white/80 text-sm space-y-1 mb-4">
                      <li>• 50MB以上のファイルをアップロード可能</li>
                      <li>• 高画質での保存・再生</li>
                      <li>• 優先処理でより高速なアップロード</li>
                    </ul>
                    <div className="text-2xl font-bold text-white">¥100</div>
                  </Block3D>

                  <div className="flex gap-3">
                    <AnimatedButton
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() => {
                        setSelectedFile(null)
                        setUploadStep("select")
                      }}
                    >
                      キャンセル
                    </AnimatedButton>
                    <AnimatedButton
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={handlePayment}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      支払って続行
                    </AnimatedButton>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}

          {/* Upload Progress Step */}
          {uploadStep === "uploading" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedCard>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-white text-xl font-semibold">アップロード中...</h2>
                    <p className="text-white/70">動画を処理しています。しばらくお待ちください。</p>
                  </div>

                  {selectedFile && (
                    <motion.div
                      className="flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-white/60 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">進行状況</span>
                      <span className="text-white">{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}

          {/* Video Details Step */}
          {uploadStep === "details" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedCard>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h2 className="text-white text-xl font-semibold">動画の詳細情報</h2>
                  </div>
                  <p className="text-white/70 mb-6">動画の情報を入力して公開準備を完了しましょう</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="title" className="text-white">
                        タイトル *
                      </Label>
                      <Input
                        id="title"
                        placeholder="動画のタイトルを入力"
                        value={videoDetails.title}
                        onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="description" className="text-white">
                        説明
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="動画の内容や分析のポイントを説明"
                        value={videoDetails.description}
                        onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                        rows={3}
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="game" className="text-white">
                        ゲーム *
                      </Label>
                      <Select onValueChange={(value) => setVideoDetails({ ...videoDetails, game: value })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400">
                          <SelectValue placeholder="ゲームを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lol">League of Legends</SelectItem>
                          <SelectItem value="valorant">VALORANT</SelectItem>
                          <SelectItem value="apex">Apex Legends</SelectItem>
                          <SelectItem value="overwatch">Overwatch 2</SelectItem>
                          <SelectItem value="csgo">CS2</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="tags" className="text-white">
                        タグ
                      </Label>
                      <Input
                        id="tags"
                        placeholder="タグをスペース区切りで入力（例: ガンク 視界管理 チームファイト）"
                        value={videoDetails.tags}
                        onChange={(e) => setVideoDetails({ ...videoDetails, tags: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="visibility" className="text-white">
                        公開設定
                      </Label>
                      <Select onValueChange={(value) => setVideoDetails({ ...videoDetails, visibility: value })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400">
                          <SelectValue placeholder="公開設定を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">公開</SelectItem>
                          <SelectItem value="unlisted">限定公開（URLを知っている人のみ）</SelectItem>
                          <SelectItem value="private">非公開</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      className="flex gap-3 pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <AnimatedButton
                        type="button"
                        variant="outline"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                        onClick={() => setUploadStep("select")}
                      >
                        戻る
                      </AnimatedButton>
                      <AnimatedButton
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        エディターで編集開始
                      </AnimatedButton>
                    </motion.div>
                  </form>
                </div>
              </AnimatedCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
