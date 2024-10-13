import { useRef, useState } from 'react'
import classNames from 'classnames'
import { FilmsCarousel } from 'components/filmsCarousel'
import SearchPNG from 'assets/icons/Search.png'
import HomePNG from 'assets/icons/Home.png'
import MoviePNG from 'assets/icons/Movie.png'
import SmilePNG from 'assets/icons/Smile.png'
import WatchLaterPNG from 'assets/icons/WatchLater.png'
import TapePNG from 'assets/icons/Tape.png'
import styles from "./styles.module.css"

function App() {
  const targetRef = useRef<HTMLDivElement>(null)
  const closeElemRef = useRef<HTMLDivElement>(null)
  const [isMobileHovered, setIsMobileHovered] = useState(false)

  return (
    <div className={styles.App}>
      <div
        className={classNames(styles.Sidebar, {[styles.mobileHover]: isMobileHovered})}
        ref={targetRef}
        onClick={(e) => {
          if(e.target === closeElemRef.current) return
          setIsMobileHovered(true)
        }}
      >
        <div className={styles.Overlay}/>
        <div className={styles.SidebarContent}>
          <div
          ref={closeElemRef}
          className={styles.MobileClose}
          onClick={() => {
            setIsMobileHovered(false)
          }}
          >Close Me</div>
          <div className={styles.MenuItemsList}>
            <div className={styles.MenuItem}>
              <img src={SearchPNG} alt="Search" />
              <p className={styles.MenuItemText}>Search</p>
            </div>
            <div className={styles.MenuItem}>
              <img src={HomePNG} alt="Home" />
              <p className={styles.MenuItemText}>Home</p>
            </div>
            <div className={styles.MenuItem}>
              <img src={MoviePNG} alt="TV Shows" />
              <p className={styles.MenuItemText}>TV Shows</p>
            </div>
            <div className={styles.MenuItem}>
              <img src={TapePNG} alt="Movies" />
              <p className={styles.MenuItemText}>Movies</p>
            </div>
            <div className={styles.MenuItem}>
              <img src={SmilePNG} alt="Genres" />
              <p className={styles.MenuItemText}>Genres</p>
            </div>
            <div className={styles.MenuItem}>
              <img src={WatchLaterPNG} alt="Watch Later" />
              <p className={styles.MenuItemText}>Watch Later</p>
            </div>
          </div>
        <div className={styles.SidebarFooter}>

        </div>
        </div>
      </div>
      <div className={styles.Main}>

      </div>
      <FilmsCarousel/>
    </div>
  )
}

export default App
