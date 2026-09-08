import { Suspense } from 'react'
import { ChatApp } from '@/components/chat/chat-app'

export default function Page() {
  return (
    <main className="min-h-[100dvh] bg-muted">
      <Suspense fallback={null}>
        <ChatApp />
      </Suspense>
    </main>
  )
}
