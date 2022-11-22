import { LinkMarbles } from "./LinkMarbles";

export const Profile = () => (
  <div className="tw-flex tw-flex-wrap tw-justify-center">
    <div className="tw-flex-shrink-0 tw-flex tw-justify-center tw-items-center">
      <img
        src="/avatar.jpg"
        alt="avatar"
        width={192}
        height={192}
        className="tw-rounded-full tw-border-4 tw-border-keyColor-100"
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
            <a
              className="tw-px-1 tw-inline"
              href="https://idollist.idolmaster-official.jp/search/detail/20046"
              style={{ backgroundColor: "#fbffb9" }}
            >
              Hinako Kita
            </a>
            ,{" "}
            <a
              className="tw-px-1 tw-inline"
              href="https://idollist.idolmaster-official.jp/search/detail/30016"
              style={{ backgroundColor: "#7f6575", color: "white" }}
            >
              Sayoko Takayama
            </a>
            .
          </li>
        </ul>
      </div>
      <LinkMarbles />
    </div>
  </div>
);
