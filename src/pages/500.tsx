import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/404-500.module.css';

export default function ServerErrorPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Internal Server Error</h1>
      <Image
        alt="Rick and Morty in unpleasant situation"
        height={438}
        src="/rick-morty-500.webp"
        width={780}
      />
      <Link className={styles.link} href="/">
        Return home
      </Link>
    </div>
  );
}
