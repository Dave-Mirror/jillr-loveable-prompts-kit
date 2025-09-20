
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-hologram-gradient text-white shadow-hologram hover:shadow-hologramStrong hover:scale-105 before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-aurora-shimmer before:animate-hologram-shimmer before:z-10",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] hover:scale-105",
        outline: "border border-jillr-glassBorder bg-jillr-glass backdrop-blur-xl text-white hover:bg-jillr-glassHover hover:border-jillr-neonBlue/50 hover:shadow-neonBlue",
        secondary: "bg-jillr-glass backdrop-blur-xl border border-jillr-glassBorder/50 text-white hover:bg-jillr-glassHover hover:shadow-glass",
        ghost: "text-white hover:bg-jillr-glass hover:backdrop-blur-xl hover:shadow-glass",
        link: "text-jillr-neonBlue underline-offset-4 hover:underline hover:text-jillr-neonBlue/80",
        neonGreen: "bg-gradient-to-r from-jillr-neonGreen to-jillr-neonGreenDark text-black font-bold shadow-neonGreen hover:shadow-[0_0_40px_rgba(57,255,20,0.7)] hover:scale-105",
        neonBlue: "bg-gradient-to-r from-jillr-neonBlue to-jillr-neonBlueDark text-white font-bold shadow-neonBlue hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-105",
        neonPink: "bg-gradient-to-r from-jillr-neonPink to-jillr-neonPinkDark text-white font-bold shadow-neonPink hover:shadow-[0_0_40px_rgba(255,0,127,0.7)] hover:scale-105",
        glass: "bg-jillr-glass backdrop-blur-xl border border-jillr-glassBorder text-white hover:bg-jillr-glassHover hover:animate-glass-morph",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
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
