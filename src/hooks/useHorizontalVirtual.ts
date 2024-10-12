import { RefObject, useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

export const useHorizontalVirtual = <T extends any>({
  parentRef,
  queryFn,
  queryKey,
  estimateItemSize,
  limit,
  measureElement,
  overscan,
  initialOffset,
}: {
  parentRef: RefObject<HTMLElement>,
  queryFn: (pageParam: {
    offset: number;
    limit: number;
  }) => Promise<{
    items: T[];
    offset: number;
    totalCount: number;
    limit: number;
  }>
  queryKey: string[];
  estimateItemSize: (index: number) => number,
  limit: number;
  measureElement?: (element: HTMLElement) => number,
  overscan?: number;
  initialOffset?: number;
}) => {
  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: (ctx) => queryFn({
      offset: ctx.pageParam,
      limit,
    }),
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length
      if(nextOffset < lastPage.totalCount) {
        return nextOffset
      }
    },
    initialPageParam: initialOffset || 0,
  })

  const allItems = useMemo(() => (
    data ? data.pages.flatMap((d) => d.items) : []
  ), [data])    

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allItems.length + 1 : allItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: estimateItemSize,
    measureElement,
    overscan,
    horizontal: true,
  })
  const virtualItems = useMemo(() => [...virtualizer.getVirtualItems()], [virtualizer.getVirtualItems()])

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1]

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allItems.length,
    isFetchingNextPage,
    virtualItems,
  ])

  const normVirtualItems = useMemo(() => (
    virtualItems.map((item) => ({
      index: item.index,
      start: item.start,
      width: item.size,
    })
  )), [virtualItems])

  const normStatus: "error" | "loading" | "success" =
    status === "pending" ? "loading" :
    status === "error" ? "error" :
    status === "success" ? "success"
    : "loading"

  return {
    virtualItems: normVirtualItems,
    totalWidth: virtualizer.getTotalSize(),
    items: allItems,
    totalCount: data?.pages[0].totalCount,
    status: normStatus,
    isFetchingNextPage,
    hasNextPage,
    isScrolling: virtualizer.isScrolling,
  }
}
