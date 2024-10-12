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
    ({ movement: [mx], last, memo = ref.current?.scrollLeft || 0, active }) => {
      if (!active) {
        isDraggingRef.current = false
        setIsDragging(false)
      } else {
        if(!isDraggingRef.current) {
          setIsDragging(true)
        }
        isDraggingRef.current = true
      }

      if(!ref.current) {
        return
      }
      
      if (Math.abs(mx) > threshold || last) {
        if (active) {
          ref.current.scrollLeft = memo - mx
        } else if (last) {
          ref.current.scrollBy({
            left: -mx * 3, // Adjust the multiplier for a smoother release
            behavior: 'smooth',
          })
        }
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
