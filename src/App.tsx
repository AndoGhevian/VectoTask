import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { getFilms, getFeaturedFilm, setFeaturedFilm } from 'api/getFilms'
import styles from "./styles.module.css"

function App() {
  useEffect(() => {
    getFilms({ limit: 10, offset: 1 }).then((data) => {
      console.log("films", data)
    })
    setFeaturedFilm("2").then(async () => {
      const featured = await getFeaturedFilm()
      console.log("featrued", featured)
    })
  }, [])
  return (
    <div className={styles.App}>Hello World</div>
  )
}

export default App
