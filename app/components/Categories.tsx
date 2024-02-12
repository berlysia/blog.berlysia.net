import clsx from "clsx";
import { getLocalArticles } from "#seeds/localReader";

const categories = [
  ...new Set(
    [
      "ALL",
      ...getLocalArticles().flatMap((x) => x.frontmatter.category),
      "tech",
      "imas",
    ].filter(Boolean)
  ),
];

export function Categories({
  currentCategory,
}: {
  readonly currentCategory?: (typeof categories)[number];
}) {
  return (
    <ul className="tw-flex tw-flex-row tw-mlb-1">
      {categories.map((category) => (
        <li
          key={category}
          className={clsx("tw-m-1 tw-border-pink-100 tw-border tw-rounded-md", {
            "tw-font-bold tw-text-white tw-bg-pink-500":
              category === currentCategory,
          })}
        >
          {category === "ALL" ? (
            <a className="tw-block tw-plb-2 tw-pli-4" href={`/all`}>
              {category}
            </a>
          ) : (
            <a
              className="tw-block tw-plb-2 tw-pli-4"
              href={`/category/${category}`}
            >
              {category}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
