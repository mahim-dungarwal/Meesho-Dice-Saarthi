'use client'

import type { QuickReply } from '@/lib/chat-types'

function splitEmoji(label: string): { icon: string | null; text: string } {
  const match = label.match(/^(\p{Extended_Pictographic}\uFE0F?)\s+(.*)$/u)
  if (match) return { icon: match[1], text: match[2] }
  return { icon: null, text: label }
}

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
    <div className="mt-2 grid grid-cols-2 gap-2">
      {replies.map((reply) => {
        const { icon, text } = splitEmoji(reply.label)
        return (
          <button
            key={reply.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(reply)}
            className="flex items-center gap-2 rounded-xl border border-wa-action/40 bg-card px-3 py-2.5 text-left text-[13px] font-medium text-card-foreground shadow-sm transition hover:border-wa-action hover:bg-wa-action/5 disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
          >
            {icon && (
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-wa-action/10 text-base leading-none">
                {icon}
              </span>
            )}
            <span className="min-w-0 flex-1 leading-tight text-pretty">{text}</span>
          </button>
        )
      })}
    </div>
  )
}
