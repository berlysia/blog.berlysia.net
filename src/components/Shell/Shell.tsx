import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./Shell.module.scss";

export function Shell({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
