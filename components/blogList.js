import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BlogList({ posts }) {
  return (
    <div className='container px-4 px-lg-5'>
      <div className='row gx-4 gx-lg-5 justify-content-center'>
        <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
          {posts.map((post) => {
            const prettyDate = new Date(post.createdAt).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              },
            );
            return (
              <article key={post.slug}>
                <div className='post-preview'>
                  <Link
                    href={post.permalink}
                    className='post_title_link'
                    passHref
                  >
                    <h4 className='post-title fw-bold'>{post.title}</h4>
                  </Link>
                  <p className='post-subtitle'>{post.excerpt}</p>
                  <p className='post-meta'>
                    <time dateTime={post.createdAt}>{prettyDate}</time>
                  </p>
                </div>
                <hr className='my-4' />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      permalink: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
