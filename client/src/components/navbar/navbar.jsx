import styles from './navbar.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <Link to="/">TECH_INTERNS</Link>
      </div>
      <div className={styles.navRight}>
        <Link to="/opportunities" className={styles.navItem}>INTERNSHIPS</Link>
        <Link to="/companies" className={styles.navItem}>COMPANIES</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className={styles.navItem}>PROFILE →</Link>
            <Link to="/" className={styles.navItem} onClick={logout}>LOGOUT</Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navItem}>LOGIN</Link>
            <Link to="/signup" className={styles.navItem}>SIGN UP</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
