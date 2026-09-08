'use client'

import { Check, CheckCheck } from 'lucide-react'
import type { ChatMessage as ChatMessageType, QuickReply } from '@/lib/chat-types'
import { QuickReplies } from './quick-replies'
import { OnboardingCard } from './onboarding-card'
import { DemandCard } from './demand-card'
import { PricingCard } from './pricing-card'
import { BusinessDashboardCard } from './business-dashboard-card'
import { RTOCard } from './rto-card'
import { ProductPerfCard } from './product-perf-card'

function CardContent({ message }: { message: ChatMessageType }) {
  switch (message.card) {
    case 'onboarding':
      return <OnboardingCard />
    case 'demand':
      return <DemandCard category={String(message.payload?.category ?? 'women_fashion')} />
    case 'pricing':
      return <PricingCard cost={Number(message.payload?.cost ?? 250)} />
    case 'dashboard':
      return <BusinessDashboardCard />
    case 'rto':
      return <RTOCard />
    case 'product-perf':
      return <ProductPerfCard />
    default:
      return null
  }
}

export function ChatMessage({
  message,
  repliesActive,
  onSelectReply,
}: {
  message: ChatMessageType
  repliesActive: boolean
  onSelectReply: (reply: QuickReply) => void
}) {
  const isUser = message.role === 'user'

  return (
    <div className="animate-msg-in">
      {message.card ? (
        <div className="flex justify-start">
          <div className="w-full max-w-[300px]">
            <CardContent message={message} />
            <div className="mt-1 pl-1 text-[10px] text-muted-foreground">{message.time}</div>
          </div>
        </div>
      ) : (
        <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
          <div
            className={
              isUser
                ? 'max-w-[80%] rounded-2xl rounded-tr-md bg-user-bubble px-3.5 py-2.5 text-user-bubble-foreground shadow-sm'
                : 'max-w-[85%] rounded-2xl rounded-tl-md bg-card px-3.5 py-2.5 text-card-foreground shadow-sm'
            }
          >
            <p className="whitespace-pre-line text-[14px] leading-relaxed">{message.text}</p>
            <div
              className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                isUser ? 'text-user-bubble-foreground/60' : 'text-muted-foreground'
              }`}
            >
              <span>{message.time}</span>
              {isUser &&
                (repliesActive ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <CheckCheck className="h-3 w-3 text-primary" />
                ))}
            </div>
          </div>
        </div>
      )}

      {message.quickReplies && message.quickReplies.length > 0 && (
        <QuickReplies
          replies={message.quickReplies}
          disabled={!repliesActive}
          onSelect={onSelectReply}
        />
      )}
    </div>
  )
}
