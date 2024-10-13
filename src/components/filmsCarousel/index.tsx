import { useRef } from 'react'
import { getFilms, setFeaturedFilm } from 'api/getFilms'
import { useDraggableScroll } from 'hooks/useDraggableScroll'
import { useHorizontalVirtual } from 'hooks/useHorizontalVirtual'
import { FilmMiniPreview } from 'components/filmMiniPreview'
import styles from "./styles.module.css"

export const FilmsCarousel = () => {
  const parentRef = useRef<HTMLDivElement>(null)
  const {
    status,
    virtualItems,
    items,
    totalWidth
  } = useHorizontalVirtual({
    parentRef,
    queryKey: ['films'],
    queryFn: (params) => getFilms({limit: params.limit, offset: params.offset}),
    estimateItemSize: () => 216,
    limit: 8,
    overscan: 50,
    paddingStart: 160
  })

  const {isDragging} = useDraggableScroll(parentRef)

  return status === 'success' ? (
    <div
      ref={parentRef}
      className={styles.Carousel}
      style={{
        cursor: isDragging ? 'grabbing' : 'pointer',
        touchAction: "none", // for use-gesture
      }}
    >
      <div
        className={styles.List}
        style={{ width: `${totalWidth}px` }}
      >
        {virtualItems.map((virtualItem) => {
          const isLoaderRow = virtualItem.index > items.length - 1
          const filmPreview = items[virtualItem.index]

          return !isLoaderRow ? (
            <div
              className={styles.ListItem}
              key={virtualItem.index}
              style={{
                width: `${virtualItem.width}px`,
                transform: `translateX(${virtualItem.start}px)`,
              }}
            >
              <FilmMiniPreview
                title={filmPreview.title}
                image={filmPreview.image}
                onClick={() => {
                  setFeaturedFilm(filmPreview.id)
                }}
              />
            </div>
          ) : null
        })}
      </div>
    </div>
  ) : null
}
