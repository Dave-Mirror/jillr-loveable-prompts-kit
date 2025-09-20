
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground hover:shadow-neon hover:scale-105 border border-primary/30",
        destructive: "bg-gradient-to-r from-destructive/80 to-destructive text-destructive-foreground hover:shadow-glow-md border border-destructive/30",
        outline: "border-2 border-primary/50 bg-card/30 backdrop-blur-md hover:bg-primary/10 hover:border-primary hover:shadow-glow-sm hover:text-primary",
        secondary: "bg-gradient-to-r from-secondary/80 to-muted/80 backdrop-blur-md text-foreground hover:shadow-glow-sm border border-border/50",
        ghost: "hover:bg-primary/10 hover:text-primary hover:shadow-glow-sm backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline hover:shadow-glow-sm",
        game: "bg-gradient-to-r from-jillr-neonGreen/90 to-jillr-neonGreen text-black font-bold hover:shadow-neonGreen hover:scale-105 border border-jillr-neonGreen/30",
        premium: "bg-gradient-to-r from-jillr-neonPink/90 to-jillr-neonPink text-white hover:shadow-neonPink hover:scale-105 border border-jillr-neonPink/30",
        ocean: "bg-gradient-to-r from-jillr-neonBlue/90 to-jillr-neonBlue text-white hover:shadow-neonBlue hover:scale-105 border border-jillr-neonBlue/30",
        neon: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-neonStrong hover:scale-105 border border-primary/50",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-11 w-11",
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
