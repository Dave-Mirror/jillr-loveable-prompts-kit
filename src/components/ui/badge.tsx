import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "relative inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "holo-badge",
        secondary: "bg-jillr-glass backdrop-blur-xl border border-jillr-glassBorder text-white hover:bg-jillr-glassHover",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        outline: "border border-jillr-glassBorder bg-transparent text-white hover:bg-jillr-glass hover:backdrop-blur-xl",
        xp: "bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlueDark text-white shadow-neonPurple",
        coins: "bg-gradient-to-r from-jillr-neonGreen to-jillr-neonGreenDark text-black shadow-neonGreen font-mono",
        level: "bg-hologram-gradient text-white shadow-hologram animate-aurora-sweep",
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
