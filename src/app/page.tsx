import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <p>
          Get started in staging
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
    </main>
  )
}
