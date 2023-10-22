/* eslint-disable @next/next/no-img-element -- 桁数を綺麗に反映させるのが難しい */
export default function HatenaBookmarkCounter({
  link,
  alt,
}: {
  readonly link: string;
  readonly alt?: string;
}) {
  return (
    <img
      className="tw-block tw-object-contain"
      src={`https://b.hatena.ne.jp/entry/image/${link}`}
      alt={alt ?? "はてなブックマーク"}
    />
  );
}
