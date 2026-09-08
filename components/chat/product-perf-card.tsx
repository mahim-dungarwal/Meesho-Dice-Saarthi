'use client'

import { BarChart3 } from 'lucide-react'
import { DISCLAIMER, PRODUCT_PERFORMANCE, type ProductPerf } from '@/lib/mock-data'

const STATUS: Record<ProductPerf['status'], { label: string; cls: string }> = {
  good: { label: 'Healthy', cls: 'bg-success/12 text-success' },
  watch: { label: 'Watch', cls: 'bg-amber-100 text-amber-700' },
  risk: { label: 'High RTO', cls: 'bg-destructive/12 text-destructive' },
}

export function ProductPerfCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 bg-secondary px-4 py-3">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-secondary-foreground">
          PRODUCT PERFORMANCE
        </h3>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-2">
          {PRODUCT_PERFORMANCE.map((p) => {
            const s = STATUS[p.status]
            return (
              <div
                key={p.name}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-muted/40 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-card-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.orders} orders · RTO {p.rto}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${s.cls}`}>
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
        <p className="pt-2.5 text-[11px] text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </div>
  )
}
