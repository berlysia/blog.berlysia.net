import Header from "#components/Header";
import type { NotFoundHandler } from "hono";

const notFoundhandler: NotFoundHandler = (c) => {
  return c.render(
    <div>
      <Header>
        <div className="tw-shrink tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
        </div>
      </Header>
      <h1>404 - Not Found</h1>
    </div>
  );
};

export default notFoundhandler;
