import Header from "#components/Header";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  c.status(404);
  return c.render(
    <div>
      <Header>
        <div className="tw-shrink tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
        </div>
      </Header>
      <div className="articleWrapper">
        <div className="tw-w-full tw-relative tw-max-w-screen-lg">
          <article className="article">
            <section className="main-text-section">
              <h1>404 - Not Found</h1>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
});
