import type { BotStep, QuickReply } from './chat-types'
import { SELLER_NAME } from './mock-data'

export const MAIN_MENU: QuickReply[] = [
  { id: 'start_selling', label: '🚀 Start Selling on Meesho' },
  { id: 'check_demand', label: '📈 Check Product Demand' },
  { id: 'find_price', label: '💰 Find Right Selling Price' },
  { id: 'check_business', label: '📦 Check My Business' },
  { id: 'reduce_rto', label: '🔄 Reduce Returns / RTO' },
  { id: 'ask_sahayak', label: '💬 Ask सारथी' },
]

export const WELCOME_TEXT = `नमस्ते ${SELLER_NAME} ji 👋

Main MEESHO सारथी hoon.

Meesho par business शुरू करने से लेकर orders grow करने तक, main aapki help karunga.

Aaj main aapke liye kya kar sakta hoon?`

export function welcomeStep(): BotStep {
  return { text: WELCOME_TEXT, quickReplies: MAIN_MENU }
}

export function welcomeBackStep(): BotStep {
  return {
    text: `Welcome back ${SELLER_NAME} ji 🎉

Aapka onboarding complete ho gaya.

Ab main aapko decide karne mein help karunga ki kaunsa product Meesho par launch karna chahiye.`,
    quickReplies: [
      { id: 'analyse_products', label: 'Analyse My Products' },
      { id: 'show_demand_opportunities', label: 'Show Demand Opportunities' },
    ],
  }
}

// Resolve an action id into a sequence of scripted bot turns.
export function getBotSteps(actionId: string): BotStep[] {
  switch (actionId) {
    // ---- Flow 1: Start selling ----
    case 'start_selling':
      return [
        {
          text: 'Bilkul 👍 Pehle mujhe bataiye, aap kya hain?',
          quickReplies: [
            { id: 'role_manufacturer', label: 'Manufacturer' },
            { id: 'role_wholesaler', label: 'Wholesaler' },
            { id: 'role_retailer', label: 'Retailer' },
          ],
        },
      ]
    case 'role_manufacturer':
    case 'role_wholesaler':
    case 'role_retailer':
      return [
        {
          text: 'Great. Aapka existing business mainly kahan hota hai?',
          quickReplies: [
            { id: 'biz_offline', label: 'Mostly Offline / Distributors' },
            { id: 'biz_online', label: 'Already sell online' },
            { id: 'biz_both', label: 'Both' },
          ],
        },
      ]
    case 'biz_offline':
    case 'biz_online':
    case 'biz_both':
      return [
        {
          text: `MEESHO सारथी aapki onboarding mein step-by-step help karega.

Sensitive documents WhatsApp/chat par share karne ki zarurat nahi hai.`,
        },
        { card: 'onboarding', delay: 700 },
      ]

    // ---- Flow 2: Demand ----
    case 'check_demand':
    case 'analyse_products':
      return [
        {
          text: 'Kaunsi category manufacture karte hain?',
          quickReplies: [
            { id: 'cat_women_fashion', label: 'Women Fashion' },
            { id: 'cat_home_kitchen', label: 'Home & Kitchen' },
            { id: 'cat_footwear', label: 'Footwear' },
            { id: 'cat_electronics', label: 'Electronics' },
            { id: 'cat_beauty', label: 'Beauty' },
            { id: 'cat_other', label: 'Other' },
          ],
        },
      ]
    case 'show_demand_opportunities':
    case 'cat_women_fashion':
      return [
        { card: 'demand', payload: { category: 'women_fashion' }, delay: 700 },
        {
          text: 'Demand achhi hai. Lekin launch karne se pehle economics check karte hain.',
          quickReplies: [{ id: 'calculate_economics', label: 'Calculate My Economics →' }],
        },
      ]
    case 'cat_home_kitchen':
      return [
        { card: 'demand', payload: { category: 'home_kitchen' }, delay: 700 },
        {
          text: 'Demand achhi hai. Lekin launch karne se pehle economics check karte hain.',
          quickReplies: [{ id: 'calculate_economics', label: 'Calculate My Economics →' }],
        },
      ]
    case 'cat_footwear':
      return [
        { card: 'demand', payload: { category: 'footwear' }, delay: 700 },
        {
          text: 'Demand achhi hai. Lekin launch karne se pehle economics check karte hain.',
          quickReplies: [{ id: 'calculate_economics', label: 'Calculate My Economics →' }],
        },
      ]
    case 'cat_electronics':
    case 'cat_beauty':
    case 'cat_other':
      return [
        {
          text: 'Is category ke liye detailed demand data abhi taiyaar ho raha hai. Filhaal Women Fashion sabse rich insights deta hai.',
          quickReplies: [
            { id: 'cat_women_fashion', label: 'Show Women Fashion demand' },
            { id: 'find_price', label: 'Find Right Selling Price' },
          ],
        },
      ]

    // ---- Flow 3: Pricing / economics ----
    case 'find_price':
    case 'calculate_economics':
      return [
        {
          text: 'What is your manufacturing cost per unit?',
          quickReplies: [
            { id: 'cost_200', label: '₹200' },
            { id: 'cost_250', label: '₹250' },
            { id: 'cost_300', label: '₹300' },
            { id: 'cost_manual', label: 'Enter manually' },
          ],
        },
      ]
    case 'cost_200':
    case 'cost_250':
    case 'cost_300': {
      const cost = Number(actionId.split('_')[1])
      return pricingSteps(cost)
    }
    case 'cost_manual':
      return [
        {
          text: 'Zaroor. Apni manufacturing cost per unit type karke bhejiye (e.g. 275). Main turant economics bana dunga.',
        },
      ]
    case 'start_pilot':
      return [
        {
          text: `Shandaar! 🚀 Pilot setup ho raha hai...

Aapka product ₹399 par draft ho gaya hai. Ab main aapke business performance par nazar rakhunga.`,
          quickReplies: [{ id: 'check_business', label: 'Check My Business →' }],
        },
      ]

    // ---- Flow 4: Business dashboard ----
    case 'check_business':
      return [
        { card: 'dashboard', delay: 700 },
        {
          text: 'Yeh aaj ka business snapshot hai. Aage kya karna chahenge?',
          quickReplies: [
            { id: 'see_product_perf', label: 'See Product Performance' },
            { id: 'fix_rto', label: 'Fix RTO' },
            { id: 'grow_orders', label: 'Grow Orders' },
          ],
        },
      ]
    case 'see_product_perf':
      return [
        { card: 'product-perf', delay: 600 },
        {
          text: 'Blue Cotton Kurti par sabse zyada RTO hai. Isko theek karne se overall returns kaafi kam ho sakte hain.',
          quickReplies: [
            { id: 'fix_rto', label: 'Fix RTO' },
            { id: 'grow_orders', label: 'Grow Orders' },
          ],
        },
      ]
    case 'grow_orders':
      return [
        {
          text: `Orders grow karne ke liye 3 quick wins:

1. Top kurti ke 4-5 naye colour variants add karein.
2. Festive combo (kurti + dupatta) launch karein.
3. High-demand SKU par price ₹399 par competitive rakhein.`,
          quickReplies: [
            { id: 'check_demand', label: 'Check Product Demand' },
            { id: 'find_price', label: 'Find Right Selling Price' },
          ],
        },
      ]

    // ---- Flow 5: RTO / returns ----
    case 'reduce_rto':
    case 'fix_rto':
      return [
        { text: 'Main aapke return reasons analyse kar raha hoon…', delay: 500 },
        { card: 'rto', delay: 1600 },
        {
          text: 'Yeh aapke returns kam karne ka sabse effective tareeka hai.',
          quickReplies: [
            { id: 'show_affected', label: 'Show Affected Products' },
            { id: 'next_reco', label: 'Next Recommendation' },
          ],
        },
      ]
    case 'show_affected':
      return [
        { card: 'product-perf', delay: 600 },
        {
          text: 'In 3 SKUs par size chart improve karne se size-mismatch returns sabse tezi se girenge.',
          quickReplies: [{ id: 'next_reco', label: 'Next Recommendation' }],
        },
      ]
    case 'next_reco':
      return [
        {
          text: `Agli recommendation:

Delivery failure (24%) kam karne ke liye — address confirmation SMS aur COD verification enable karein.`,
          quickReplies: [{ id: 'check_business', label: 'Back to Business Pulse' }],
        },
      ]

    // ---- Flow 6: Ask Sahayak ----
    case 'ask_sahayak':
      return [
        {
          text: `Zaroor! 💬 Aap mujhse kuch bhi puch sakte hain — onboarding, product demand, pricing, orders ya returns ke baare mein.

Neeche message box mein type karke bhejiye.`,
        },
      ]

    default:
      return [fallbackStep()]
  }
}

