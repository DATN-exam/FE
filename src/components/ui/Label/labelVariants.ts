import { cva } from 'class-variance-authority'

const labelVariants = cva(
  'text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

export default labelVariants
