export const languages = {
  ja: "日本語",
  en: "English",
  zh: "中文",
} as const

export type Language = keyof typeof languages

export const defaultLanguage: Language = "ja"

export interface Translations {
  [key: string]: string | Translations
}
