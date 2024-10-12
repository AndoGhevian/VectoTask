import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

/**
 * this hook handles 2 cases:
 *   - the case when the ref has changed and the parent has re-rendered: in this case the hook state is reset
 *   - the case when the ref remains the same but the ref.current has changed: in this case the hook state is preserved
*/
export const useDraggableScroll = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [isDragging, setIsDragging] = useState(false)

  const dragScrollInfoRef = useMemo(() => ({
    current: {
      isDragging,
      startX: 0,
      scrollLeft: 0,
    }
  }), [ref])

  const onDragScrollStart = useCallback((e: MouseEvent) => {
    if(!e.currentTarget) {
      return
    }
    const target = e.currentTarget as HTMLElement
    const dragInfo = dragScrollInfoRef.current

    dragInfo.isDragging = true;
    dragInfo.startX = e.pageX - target.offsetLeft;
    dragInfo.scrollLeft = target.scrollLeft;
    setIsDragging(true)
  }, [ref])

  const onDragScrollEnd = useCallback((e: MouseEvent) => {
    if(!e.currentTarget) {
      return
    }

    const dragInfo = dragScrollInfoRef.current
    if(!dragInfo.isDragging) {
      return
    }

    dragInfo.isDragging = false;
    setIsDragging(false)
  }, [ref])

  const onDragScroll = useCallback((e: MouseEvent) => {
    if(!e.currentTarget) {
      return
    }

    const dragInfo = dragScrollInfoRef.current
    if (!dragInfo.isDragging) {
      return
    }
    e.preventDefault();

    const target = e.currentTarget as HTMLElement
    const x = e.pageX - target.offsetLeft
    const walkX = x - dragInfo.startX
    target.scrollLeft = dragInfo.scrollLeft - walkX
  }, [ref])

  useEffect(() => {
    if(!ref.current) {
      return
    }

    const elem = ref.current

    elem.addEventListener('mousedown', onDragScrollStart)
    elem.addEventListener('mouseup', onDragScrollEnd)
    elem.addEventListener('mouseleave', onDragScrollEnd)
    elem.addEventListener('mousemove', onDragScroll)

    return () => {
      elem.removeEventListener('mousedown', onDragScrollStart)
      elem.removeEventListener('mouseup', onDragScrollEnd)
      elem.removeEventListener('mouseleave', onDragScrollEnd)
      elem.removeEventListener('mousemove', onDragScroll)
    }
  })

  return {isDragging}
}
