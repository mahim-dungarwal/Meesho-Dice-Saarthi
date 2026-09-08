'use client'

import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, MoreVertical, RotateCcw } from 'lucide-react'

export function ChatHeader({ onRestart }: { onRestart: () => void }) {
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
    <header className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-lg font-bold text-primary">
        M
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h1 className="truncate text-[15px] font-semibold leading-tight">MEESHO सहायक</h1>
          <BadgeCheck className="h-4 w-4 shrink-0 fill-primary-foreground text-primary" aria-label="Verified" />
        </div>
        <p className="truncate text-xs text-primary-foreground/80">Your AI Commerce Manager</p>
      </div>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-primary-foreground/15"
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
