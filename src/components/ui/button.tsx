
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: [
          "rounded-full px-6 py-3",
          "bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)]",
          "text-white font-bold",
          "shadow-[0_0_22px_rgba(0,240,255,0.35)]",
          "hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-105",
          "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] before:animate-shimmer-sweep before:z-10"
        ],
        destructive: [
          "rounded-xl",
          "bg-gradient-to-r from-red-500 to-red-600 text-white",
          "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
          "hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:scale-105"
        ],
        outline: [
          "rounded-xl",
          "bg-[var(--glass-bg)] backdrop-blur-[20px]",
          "border border-[var(--glass-border)]",
          "text-[var(--txt)]",
          "hover:bg-[var(--glass-hover)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        ],
        secondary: [
          "rounded-xl",
          "bg-[var(--glass-bg)] backdrop-blur-[20px]",
          "border border-[var(--glass-border)]",
          "text-[var(--txt)]",
          "hover:bg-[var(--glass-hover)] hover:scale-101"
        ],
        ghost: [
          "rounded-xl",
          "text-[var(--txt)]",
          "hover:bg-[var(--glass-bg)] hover:backdrop-blur-[20px]"
        ],
        link: [
          "text-[var(--neon-cyan)] underline-offset-4",
          "hover:underline hover:opacity-80"
        ],
        // Social Login Variants - Jillr Brand Colors Only
        google: "social-google rounded-full px-6 py-3 text-white font-bold hover:scale-105 transition-all duration-300",
        facebook: "social-facebook rounded-full px-6 py-3 text-white font-bold hover:scale-105 transition-all duration-300",
        instagram: "social-instagram rounded-full px-6 py-3 text-white font-bold hover:scale-105 transition-all duration-300",
        tiktok: "social-tiktok rounded-full px-6 py-3 text-white font-bold hover:scale-105 transition-all duration-300",
        hologram: [
          "rounded-full px-6 py-3",
          "bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)]",
          "text-white font-bold",
          "shadow-[0_0_22px_rgba(0,240,255,0.35)]",
          "hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-105",
          "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] before:animate-shimmer-sweep before:z-10"
        ]
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        xl: "h-12 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
