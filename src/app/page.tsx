import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { Head } from "../components/head";
import { getByGenre } from "../seeds";
import { FullHeightContainer } from "../components/FullHeightContainer/FullHeightContainer";
import { Talks } from "../components/pages/root/Talks";
import { ArticleLinks } from "../components/pages/root/ArticleLinks";
import { ArticleArea } from "../components/pages/root/ArticleArea";
import { Profile } from "../components/pages/root/Profile";

function getArticles() {
  return {
    imasArticles: getByGenre("imas", 6),
    techArticles: getByGenre("tech", 6),
  };
}

export default function Page() {
  const props = getArticles();
  return (
    <div className="tw-flex tw-flex-col">
      <Head title="berlysia.net" />
      <FullHeightContainer className="tw-bg-pink-50">
        <Profile />
        <div className="tw-absolute tw-bottom-8 tw-h-8 tw-w-6 tw-text-3xl tw-animate-fade-blink">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </div>
      </FullHeightContainer>
      <FullHeightContainer className="tw-bg-white">
        <div className="tw-flex tw-flex-col tw-justify-center">
          <div className="tw-flex tw-flex-wrap md:tw-flex-row tw-flex-col">
            <div className="tw-w-full md:tw-w-1/2 tw-flex-shrink-0 tw-flex-grow tw-p-6">
              <Talks withHatenaBookmark />
              <div className="tw-h-8"></div>
              <ArticleArea
                genreTitle="Tech Articles"
                articles={props.techArticles}
                withHatenaBookmark
              />
            </div>
            <div className="tw-w-full md:tw-w-1/2 tw-flex-shrink-0 tw-flex-grow tw-p-6">
              <ArticleArea
                genreTitle="IM@S Articles"
                articles={props.imasArticles}
                withHatenaBookmark
              />
            </div>
          </div>
          <div className="tw-flex tw-justify-center">
            <ArticleLinks />
          </div>
        </div>
      </FullHeightContainer>
    </div>
  );
}
