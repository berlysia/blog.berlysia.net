import Link from "next/link";

export function Links() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">root</Link>
        </li>
        <li>
          <Link href="/articles">articles</Link>
        </li>
      </ul>
    </nav>
  );
}
