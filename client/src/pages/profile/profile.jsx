import React from 'react'
import styles from './profile.module.css'
import Navbar from '../../components/navbar/navbar'


const profile = () => {
  return (
    <>
        <Navbar/>
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.content}>
                    <div className={styles.leftContent}></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default profile