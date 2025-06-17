"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "./config"
import { defaultLanguage } from "./config"
import { translations } from "./translations"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  // Initialize language on client-side only
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language
    if (saved && translations[saved]) {
      setLanguageState(saved)
    } else {
      const browserLang = navigator.language.split("-")[0] as Language
      if (translations[browserLang]) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k]
      } else {
        value = undefined
        break
      }
    }

    if (typeof value !== "string") {
      // Fallback to default language
      value = translations[defaultLanguage]
      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k]
        } else {
          value = key // Return key if translation not found
          break
        }
      }
    }

    // Replace parameters
    if (typeof value === "string" && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }

    return typeof value === "string" ? value : key
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ language: defaultLanguage, setLanguage, t }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
} 