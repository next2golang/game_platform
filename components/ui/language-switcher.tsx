"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languages, type Language } from "@/lib/i18n/config"
import { useI18n } from "@/lib/i18n/hooks"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-slate-700">
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code} className="text-white hover:bg-slate-700">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
