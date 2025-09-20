
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPurpleDark text-white hover:shadow-neon transition-all duration-300",
        destructive: "bg-gradient-to-r from-destructive/90 to-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-jillr-border bg-transparent hover:bg-jillr-darkAccent hover:text-foreground",
        secondary: "bg-jillr-darkAccent text-foreground hover:bg-jillr-darkLight",
        ghost: "hover:bg-jillr-darkAccent hover:text-foreground",
        link: "text-jillr-neonBlue underline-offset-4 hover:underline",
        game: "bg-gradient-to-r from-jillr-neonGreen/90 to-jillr-neonGreen text-black font-bold hover:shadow-neonGreen transition-all duration-300",
        premium: "bg-gradient-to-r from-jillr-neonPink/90 to-jillr-neonPink text-white hover:shadow-neonPink transition-all duration-300",
        ocean: "bg-gradient-to-r from-jillr-neonBlue/90 to-jillr-neonBlue text-white hover:shadow-neonBlue transition-all duration-300",
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
