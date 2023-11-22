import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/404.module.css';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Page not found</h1>
      <Image
        src="/rick-morty-404.webp"
        width={700}
        height={684}
        alt="Rick and Morty in unknown galaxy"
      />
      <Link className={styles.link} href="/">
        Return home
      </Link>
    </div>
  );
}
