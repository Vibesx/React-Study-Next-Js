import { useRouter } from "next/router";

function DetailsPage() {
  const router = useRouter();

  // router.query.<file_name> return the value of what the path contains after the root (in our case, /news/test will return test)
  console.log(router.query.newsId);
  return <h1>The details Page</h1>;
}

export default DetailsPage;
