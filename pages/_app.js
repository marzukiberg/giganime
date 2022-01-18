import Router from "next/router";
import { useState } from "react";
import LoadingOverlay from "../components/atoms/LoadingOverlay";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const handleRouteChange = () => {
    setLoading(!loading);
  };
  Router.events.on("routeChangeStart", handleRouteChange);
  Router.events.on("routeChangeComplete", handleRouteChange);
  return (
    <>
      {loading ? <LoadingOverlay /> : null}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
