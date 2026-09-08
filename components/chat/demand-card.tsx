'use client'

import { Sparkles, TrendingUp } from 'lucide-react'
import { DEMAND_CATEGORIES, DISCLAIMER, type Opportunity } from '@/lib/mock-data'

const OPP_STYLES: Record<Opportunity, string> = {
  HIGH: 'bg-success/12 text-success',
  MEDIUM: 'bg-amber-100 text-amber-700',
  LOW: 'bg-muted text-muted-foreground',
}

export function DemandCard({ category }: { category: string }) {
  const data = DEMAND_CATEGORIES[category] ?? DEMAND_CATEGORIES.women_fashion

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 bg-secondary px-4 py-3">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-secondary-foreground">
          MEESHO DEMAND OPPORTUNITY
        </h3>
      </div>

      <div className="px-4 py-4">
        <p className="text-xs text-muted-foreground">Category</p>
        <p className="mb-3 text-sm font-semibold text-card-foreground">{data.category}</p>

        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          High Opportunity Products
        </p>
        <div className="space-y-2">
          {data.products.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-card-foreground">{p.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${OPP_STYLES[p.opportunity]}`}
                >
                  {p.opportunity}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-success">{p.growth} demand</span>
                <span>Competition: {p.competition}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-secondary-foreground">
            <span className="font-medium">Recommended starting product: </span>
            <span className="font-bold">{data.recommended}</span>
          </p>
        </div>

        <p className="pt-2.5 text-[11px] text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </div>
  )
}
