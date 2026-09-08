export type Role = 'bot' | 'user'

export type CardKind =
  | 'onboarding'
  | 'demand'
  | 'pricing'
  | 'dashboard'
  | 'rto'
  | 'product-perf'

export interface QuickReply {
  id: string
  label: string
}

export interface ChatMessage {
  id: string
  role: Role
  text?: string
  card?: CardKind
  /** Arbitrary payload for cards (e.g. category key, pricing cost). */
  payload?: Record<string, unknown>
  quickReplies?: QuickReply[]
  time: string
}

/** A single scripted bot turn: typing indicator, then a rendered message. */
export interface BotStep {
  text?: string
  card?: CardKind
  payload?: Record<string, unknown>
  quickReplies?: QuickReply[]
  /** Milliseconds the typing indicator is shown before the message appears. */
  delay?: number
}
