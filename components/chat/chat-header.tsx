'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, BadgeCheck, Phone, MoreVertical, RotateCcw } from 'lucide-react'

export function ChatHeader({ onRestart, typing = false }: { onRestart: () => void; typing?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <header className="flex items-center gap-2 bg-wa-header px-2 py-2 text-wa-header-foreground">
      <button
        type="button"
        className="grid h-9 w-8 shrink-0 place-items-center rounded-full transition hover:bg-white/10"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="relative shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-extrabold lowercase text-primary-foreground shadow-sm">
          m
        </div>
      </div>

      <div className="min-w-0 flex-1 leading-tight">
        <div className="flex items-center gap-1">
          <h1 className="truncate text-[15px] font-semibold">MEESHO सारथी</h1>
          <BadgeCheck className="h-4 w-4 shrink-0 fill-white text-wa-header" aria-label="Verified" />
        </div>
        <p className="truncate text-[11px] text-wa-header-foreground/80">
          {typing ? 'typing…' : 'Business Account'}
        </p>
      </div>

      <button
        type="button"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-white/10"
        aria-label="Call"
      >
        <Phone className="h-[18px] w-[18px]" />
      </button>

      <div ref={menuRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="grid h-9 w-8 place-items-center rounded-full transition hover:bg-white/10"
          aria-label="Menu"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <MoreVertical className="h-5 w-5" />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-border bg-card py-1 text-card-foreground shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                onRestart()
              }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4 text-primary" />
              Restart Demo
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
