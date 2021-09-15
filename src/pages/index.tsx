import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faMastodon,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import type { InferGetStaticPropsType } from "next";
import { Head } from "../components/head";
import type { Article } from "../seeds";
import { getByGenre } from "../seeds";

export const getStaticProps = async ({ preview = false }) => {
  return {
    props: {
      preview,
      imasArticles: getByGenre("imas"),
      techArticles: getByGenre("tech"),
    },
  };
};

function Index(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="tw-flex tw-flex-col">
      <Head title="berlysia.net" />
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-p-6 tw-bg-pink-50">
        <Profile />
        <div className="tw-absolute tw-bottom-0 tw-mb-4 tw-text-3xl tw-animate-fade-blink">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </div>
      </div>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-p-6 tw-bg-white">
        <Articles
          imasArticles={props.imasArticles}
          techArticles={props.techArticles}
        />
      </div>
    </div>
  );
}

const LinkMarbles = () => (
  <div className="tw-flex tw-flex-row mt-2">
    <a
      className="tw-m-1"
      rel="me noopener noreferrer"
      target="_blank"
      href="https://twitter.com/berlysia"
      aria-label="Twitter / berlysia"
    >
      <div className="tw-relative tw-text-base tw-w-8 tw-h-8 tw-p-2 tw-rounded-full tw-border tw-border-gray-400">
        <div className="tw-relative tw-w-full tw-h-full">
          <FontAwesomeIcon
            className="tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0"
            icon={faTwitter}
          />
        </div>
      </div>
    </a>
    <a
      className="tw-m-1"
      rel="me noopener noreferrer"
      target="_blank"
      href="https://github.com/berlysia"
      aria-label="GitHub / berlysia"
    >
      <div className="tw-relative tw-text-base tw-w-8 tw-h-8 tw-p-2 tw-rounded-full tw-border tw-border-gray-400">
        <div className="tw-relative tw-w-full tw-h-full">
          <FontAwesomeIcon
            className="tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0"
            icon={faGithub}
          />
        </div>
      </div>
    </a>
    <a
      className="tw-m-1"
      rel="me noopener noreferrer"
      target="_blank"
      href="https://imastodon.net/@berlysia"
      aria-label="Imastodon / berlysia"
    >
      <div className="tw-relative tw-text-base tw-w-8 tw-h-8 tw-p-2 tw-rounded-full tw-border tw-border-gray-400">
        <div className="tw-relative tw-w-full tw-h-full">
          <FontAwesomeIcon
            className="tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0"
            icon={faMastodon}
          />
        </div>
      </div>
    </a>
  </div>
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
}: {
  genreTitle: string;
  articles: Article[];
}) => {
  return (
    <div>
      <h2 className="tw-text-2xl tw-font-bold tw-mb-2">{genreTitle}</h2>
      <ul className="tw-p-0">
        {articles.map(({ link, title, pubDateString }) => (
          <li
            key={link}
            className="tw-text-base tw-border-0 tw-border-b tw-border-solid tw-border-gray-100"
          >
            <a
              className="tw-block tw-rounded-md tw-py-2 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
              <time
                className="tw-block tw-text-right tw-text-xs tw-no-underline"
                dateTime={pubDateString}
              >
                {pubDateString}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Articles = ({
  imasArticles,
  techArticles,
}: {
  imasArticles: Article[];
  techArticles: Article[];
}) => (
  <div className="tw-flex tw-flex-col tw-justify-center">
    <div className="tw-flex tw-flex-wrap md:tw-flex-row tw-flex-col">
      <div className="tw-w-full md:tw-w-1/2 tw-flex-shrink-0 tw-flex-grow tw-p-6">
        <ArticleArea genreTitle="Tech Articles" articles={techArticles} />
      </div>
      <div className="tw-w-full md:tw-w-1/2 tw-flex-shrink-0 tw-flex-grow tw-p-6">
        <ArticleArea genreTitle="IM@S Articles" articles={imasArticles} />
      </div>
    </div>
    <div className="tw-flex tw-justify-center">
      <div className="tw-mt-6">
        <a
          className="tw-mx-1 tw-p-1 tw-border-2 tw-border-solid tw-border-gray-400 tw-rounded-md"
          href="https://berlysia.hatenablog.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hatena Blog
        </a>
        <a
          href="https://zenn.dev/berlysia"
          target="_blank"
          rel="noopener noreferrer"
          className="tw-mx-1 tw-p-1 tw-border-2 tw-border-solid tw-border-gray-400 tw-rounded-md"
        >
          Zenn
        </a>
        <a
          href="https://qiita.com/berlysia"
          target="_blank"
          rel="noopener noreferrer"
          className="tw-mx-1 tw-p-1 tw-border-2 tw-border-solid tw-border-gray-400 tw-rounded-md"
        >
          Qiita
        </a>
      </div>
    </div>
  </div>
);

export default Index;
