export type SupportedFinanceChartType = 'bar' | 'doughnut'

export type FinanceChartDataset = {
  label: string
  data: number[]
  backgroundColor: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  borderRadius?: number
  maxBarThickness?: number
  hoverOffset?: number
}
