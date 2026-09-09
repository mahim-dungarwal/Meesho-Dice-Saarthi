'use client'

import { useState } from 'react'
import { Smile, Paperclip, Camera, Mic, SendHorizontal } from 'lucide-react'

export function ChatComposer({
  disabled,
  onSend,
}: {
  disabled: boolean
  onSend: (text: string) => void
}) {
  const [value, setValue] = useState('')
  const hasText = value.trim().length > 0

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div className="flex items-center gap-1.5 bg-wa-panel px-2 py-2">
      <div className="flex flex-1 items-center gap-1 rounded-full bg-card px-2 shadow-sm">
        <button
          type="button"
          aria-label="Emoji"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
        >
          <Smile className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={disabled ? 'सारथी is replying…' : 'Message'}
          aria-label="Message"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-foreground outline-none disabled:opacity-60"
        />
        <button
          type="button"
          aria-label="Attach file"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        {!hasText && (
          <button
            type="button"
            aria-label="Camera"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:text-foreground"
          >
            <Camera className="h-5 w-5" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        aria-label={hasText ? 'Send message' : 'Voice message'}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wa-action text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {hasText ? <SendHorizontal className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>
    </div>
  )
}
