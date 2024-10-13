import styles from './styles.module.css'

/**
 * Here and in the future components will define their own types,
 * they are not bound to any other layer of the application (e.g. api layer)
 * 
 * Even if it seems like unnecessary repetition, API and component types cannot be related in any way.
*/
export const FilmMiniPreview = ({
  title,
  image,
  onClick,
}: {
  title: string;
  image: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={styles.Card}
      onClick={onClick}
      onDragStart={(e) => {
      e.preventDefault()
    }}>
      <div className={styles.Image}>
        <img src={image} alt={title} />
      </div>
    </div>
  )
}
