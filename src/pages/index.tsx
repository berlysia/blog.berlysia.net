import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import type { InferGetStaticPropsType } from "next";
import { Head } from "../components/head";
import type { Article } from "../seeds";
import { getByGenre } from "../seeds";
import { ArticleLink } from "../components/ArticleLink/ArticleLink";
import { FullHeightContainer } from "../components/FullHeightContainer/FullHeightContainer";
import { Talks } from "../components/Talks";
import { ArticleLinks } from "../components/ArticleLinks";

export const getStaticProps = async ({ preview = false }) => {
  return {
    props: {
      preview,
      imasArticles: getByGenre("imas", 6),
      techArticles: getByGenre("tech", 6),
    },
  };
};

function Index(props: InferGetStaticPropsType<typeof getStaticProps>) {
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

const LinkMarbles = () => (
  <ul className="">
    <li>
      <a
        className="tw-underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/berlysia"
        aria-label="Twitter / berlysia"
      >
        Twitter
      </a>
    </li>
    <li>
      <a
        className="tw-underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/berlysia"
        aria-label="GitHub / berlysia"
      >
        GitHub
      </a>
    </li>
    <li>
      <a
        className="tw-underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://imastodon.net/@berlysia"
        aria-label="Imastodon / berlysia"
      >
        Im@stodon
      </a>
    </li>
  </ul>
);

const Profile = () => (
  <div className="tw-flex tw-flex-wrap tw-justify-center">
    <div className="tw-flex-shrink-0 tw-flex tw-justify-center tw-items-center">
      <Image
        priority
        quality={100}
        src="/avatar.jpg"
        alt="avatar"
        width={192}
        height={192}
        className="tw-rounded-full tw-border-4 tw-border-pink-100"
      />
    </div>
    <div className="tw-ml-3 tw-flex-col tw-justify-center">
      <h2 className="tw-mb-2 tw-text-2xl tw-font-bold">@berlysia</h2>
      <div className="tw-my-1">
        <h3 className="tw-my-1 tw-text-lg tw-font-bold">
          Web Developer (mainly frontend)
        </h3>
        <ul className="tw-my-1">
          <li>I love Web, browsers, and JavaScript.</li>
          <li></li>
        </ul>
      </div>
      <div className="tw-my-1">
        <h3 className="tw-my-1 tw-text-lg tw-font-bold">
          Idol Producer (a fan of THE IDOLM@STER)
        </h3>
        <ul className="tw-my-1">
          <li>
            PIC of{" "}
            <span
              className="tw-px-1 tw-inline"
              style={{ backgroundColor: "#fbffb9" }}
            >
              Hinako Kita
            </span>
            ,{" "}
            <span
              className="tw-px-1 tw-inline"
              style={{ backgroundColor: "#7f6575", color: "white" }}
            >
              Sayoko Takayama
            </span>
            .
          </li>
        </ul>
      </div>
      <LinkMarbles />
    </div>
  </div>
);

const ArticleArea = ({
  genreTitle,
  articles,
  withHatenaBookmark,
}: {
  genreTitle: string;
  articles: Article[];
  withHatenaBookmark?: boolean;
}) => {
  return (
    <div>
      <h2 className="tw-text-2xl tw-font-bold tw-mb-2">{genreTitle}</h2>
      <ul className="tw-p-0">
        {articles.map(({ link, title, pubDateString, siteTitle, siteUrl }) => (
          <li
            key={link}
            className="tw-text-base tw-border-0 tw-border-b tw-border-solid tw-border-gray-100"
          >
            <ArticleLink
              href={link}
              title={title}
              pubDateString={pubDateString}
              withHatenaBookmark={withHatenaBookmark}
              site={
                siteTitle && siteUrl
                  ? { title: siteTitle, url: siteUrl }
                  : undefined
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
