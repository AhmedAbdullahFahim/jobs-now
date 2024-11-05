import { useEffect, useState } from 'react'

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 500)

    return () => clearTimeout(timeout)
  }, [value])

  return debouncedValue
}
