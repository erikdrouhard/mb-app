interface ResellerLayoutProps {
  children: React.ReactNode
}

const ResellerLayout = ({ children }: ResellerLayoutProps) => {
  return <div className="h-full flex flex-col">{children}</div>
}

export default ResellerLayout
