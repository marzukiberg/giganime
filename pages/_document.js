import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
        </Head>
        <body>
          <div className="max-w-md mx-auto shadow">
            <Main />

            <footer>
              <div className="p-3 text-center text-sm bg-blue-400 text-white font-bold">
                <h2>@ 2022 - GigaNime</h2>
              </div>
            </footer>
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
