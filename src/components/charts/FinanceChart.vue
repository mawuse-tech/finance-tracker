<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import type { ChartConfiguration, ChartOptions, TooltipItem } from 'chart.js'
import { formatCurrency } from '../../utils/currency'
import type { FinanceChartDataset, SupportedFinanceChartType } from '../../utils/chart'

const props = defineProps<{
  title: string
  description: string
  type: SupportedFinanceChartType
  labels: string[]
  datasets: FinanceChartDataset[]
}>()

const canvasElement = ref<HTMLCanvasElement | null>(null)
const chart = shallowRef<Chart<SupportedFinanceChartType, number[], string> | null>(null)

const hasData = computed(() =>
  props.datasets.some((dataset) => dataset.data.some((value) => value > 0)),
)

const chartOptions = computed<ChartOptions<SupportedFinanceChartType>>(() => {
  const baseOptions: ChartOptions<SupportedFinanceChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          color: '#475569',
          padding: 16,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<SupportedFinanceChartType>) => {
            const label = context.dataset.label ? `${context.dataset.label}: ` : ''
            const value = Number(context.raw ?? 0)

            return `${label}${formatCurrency(value)}`
          },
        },
      },
    },
  }

  if (props.type === 'bar') {
    return {
      ...baseOptions,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#64748b',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#e2e8f0',
          },
          ticks: {
            color: '#64748b',
            callback: (value) => formatCurrency(Number(value)),
          },
        },
      },
    } as ChartOptions<SupportedFinanceChartType>
  }

  return {
    ...baseOptions,
    cutout: '68%',
  } as ChartOptions<SupportedFinanceChartType>
})

const renderChart = async () => {
  await nextTick()

  chart.value?.destroy()
  chart.value = null

  if (!canvasElement.value || !hasData.value) {
    return
  }

  const chartConfig: ChartConfiguration<SupportedFinanceChartType, number[], string> = {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: props.datasets,
    },
    options: chartOptions.value,
  }

  chart.value = new Chart(canvasElement.value, chartConfig)
}

onMounted(renderChart)
onBeforeUnmount(() => {
  chart.value?.destroy()
})

watch(
  () => [props.type, props.labels, props.datasets],
  () => {
    void renderChart()
  },
  { deep: true },
)
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div>
      <h3 class="text-base font-semibold text-slate-950">{{ title }}</h3>
      <p class="mt-1 text-sm text-slate-500">{{ description }}</p>
    </div>

    <div class="mt-6 h-72">
      <canvas v-show="hasData" ref="canvasElement" :aria-label="title" role="img"></canvas>
      <div
        v-if="!hasData"
        class="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500"
      >
        Add transactions to view this chart.
      </div>
    </div>
  </article>
</template>
