import Link from 'next/link';

function OlderPostsLink(props) {
  const showOlderPostLink = props.showOlderPostLink;
  if (showOlderPostLink) {
    return (
      <div className="d-flex justify-content-end mb-4 mt-4">
        <Link href="/blog">
          <a className="text-uppercase text-decoration-none text-muted fw-light">
            Older Posts →
          </a>
        </Link>
      </div>
    );
  }
  return null;
}

export default function BlogList({ posts, showOlderPostLink = false }) {
  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-8 col-sm-12">
          {posts.map((post) => {
            const prettyDate = new Date(post.createdAt).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }
            );
            return (
              <article key={post.slug}>
                <div className="post-preview">
                  <Link href={post.permalink} passHref>
                    <a className="post_title_link">
                      <h4 className="post-title fw-bold">{post.title}</h4>
                    </a>
                  </Link>
                  <p className="post-subtitle">{post.excerpt}</p>
                  <p className="post-meta">
                    <time dateTime={post.createdAt}>{prettyDate}</time>
                  </p>
                </div>
                <hr className="my-4"></hr>
              </article>
            );
          })}
          <OlderPostsLink showOlderPostLink={showOlderPostLink} />
        </div>
      </div>
    </div>
  );
}
