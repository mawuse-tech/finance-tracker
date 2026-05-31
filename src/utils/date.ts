export const getTodayDate = () => new Date().toISOString().slice(0, 10)

export const formatDisplayDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
