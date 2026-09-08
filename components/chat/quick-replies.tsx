'use client'

import type { QuickReply } from '@/lib/chat-types'

export function QuickReplies({
  replies,
  disabled,
  onSelect,
}: {
  replies: QuickReply[]
  disabled: boolean
  onSelect: (reply: QuickReply) => void
}) {
  return (
    <div className="mt-2 flex flex-wrap justify-end gap-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply)}
          className="rounded-full border border-primary/40 bg-card px-3.5 py-2 text-[13px] font-medium text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none disabled:hover:bg-muted disabled:hover:text-muted-foreground"
        >
          {reply.label}
        </button>
      ))}
    </div>
  )
}
