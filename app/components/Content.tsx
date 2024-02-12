import { Categories } from "#components/Categories";
import { PropsWithChildren } from "hono/jsx";

export function Content({
  children,
  currentCategory,
}: PropsWithChildren<{
  readonly currentCategory?: string;
}>) {
  return (
    <div className="tw-max-w-screen-lg tw-w-full tw-h-full tw-relative tw-pli-4">
      <Categories currentCategory={currentCategory} />
      {children}
    </div>
  );
}
