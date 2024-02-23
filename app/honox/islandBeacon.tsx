import type { FC, PropsWithChildren } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";

function MarkHasIsland({ children }: PropsWithChildren) {
  const c = useRequestContext();
  c.set("__importing_islands", true);
  return <>{children}</>;
}

// islandsのビルド時処理が動かなくなるので使えない
export function wrapForHasIslandDetection<T>(Component: FC<T>) {
  return function WrappedForHasIslandDetection(props: T) {
    if (import.meta.env.SSR) {
      return (
        <MarkHasIsland>
          <Component {...props} />
        </MarkHasIsland>
      );
    }
    return <Component {...props} />;
  };
}

export function WrapForHasIslandDetection({ children }: PropsWithChildren) {
  if (import.meta.env.SSR) {
    return <MarkHasIsland>{children}</MarkHasIsland>;
  }
  return <>{children}</>;
}
