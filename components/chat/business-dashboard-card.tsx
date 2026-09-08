'use client'

import { Activity, Lightbulb, Target } from 'lucide-react'
import {
  BUSINESS_ACTION,
  BUSINESS_INSIGHT,
  BUSINESS_PULSE,
  DISCLAIMER,
} from '@/lib/mock-data'

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  return (
    <div className="mt-2 flex h-6 items-end gap-0.5" aria-hidden="true">
      {data.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-sm bg-primary/70"
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  )
}

export function BusinessDashboardCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 bg-secondary px-4 py-3">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-secondary-foreground">
          {"TODAY'S BUSINESS PULSE"}
        </h3>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-2.5">
          {BUSINESS_PULSE.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-card-foreground">{stat.value}</p>
              {stat.trend && <Sparkline data={stat.trend} />}
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">AI Insight</p>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-card-foreground">{BUSINESS_INSIGHT}</p>
        </div>

        <div className="mt-2.5 rounded-xl bg-secondary p-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              Recommended Action
            </p>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary-foreground">{BUSINESS_ACTION}</p>
        </div>

        <p className="pt-2.5 text-[11px] text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </div>
  )
}
