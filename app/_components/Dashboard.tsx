import isValidUrl from "../_utils/is-valid-url";
import InvalidUrl from "./_dashboard-components/InvalidUrl";

export default function Dashboard({ url }: { url: string }) {
  // We might ask, why validate the url again on this route? Haven't we already validated it on "/"? Yes, we have. But we have to take into account that not all users will come to this route from "/" with a validated url. Some users might directly enter http://our-nice-site.com/?url=http://example.com in their browser's address bar. So we have to validate the url again here. If the url is invalid, we will prompt them to go back to the homepage.

  // Guard clause for invalid URLs
  if (!isValidUrl({ url })) {
    return <InvalidUrl />;
  }

  // If user left a trailing slash
  if (url.endsWith("/")) {
    return <InvalidUrl />;
  }

  // TODO: Look into SWR, suspense, loading state, masonry layout, and error handling for the dashboard data fetching
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Viewing data for URL: {url}</p>
    </main>
  );
}
