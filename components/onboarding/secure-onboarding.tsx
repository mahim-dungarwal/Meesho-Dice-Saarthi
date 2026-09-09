'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Landmark,
  Lock,
  Smartphone,
} from 'lucide-react'

interface Step {
  key: string
  title: string
  subtitle: string
  icon: typeof Smartphone
  fields: { label: string; placeholder: string; type?: string }[]
}

const STEPS: Step[] = [
  {
    key: 'mobile',
    title: 'Mobile verification',
    subtitle: 'We will send a one-time password to your registered number.',
    icon: Smartphone,
    fields: [
      { label: 'Mobile number', placeholder: '98XXX XXXXX', type: 'tel' },
      { label: 'OTP', placeholder: '6-digit code' },
    ],
  },
  {
    key: 'kyc',
    title: 'Business verification / eKYC',
    subtitle: 'Verified securely on Meesho. Documents are never shared over chat.',
    icon: Building2,
    fields: [
      { label: 'Business / legal name', placeholder: 'e.g. Rajesh Textiles' },
      { label: 'PAN', placeholder: 'ABCDE1234F' },
    ],
  },
  {
    key: 'gst',
    title: 'GST verification (if applicable)',
    subtitle: 'Optional for many categories. You can add this later.',
    icon: BadgeCheck,
    fields: [{ label: 'GSTIN', placeholder: '22ABCDE1234F1Z5' }],
  },
  {
    key: 'bank',
    title: 'Bank verification',
    subtitle: 'Your payouts are credited to this account.',
    icon: Landmark,
    fields: [
      { label: 'Account number', placeholder: 'XXXXXXXXXXXX' },
      { label: 'IFSC', placeholder: 'HDFC0001234' },
    ],
  },
]

export function SecureOnboarding() {
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(false)

  const step = STEPS[current]
  const Icon = step.icon
  const isLast = current === STEPS.length - 1

  function next() {
    if (isLast) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
    }
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background shadow-xl">
      <header className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
        {!done && current > 0 ? (
          <button
            type="button"
            onClick={() => setCurrent((c) => c - 1)}
            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-primary-foreground/15"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Lock className="ml-1 h-5 w-5" />
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-[15px] font-semibold leading-tight">Secure Meesho Onboarding</h1>
          <p className="text-xs text-primary-foreground/80">Encrypted · Verified on Meesho</p>
        </div>
      </header>

      {done ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground">Onboarding complete</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your seller account is verified. MEESHO सारथी will now help you choose the right first
            product to launch.
          </p>
          <Link
            href="/?onboarded=1"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Return to सारथी
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <div
                  key={s.key}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    i <= current ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              Step {current + 1} of {STEPS.length}
            </p>
          </div>

          <div className="flex-1 px-4 py-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-foreground">{step.title}</h2>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.subtitle}</p>

            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                next()
              }}
            >
              {step.fields.map((f) => (
                <label key={f.label} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">{f.label}</span>
                  <input
                    type={f.type ?? 'text'}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  />
                </label>
              ))}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                {isLast ? 'Finish & verify' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </button>
              {!isLast && step.key === 'gst' && (
                <button
                  type="button"
                  onClick={next}
                  className="w-full rounded-xl px-4 py-2 text-sm font-medium text-primary transition hover:bg-secondary"
                >
                  Skip for now
                </button>
              )}
            </form>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-4 py-3 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            Your information is encrypted and verified securely on Meesho.
          </div>
        </>
      )}
    </main>
  )
}
