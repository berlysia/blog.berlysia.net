export function BlogMarble({
  href,
  title,
}: {
  readonly href: string;
  readonly title: string;
}) {
  return (
    <a
      key={href}
      className="tw-mx-1 tw-p-1 tw-border-2 tw-border-solid tw-border-gray-400 tw-rounded-md"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  );
}
