'use client'

import { PackageX, TrendingDown } from 'lucide-react'
import {
  DISCLAIMER,
  RTO_DRIVERS,
  RTO_IMPACT,
  RTO_RATE,
  RTO_RECOMMENDATION,
} from '@/lib/mock-data'

export function RTOCard() {
  const max = Math.max(...RTO_DRIVERS.map((d) => d.pct))

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 bg-secondary px-4 py-3">
        <PackageX className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-secondary-foreground">
          RETURN DIAGNOSIS
        </h3>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-baseline justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5">
          <span className="text-sm text-muted-foreground">Current RTO / Return Rate</span>
          <span className="text-xl font-bold text-primary">{RTO_RATE}</span>
        </div>

        <p className="mb-2 mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Main drivers
        </p>
        <div className="space-y-2.5">
          {RTO_DRIVERS.map((d) => (
            <div key={d.reason}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-card-foreground">{d.reason}</span>
                <span className="font-semibold text-card-foreground">{d.pct}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(d.pct / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-secondary p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            Top Recommendation
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary-foreground">
            {RTO_RECOMMENDATION}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-success">
            <TrendingDown className="h-4 w-4" />
            {RTO_IMPACT}
          </div>
        </div>

        <p className="pt-2.5 text-[11px] text-muted-foreground">{DISCLAIMER} · estimate</p>
      </div>
    </div>
  )
}
