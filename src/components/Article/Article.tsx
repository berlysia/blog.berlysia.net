import type { ReactNode } from "react";
import type { ArticleMeta } from "../../utils/ArticleValidator";
import styles from "./Article.module.scss";

export function Article({
  meta,
  children,
}: {
  meta: ArticleMeta;
  children?: ReactNode;
}) {
  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{meta.title}</h1>
      {meta.lastModified && <aside>last modified: {meta.lastModified}</aside>}
      <div className={styles.wrapper}>{children}</div>
    </article>
  );
}
