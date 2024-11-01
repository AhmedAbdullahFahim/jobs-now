import styles from './index.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h4>JobsNow</h4>
      <ul>
        <li>
          <a href='/jobs'>Home</a>
        </li>
        <li>
          <a href='/jobs/search'>Search</a>
        </li>
        <li>
          <a href='/jobs'>History</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
