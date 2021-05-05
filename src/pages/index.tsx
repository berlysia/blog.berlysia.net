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
    <div className="flex flex-col">
      <Head title="berlysia.net" />
      <div className="flex justify-center items-center min-h-screen p-6 bg-pink-50">
        <Profile />
        <div className="absolute bottom-0 mb-4 text-3xl animate-fade-blink">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen p-6 bg-white">
        <Articles
          imasArticles={props.imasArticles}
          techArticles={props.techArticles}
        />
      </div>
    </div>
  );
}

const LinkMarbles = () => (
  <div className="flex flex-row mt-2">
    <a
      className="m-1"
      rel="me noopener noreferrer"
      target="_blank"
      href="https://twitter.com/berlysia"
      aria-label="Twitter / berlysia"
    >
      <div className="relative text-base w-8 h-8 rounded-full border border-gray-400">
        <FontAwesomeIcon
          className="absolute m-auto top-0 left-0 right-0 bottom-0"
          icon={faTwitter}
        />
      </div>
    </a>
    <a
      className="m-1"
      rel="me noopener noreferrer"
      target="_blank"
      href="https://github.com/berlysia"
      aria-label="GitHub / berlysia"
    >
      <div className="relative text-base w-8 h-8 rounded-full border border-gray-400">
        <FontAwesomeIcon
          className="absolute m-auto top-0 left-0 right-0 bottom-0"
          icon={faGithub}
        />
      </div>
    </a>
    <a
      className="m-1"
      rel="me noopener noreferrer"
      target="_blank"
      href="https://imastodon.net/@berlysia"
      aria-label="Imastodon / berlysia"
    >
      <div className="relative text-base w-8 h-8 rounded-full border border-gray-400">
        <FontAwesomeIcon
          className="absolute m-auto top-0 left-0 right-0 bottom-0"
          icon={faMastodon}
        />
      </div>
    </a>
  </div>
);

const Profile = () => (
  <div className="flex flex-wrap justify-center">
    <div className="flex-shrink-0 flex justify-center items-center">
      <Image
        priority
        quality={100}
        src="/avatar.jpg"
        alt="avatar"
        width={192}
        height={192}
        className="rounded-full border-4 border-pink-100"
      />
    </div>
    <div className="ml-3 flex-col justify-center">
      <h2 className="mb-2 text-2xl font-bold">@berlysia</h2>
      <div className="my-1">
        <h3 className="my-1 text-lg font-bold">
          Web Developer (mainly frontend)
        </h3>
        <ul className="my-1">
          <li>I love Web, browsers, and JavaScript.</li>
        </ul>
      </div>
      <div className="my-1">
        <h3 className="my-1 text-lg font-bold">
          Idol Producer (a fan of THE IDOLM@STER)
        </h3>
        <ul className="my-1">
          <li>
            PIC of{" "}
            <span
              className="px-1 inline"
              style={{ backgroundColor: "#fbffb9" }}
            >
              Hinako Kita
            </span>
            ,{" "}
            <span
              className="px-1 inline"
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
      <h2 className="text-2xl font-bold mb-2">{genreTitle}</h2>
      <ul className="p-0">
        {articles.map(({ link, title, pubDateString }) => (
          <li
            key={link}
            className="text-base border-0 border-b border-solid border-gray-100"
          >
            <a
              className="block rounded-md py-2 text-blue-600 visited:text-purple-800 hover:bg-gray-50 focus:bg-gray-50"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-current underline">{title}</div>
              <div className="text-current text-right text-xs">
                <time dateTime={pubDateString}>{pubDateString}</time>
              </div>
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
  <div className="flex flex-col justify-center">
    <div className="flex flex-wrap">
      <div className="w-1/2 flex-shrink-0 flex-grow p-6">
        <ArticleArea genreTitle="Tech Articles" articles={techArticles} />
      </div>
      <div className="w-1/2 flex-shrink-0 flex-grow p-6">
        <ArticleArea genreTitle="IM@S Articles" articles={imasArticles} />
      </div>
    </div>
    <div className="flex justify-center">
      <div className="mt-6">
        <a
          className="mx-1 p-1 border-2 border-solid border-gray-400 rounded-md"
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
          className="mx-1 p-1 border-2 border-solid border-gray-400 rounded-md"
        >
          Zenn
        </a>
        <a
          href="https://qiita.com/berlysia"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 p-1 border-2 border-solid border-gray-400 rounded-md"
        >
          Qiita
        </a>
      </div>
    </div>
  </div>
);

export default Index;
