import Link from "next/link";
import { Fragment } from "react";

function NewsPage() {
  return (
    <Fragment>
      <h1>The news Page</h1>
      <ul>
        <li>
          <Link href="/news/hello-world">Hello World!</Link>
        </li>
        <li>
          <Link href="/news/shawarma">Shawarma</Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
