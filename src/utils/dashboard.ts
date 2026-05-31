export type DashboardCardTone = 'emerald' | 'blue' | 'amber' | 'rose'

export type DashboardSummaryCard = {
  title: string
  value: string
  change: string
  caption: string
  tone: DashboardCardTone
}
