'use client'

import Link from 'next/link'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { ONBOARDING_STEPS } from '@/lib/mock-data'

export function OnboardingCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 bg-secondary px-4 py-3">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-secondary-foreground">
          SECURE MEESHO ONBOARDING
        </h3>
      </div>
      <div className="space-y-2.5 px-4 py-4">
        {ONBOARDING_STEPS.map((step) => (
          <div key={step} className="flex items-center gap-2.5">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <span className="text-sm text-card-foreground">{step}</span>
          </div>
        ))}
        <Link
          href="/secure-onboarding"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Continue securely
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="pt-1 text-center text-[11px] text-muted-foreground">
          You will never be asked to share KYC documents in chat.
        </p>
      </div>
    </div>
  )
}
