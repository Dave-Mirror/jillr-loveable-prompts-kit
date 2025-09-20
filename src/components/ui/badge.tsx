import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "relative inline-flex items-center transition-all duration-300 overflow-hidden font-bold text-white",
  {
    variants: {
      variant: {
        default: "holo-badge",
        secondary: [
          "rounded-xl px-3 py-1.5 text-xs",
          "bg-[var(--glass-bg)] backdrop-blur-[20px]",
          "border border-[var(--glass-border)]",
          "text-[var(--txt)]",
          "hover:bg-[var(--glass-hover)]"
        ],
        destructive: [
          "rounded-xl px-3 py-1.5 text-xs",
          "bg-gradient-to-r from-red-500 to-red-600",
          "shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        ],
        outline: [
          "rounded-xl px-3 py-1.5 text-xs",
          "border border-[var(--glass-border)]",
          "bg-transparent text-[var(--txt)]",
          "hover:bg-[var(--glass-bg)] hover:backdrop-blur-[20px]"
        ],
        xp: [
          "rounded-xl px-3 py-1.5 text-xs",
          "bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)]",
          "shadow-[0_0_20px_rgba(154,91,255,0.4)]"
        ],
        coins: [
          "rounded-xl px-3 py-1.5 text-xs font-mono",
          "bg-gradient-to-r from-[var(--neon-green)] to-green-400",
          "text-black shadow-[0_0_20px_rgba(57,255,20,0.4)]"
        ],
        level: [
          "rounded-xl px-3 py-1.5 text-xs",
          "bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-green)]",
          "shadow-[0_0_22px_rgba(0,255,198,0.35)] animate-aurora-sweep"
        ]
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
