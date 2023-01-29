import { SlideLink } from "./SlideLink/SlideLink";

const talks = [
  {
    eventTitle: "JSConf JP 2022",
    talkTitle:
      "自然発生した実装パターンに、マイクロフロントエンドと名がつきました",
    talkLink: "https://jsconf.jp/2022/talk/sponsor-talk-dwango",
    slideLink: "https://speakerdeck.com/berlysia/jsconf-jp-2022",
    pubDateString: "2021/11/27",
    talkArchiveLink: "https://www.youtube.com/watch?v=IhPGvFal15E",
  },
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
export const Talks = ({
  withHatenaBookmark,
}: {
  withHatenaBookmark?: boolean;
}) => (
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
              withHatenaBookmark={withHatenaBookmark}
            />
          </li>
        )
      )}
    </ul>
  </div>
);
