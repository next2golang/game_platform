"use client"

import { motion } from "framer-motion"
import { type ReactNode, useState, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GradientButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg" | "xl"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
  asChild?: boolean
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    {
      children,
      onClick,
      className = "",
      variant = "primary",
      size = "md",
      disabled = false,
      type = "button",
      loading = false,
      icon,
      fullWidth = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false)

    const variants = {
      primary: "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      secondary: "from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800",
      success: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
      warning: "from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
      danger: "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    }

    if (asChild) {
      return (
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-lg font-semibold text-white transition-all duration-300 inline-block",
            "bg-gradient-to-r",
            variants[variant],
            sizes[size],
            fullWidth && "w-full",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Animated background overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading && (
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            )}
            {icon && !loading && icon}
            {children}
          </span>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg blur-xl opacity-0"
            style={{
              background: `linear-gradient(to right, ${variant === "primary" ? "rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5)" : "rgba(100, 100, 100, 0.5), rgba(150, 150, 150, 0.5)"})`,
            }}
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )
    }

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        disabled={disabled || loading}
        type={type}
        className={cn(
          "relative overflow-hidden rounded-lg font-semibold text-white transition-all duration-300",
          "bg-gradient-to-r",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...props}
      >
        {/* Animated background overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          )}
          {icon && !loading && icon}
          {children}
        </span>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl opacity-0"
          style={{
            background: `linear-gradient(to right, ${variant === "primary" ? "rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5)" : "rgba(100, 100, 100, 0.5), rgba(150, 150, 150, 0.5)"})`,
          }}
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    )
  },
)

GradientButton.displayName = "GradientButton"

export const ModernButton = forwardRef<
  HTMLButtonElement,
  GradientButtonProps & { variant?: "outline" | "ghost" | "solid" }
>(({ children, onClick, className = "", variant = "outline", asChild = false, ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false)

  if (variant === "outline") {
    const buttonContent = (
      <>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">{children}</span>
      </>
    )

    if (asChild) {
      return (
        <motion.div
          className={cn(
            "relative px-6 py-3 border-2 border-purple-500/50 rounded-lg",
            "text-purple-300 font-semibold overflow-hidden inline-block",
            "hover:text-white transition-colors duration-300",
            className,
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {buttonContent}
        </motion.div>
      )
    }

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative px-6 py-3 border-2 border-purple-500/50 rounded-lg",
          "text-purple-300 font-semibold overflow-hidden",
          "hover:text-white transition-colors duration-300",
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...props}
      >
        {buttonContent}
      </motion.button>
    )
  }

  if (variant === "ghost") {
    const buttonContent = children

    if (asChild) {
      return (
        <motion.div
          className={cn(
            "relative px-6 py-3 rounded-lg text-white/80 font-semibold inline-block",
            "hover:text-white hover:bg-white/10 transition-all duration-300",
            className,
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonContent}
        </motion.div>
      )
    }

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative px-6 py-3 rounded-lg text-white/80 font-semibold",
          "hover:text-white hover:bg-white/10 transition-all duration-300",
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    )
  }

  return (
    <GradientButton ref={ref} onClick={onClick} className={className} asChild={asChild} {...props}>
      {children}
    </GradientButton>
  )
})

ModernButton.displayName = "ModernButton"
