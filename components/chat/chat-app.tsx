'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { BotStep, ChatMessage as ChatMessageType, QuickReply } from '@/lib/chat-types'
import {
  fallbackStep,
  getBotSteps,
  pricingSteps,
  routeFreeText,
  welcomeBackStep,
  welcomeStep,
} from '@/lib/chat-flows'
import { ChatHeader } from './chat-header'
import { ChatMessage } from './chat-message'
import { ChatComposer } from './chat-composer'
import { TypingIndicator } from './typing-indicator'

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function ChatApp() {
  const searchParams = useSearchParams()
  const onboarded = searchParams.get('onboarded') === '1'

  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [busy, setBusy] = useState(false)
  const [interactiveId, setInteractiveId] = useState<string | null>(null)

  const idRef = useRef(0)
  const runTokenRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const nextId = () => `m${idRef.current++}`

  const runSteps = useCallback(async (steps: BotStep[]) => {
    const token = ++runTokenRef.current
    setBusy(true)
    setInteractiveId(null)

    for (const step of steps) {
      setIsTyping(true)
      await sleep(step.delay ?? 900)
      if (token !== runTokenRef.current) return // cancelled by restart
      setIsTyping(false)

      const id = nextId()
      setMessages((prev) => [
        ...prev,
        {
          id,
          role: 'bot',
          text: step.text,
          card: step.card,
          payload: step.payload,
          quickReplies: step.quickReplies,
          time: now(),
        },
      ])
      if (step.quickReplies && step.quickReplies.length > 0) {
        setInteractiveId(id)
      }
    }

    if (token === runTokenRef.current) setBusy(false)
  }, [])

  const start = useCallback(() => {
    runTokenRef.current++
    idRef.current = 0
    setMessages([])
    setIsTyping(false)
    setBusy(false)
    setInteractiveId(null)
    void runSteps([onboarded ? welcomeBackStep() : welcomeStep()])
  }, [onboarded, runSteps])

  useEffect(() => {
    start()
  }, [start])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  function pushUser(text: string) {
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text, time: now() }])
  }

  function handleQuickReply(reply: QuickReply) {
    if (busy) return
    setInteractiveId(null)
    pushUser(reply.label)
    void runSteps(getBotSteps(reply.id))
  }

  function handleSend(text: string) {
    if (busy) return
    pushUser(text)
    const routed = routeFreeText(text)
    if (!routed) {
      void runSteps([fallbackStep()])
    } else if (routed.kind === 'cost') {
      void runSteps(pricingSteps(routed.value))
    } else {
      void runSteps(getBotSteps(routed.id))
    }
  }

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-md flex-col bg-background shadow-xl">
      <ChatHeader onRestart={start} typing={isTyping} />

      <div ref={scrollRef} className="chat-wallpaper no-scrollbar flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <div className="flex justify-center">
          <span className="rounded-md bg-card/90 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
            Today
          </span>
        </div>
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            message={m}
            repliesActive={m.id === interactiveId && !busy}
            onSelectReply={handleQuickReply}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <ChatComposer disabled={busy} onSend={handleSend} />
    </div>
  )
}