export function pricingSteps(cost: number): BotStep[] {
  return [
    { card: 'pricing', payload: { cost }, delay: 700 },
    {
      text: '₹399 par aap competitive bhi rahenge aur positive contribution maintain kar sakte hain.',
      quickReplies: [{ id: 'start_pilot', label: 'Start Pilot →' }],
    },
  ]
}

export function fallbackStep(): BotStep {
  return {
    text: `Main aapki help kar sakta hoon:
• Meesho onboarding
• Product demand
• Pricing
• Orders & business performance
• Returns / RTO

Aap kis area mein help chahte hain?`,
    quickReplies: MAIN_MENU,
  }
}

// Simple keyword router for the free-text composer.
// Returns an action id, a numeric-cost signal, or null for the fallback.
export function routeFreeText(raw: string): { kind: 'action'; id: string } | { kind: 'cost'; value: number } | null {
  const text = raw.toLowerCase().trim()

  const numericMatch = text.match(/(\d{2,5})/)
  if (numericMatch && /(price|cost|margin|rupee|rs|₹|manufactur)/.test(text)) {
    return { kind: 'cost', value: Number(numericMatch[1]) }
  }
  // A bare number on its own (e.g. after "Enter manually") is treated as cost.
  if (/^₹?\s*\d{2,5}$/.test(text)) {
    return { kind: 'cost', value: Number(text.replace(/[^\d]/g, '')) }
  }

  if (/(sell|start|onboard)/.test(text)) return { kind: 'action', id: 'start_selling' }
  if (/(demand|product|what should i sell|kya bech)/.test(text)) return { kind: 'action', id: 'check_demand' }
  if (/(price|margin|cost|pricing)/.test(text)) return { kind: 'action', id: 'find_price' }
  if (/(order|dashboard|business|revenue)/.test(text)) return { kind: 'action', id: 'check_business' }
  if (/(return|rto)/.test(text)) return { kind: 'action', id: 'reduce_rto' }

  return null
}
