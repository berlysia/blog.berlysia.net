import Index from "../components/pages/root";
import { getByGenre } from "../seeds/remoteReader";

const props = {
  imasArticles: getByGenre("imas", 6),
  techArticles: getByGenre("tech", 6),
};

export default function Root() {
  return <Index {...props} />;
}
