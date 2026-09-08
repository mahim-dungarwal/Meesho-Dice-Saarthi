// Centralised illustrative demo data for the MEESHO सहायक prototype.
// NOTE: All figures here are clearly illustrative prototype data and are NOT
// actual Meesho figures. Replace with a real API layer later.

export const SELLER_NAME = 'Rajesh'

export const DISCLAIMER = 'Illustrative prototype data'

export type Opportunity = 'HIGH' | 'MEDIUM' | 'LOW'

export interface DemandProduct {
  name: string
  growth: string
  competition: 'Low' | 'Medium' | 'High'
  opportunity: Opportunity
}

export interface DemandCategory {
  category: string
  products: DemandProduct[]
  recommended: string
}

export const DEMAND_CATEGORIES: Record<string, DemandCategory> = {
  women_fashion: {
    category: 'Women Fashion',
    recommended: 'Cotton Kurtis',
    products: [
      { name: 'Cotton Kurtis', growth: '↑ 32%', competition: 'Medium', opportunity: 'HIGH' },
      { name: 'Co-ord Sets', growth: '↑ 27%', competition: 'Medium', opportunity: 'HIGH' },
      { name: 'Printed Sarees', growth: '↑ 18%', competition: 'High', opportunity: 'MEDIUM' },
    ],
  },
  home_kitchen: {
    category: 'Home & Kitchen',
    recommended: 'Storage Organisers',
    products: [
      { name: 'Storage Organisers', growth: '↑ 24%', competition: 'Medium', opportunity: 'HIGH' },
      { name: 'Bedsheets (Cotton)', growth: '↑ 16%', competition: 'High', opportunity: 'MEDIUM' },
      { name: 'Non-stick Cookware', growth: '↑ 11%', competition: 'High', opportunity: 'MEDIUM' },
    ],
  },
  footwear: {
    category: 'Footwear',
    recommended: 'Women Ethnic Flats',
    products: [
      { name: 'Women Ethnic Flats', growth: '↑ 21%', competition: 'Medium', opportunity: 'HIGH' },
      { name: 'Casual Sneakers', growth: '↑ 15%', competition: 'High', opportunity: 'MEDIUM' },
      { name: 'Kids Sandals', growth: '↑ 9%', competition: 'Medium', opportunity: 'MEDIUM' },
    ],
  },
}

export interface Pricing {
  cost: number
  price: number
  marketplaceCost: number
  contribution: number
  margin: number
  rangeLow: number
  rangeHigh: number
}

// Deterministic economics. For a ₹250 cost this reproduces the reference
// example (price ₹399, costs ₹77, contribution ₹72, margin 18%).
export function getPricing(cost: number): Pricing {
  const price = Math.ceil((cost * 1.6) / 50) * 50 - 1
  const marketplaceCost = Math.round(price * 0.193)
  const contribution = price - cost - marketplaceCost
  const margin = Math.round((contribution / price) * 100)
  return {
    cost,
    price,
    marketplaceCost,
    contribution,
    margin,
    rangeLow: price - 50,
    rangeHigh: price + 100,
  }
}

export interface BusinessStat {
  label: string
  value: string
  trend?: number[]
}

export const BUSINESS_PULSE: BusinessStat[] = [
  { label: 'Orders', value: '124', trend: [80, 92, 88, 105, 110, 118, 124] },
  { label: 'Revenue', value: '₹49,600', trend: [30, 34, 33, 40, 43, 46, 50] },
  { label: 'Conversion', value: '4.8%', trend: [3.9, 4.1, 4.0, 4.4, 4.5, 4.7, 4.8] },
  { label: 'RTO / Returns', value: '8%', trend: [11, 10, 10, 9, 9, 8, 8] },
  { label: 'Products Live', value: '12' },
]

export const BUSINESS_INSIGHT =
  'Your blue cotton kurti has high demand but RTO is 3.1 percentage points above your portfolio average.'

export const BUSINESS_ACTION = 'Improve size chart and product description.'

export interface ProductPerf {
  name: string
  orders: number
  rto: string
  status: 'good' | 'watch' | 'risk'
}

export const PRODUCT_PERFORMANCE: ProductPerf[] = [
  { name: 'Blue Cotton Kurti', orders: 41, rto: '11.1%', status: 'risk' },
  { name: 'Floral Co-ord Set', orders: 33, rto: '7.4%', status: 'watch' },
  { name: 'Printed Saree', orders: 28, rto: '6.2%', status: 'good' },
  { name: 'Rayon Kurti', orders: 22, rto: '5.9%', status: 'good' },
]

export interface RtoDriver {
  reason: string
  pct: number
}

export const RTO_RATE = '8.0%'

export const RTO_DRIVERS: RtoDriver[] = [
  { reason: 'Size / expectation mismatch', pct: 36 },
  { reason: 'Delivery failure', pct: 24 },
  { reason: 'Quality mismatch', pct: 18 },
  { reason: 'Address / customer unavailable', pct: 12 },
  { reason: 'Other', pct: 10 },
]

export const RTO_RECOMMENDATION =
  'Improve the size chart for your top 3 apparel SKUs.'

export const RTO_IMPACT = 'Potential reduction: 1.2–1.8 percentage points'

export const ONBOARDING_STEPS = [
  'Mobile verification',
  'Business verification / eKYC',
  'GST verification, if applicable',
  'Bank verification',
]
