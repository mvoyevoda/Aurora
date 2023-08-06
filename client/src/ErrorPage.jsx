import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Oops!";
  let message = "Sorry, an unexpected error has occurred.";

  if (error.status === 404) {
    title = "Page not found";
    message = "The page you are looking for could not be found.";
  } else if (error.status === 403) {
    title = "Unauthorized";
    message = "You do not have permission to access this page.";
  } else if (error.status === 500) {
    title = "Server error";
    message = "There was an error on our server. Please try again later.";
  } else if (error.status === 400) {
    title = "Bad request";
    message = "The request could not be understood by the server due to malformed syntax.";
  } else if (error.status === 409) {
    title = "Conflict";
    message = "There was a conflict with the current state of the resource.";
  }

  return (
    <div id="error-page" className="flex flex-col items-center h-screen justify-center">
      <h1>{title}</h1>
      <p>{message}</p>
      {error.statusText && <p><i>{error.statusText}</i></p>}
    </div>
  );
}