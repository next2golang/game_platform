import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/lib/context/app-context"
import { I18nProvider } from "@/lib/i18n/hooks"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GameAnalyzer Pro - ゲームスキル向上プラットフォーム",
  description: "プレイ動画にインタラクティブな分析を追加し、戦略的思考を共有するゲーマー向けプラットフォーム",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <I18nProvider>
          <AppProvider>{children}</AppProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
