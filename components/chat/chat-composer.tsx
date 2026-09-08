'use client'

import { useState } from 'react'
import { SendHorizontal } from 'lucide-react'

export function ChatComposer({
  disabled,
  onSend,
}: {
  disabled: boolean
  onSend: (text: string) => void
}) {
  const [value, setValue] = useState('')

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div className="flex items-end gap-2 border-t border-border bg-card px-3 py-2.5">
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            !e.nativeEvent.isComposing &&
            e.keyCode !== 229
          ) {
            e.preventDefault()
            submit()
          }
        }}
        placeholder={disabled ? 'Sahayak is replying…' : 'Type a message…'}
        aria-label="Message"
        className="min-w-0 flex-1 rounded-full border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary disabled:opacity-60"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <SendHorizontal className="h-5 w-5" />
      </button>
    </div>
  )
}
