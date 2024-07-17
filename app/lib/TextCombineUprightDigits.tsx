/**
 * @example "abc123abc" -> "abc", <span class="tcu-digits">123</span>, "abc"
 * @param props
 * @param props.text 処理対象を含みうる全体文字列
 */
export default function TextCombineUprightDigits({
  text,
}: {
  readonly text: string;
}) {
  const parts = text.split(/((?<![\d,.])\b\d{1,3}\b(?![\d,.]))/);
  const newParts = [];
  for (const part of parts) {
    if (/^\d{1,3}$/.test(part)) {
      newParts.push(<span className="tcu-digits">{part}</span>);
    } else {
      newParts.push(part);
    }
  }
  return <>{newParts}</>;
}
