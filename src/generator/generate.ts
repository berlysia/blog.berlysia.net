import { renderToString } from 'react-dom/server';

export default function generate(reactElement: JSX.Element) {
  return renderToString(reactElement);
}
