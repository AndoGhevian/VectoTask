import {
  RefObject,
  useMemo,
  useState,
} from 'react'
import { useDrag } from '@use-gesture/react'

export const useDraggableScroll = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isDragging, setIsDragging] = useState(false)

  const threshold = 5
  const isDraggingRef = useMemo(() => ({
    current: false
  }), [ref])

  useDrag(
    ({ movement: [mx], memo = ref.current?.scrollLeft || 0, active }) => {
      if (!active) {
        isDraggingRef.current = false
        setIsDragging(false)
        return
      }

      if (!isDraggingRef.current) {
        setIsDragging(true)
      }
      isDraggingRef.current = true

      if (Math.abs(mx) > threshold && ref.current) {
        ref.current.scrollLeft = memo - mx
      }

      return memo
    },
    {
      target: ref,
      filterTaps: true,
    }
  )

  return { isDragging }
}
