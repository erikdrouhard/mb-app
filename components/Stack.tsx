'use client'

interface StackProps {
  direction?: 'row' | 'col'
  className?: string
  children: React.ReactNode
}

const Stack = ({ direction = 'row', className, children }: StackProps) => {
  return (
    <div className={`flex flex-${direction} gap-5 justify-center ${className}`}>
      {children}
    </div>
  )
}

export default Stack
