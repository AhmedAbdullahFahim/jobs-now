import { ReactNode } from 'react'
import Navbar from '../../components/navbar'
import styles from './index.module.scss'
import Search from '../../components/search'

type Props = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
}

const NavbarWithSearch = ({ children }: Props) => {
  return (
    <main className={styles.main}>
      <div className={styles.navSearchContainer}>
        <Navbar />
        <Search />
      </div>
      {children}
    </main>
  )
}

export default NavbarWithSearch
