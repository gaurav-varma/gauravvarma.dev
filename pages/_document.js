import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          {/* Inter — body & UI (same as Resend) */}
          {/* Playfair Display — editorial serif, substitute for Domaine Display */}
          {/* DM Sans — geometric sans, substitute for ABC Favorit */}
          {/* JetBrains Mono — substitute for Commit Mono */}
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
