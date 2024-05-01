interface StackProps {
  direction?: 'row' | 'col'
  gap?: number
  children: React.ReactNode
}

const Stack = ({ gap = 5, direction = 'row', children }: StackProps) => {
  return <div className={`flex flex-${direction} gap-${gap}`}>{children}</div>
}

export default Stack
