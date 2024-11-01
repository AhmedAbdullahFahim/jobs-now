import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import { navbarData } from '../../data/navbarData'

const Navbar = () => {
  const location = useLocation()
  const currentPage: string =
    location.pathname.split('/')[location.pathname.split('/').length - 1]
  return (
    <nav className={styles.navbar}>
      <h4>JobsNow</h4>
      <ul>
        {navbarData.map((item) => (
          <li>
            <a
              href={item.href}
              className={
                item.href.split('/')[item.href.split('/').length - 1] ===
                currentPage
                  ? styles.activeLink
                  : ''
              }
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
