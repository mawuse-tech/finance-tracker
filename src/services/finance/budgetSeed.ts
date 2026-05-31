import type { BudgetProgressItem } from '../../utils/budget'

export const budgetProgressItems: BudgetProgressItem[] = [
  {
    name: 'Food and dining',
    spent: '$840',
    limit: '$1,100',
    progress: 'w-3/4',
    color: 'bg-emerald-500',
  },
  {
    name: 'Transport',
    spent: '$320',
    limit: '$500',
    progress: 'w-2/3',
    color: 'bg-blue-500',
  },
  {
    name: 'Entertainment',
    spent: '$410',
    limit: '$450',
    progress: 'w-11/12',
    color: 'bg-amber-500',
  },
]
