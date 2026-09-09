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
                ? 'wa-user-bubble relative max-w-[80%] rounded-lg rounded-tr-none bg-user-bubble px-2.5 py-1.5 text-user-bubble-foreground shadow-sm'
                : 'wa-bot-bubble relative max-w-[85%] rounded-lg rounded-tl-none bg-card px-2.5 py-1.5 text-card-foreground shadow-sm'
            }
          >
            <p className="whitespace-pre-line pr-10 text-[14px] leading-relaxed">{message.text}</p>
            <div
              className={`-mt-0.5 flex items-center justify-end gap-1 text-[10px] ${
                isUser ? 'text-user-bubble-foreground/50' : 'text-muted-foreground'
              }`}
            >
              <span>{message.time}</span>
              {isUser &&
                (repliesActive ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
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
