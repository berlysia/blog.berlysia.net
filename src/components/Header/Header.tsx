import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <nav className={styles.container}>
      <div>
        <h1>
          <Link href="/">blog.berlysia.net</Link>
        </h1>
      </div>
      <div>
        <div className={styles.home}>
          <Link passHref href="https://berlysia.net/">
            <a>
              <Image
                className={styles.avatar}
                src="/avatar.jpg"
                alt="avatar"
                width="40px"
                height="40px"
              />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
