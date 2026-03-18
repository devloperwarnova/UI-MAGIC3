import { Navigation } from '@/components/navigation'
import { ProgressBar } from '@/components/scroll-animations'

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <ProgressBar />
      {children}
    </>
  )
}
