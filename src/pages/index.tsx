import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import type { InferGetStaticPropsType } from "next";
import { Head } from "../components/head";
import type { Article } from "../seeds";
import { getByGenre } from "../seeds";
import { ArticleLink } from "../components/ArticleLink/ArticleLink";
import { BlogMarble } from "../components/BlogMarble/BlogMarble";
import { SlideLink } from "../components/SlideLink/SlideLink";
import { FullHeightContainer } from "../components/FullHeightContainer/FullHeightContainer";

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
              <Talks />
              <div className="tw-h-8"></div>
              <ArticleArea
                genreTitle="Tech Articles"
                articles={props.techArticles}
              />
            </div>
            <div className="tw-w-full md:tw-w-1/2 tw-flex-shrink-0 tw-flex-grow tw-p-6">
              <ArticleArea
                genreTitle="IM@S Articles"
                articles={props.imasArticles}
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
            <ArticleLink
              href={link}
              title={title}
              pubDateString={pubDateString}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const BLOGS = [
  {
    title: "Hatena Blog",
    href: "https://berlysia.hatenablog.com/",
  },
  {
    title: "Zenn",
    href: "https://zenn.dev/berlysia",
  },
  {
    title: "Qiita",
    href: "https://qiita.com/berlysia",
  },
] as const;
const ArticleLinks = () => (
  <div className="tw-mt-6">
    {BLOGS.map(({ href, title }) => (
      <BlogMarble key={href} href={href} title={title} />
    ))}
  </div>
);

const talks = [
  {
    eventTitle: "iCARE Dev Meetup #30",
    talkTitle: "N予備校とWebフロントエンドの新陳代謝",
    talkLink: "https://icare.connpass.com/event/237019/",
    slideLink: "https://speakerdeck.com/berlysia/icare-dev-meetup-number-30",
    pubDateString: "2022/02/16",
    talkArchiveLink: "https://youtu.be/VlE6hJme1Rc?t=1602",
  },
  {
    eventTitle: "ドワンゴ EdTech Talk",
    talkTitle: "N予備校のフロントエンド開発の取り組み",
    talkLink: "https://dwango.connpass.com/event/230731/",
    slideLink: undefined,
    pubDateString: "2021/12/08",
    talkArchiveLink: undefined,
  },
  {
    eventTitle: "Front-End Lounge #2「フロントエンドエンジニアのキャリア」",
    talkTitle: "後手から始まるフロントエンド（スポンサートーク）",
    talkLink: "https://forkwell.connpass.com/event/230632/",
    slideLink: undefined,
    pubDateString: "2021/12/06",
    talkArchiveLink: "https://www.youtube.com/watch?v=zw_bt_j2xW0",
  },
  {
    eventTitle: "JSConf JP 2021",
    talkTitle: "Webフロントエンドのリプレースを支えるテストの考え方",
    talkLink:
      "https://jsconf.jp/2021/talk/testing-approach-to-support-web-front-end-replacement",
    slideLink: "https://speakerdeck.com/berlysia/jsconf-jp-2021",
    pubDateString: "2021/11/27",
    talkArchiveLink:
      "https://www.youtube.com/watch?v=16ux8nTqJ7k&list=PL42hYWKFRfN7XWswj9wcC0j4191KNJuO3&index=1",
  },
  {
    eventTitle: "東京Node学園 29時限目",
    talkTitle: "rxjs v6 について",
    talkLink: "https://nodejs.connpass.com/event/78902/",
    slideLink: undefined,
    pubDateString: "2018/02/22",
    talkArchiveLink: undefined,
  },
] as const;

const Talks = () => (
  <div>
    <h2 className="tw-text-2xl tw-font-bold tw-mb-2">Tech Talks</h2>
    <ul className="tw-p-0">
      {talks.map(
        ({
          eventTitle,
          talkTitle,
          talkLink,
          slideLink,
          pubDateString,
          talkArchiveLink,
        }) => (
          <li
            key={talkLink}
            className="tw-text-base tw-border-0 tw-border-b tw-border-solid tw-border-gray-100"
          >
            <SlideLink
              eventTitle={eventTitle}
              talkTitle={talkTitle}
              talkLink={talkLink}
              slideLink={slideLink}
              pubDateString={pubDateString}
              talkArchiveLink={talkArchiveLink}
            />
          </li>
        )
      )}
    </ul>
  </div>
);

export default Index;
