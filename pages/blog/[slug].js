import Link from 'next/link';
import PropTypes from 'prop-types';
import { getAllPosts, getPostBySlug } from '../api/blog';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import MarkdownToHtml from '../../components/markdownToHtml';

export default function Post({ post }) {
  const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <main>
      <Header />
      <div className='container px-4 px-lg-5'>
        <div className='row gx-4 gx-lg-5 justify-content-center'>
          <div className='col-md-12 col-lg-12 col-xl-12 col-sm-12'>
            <article key={post.slug} className='text-center'>
              <div className='post-preview'>
                <p className='post-back-link mb-4'>
                  <Link
                    href='/blog'
                    className='text-uppercase text-decoration-none text-muted fw-light'
                    passHref
                  >
                    ← BACK TO BLOG
                  </Link>
                </p>
                <h1 className='post-title fw-bold'>{post.title}</h1>
                <p className='post-meta mt-4  mb-0'>
                  <time dateTime={post.createdAt}>{prettyDate}</time>
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className='row gx-4 gx-lg-5 justify-content-center'>
          <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12 markdown-body'>
            <hr className='my-4' />
            <MarkdownToHtml content={post.body} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export function getStaticProps({ params }) {
  return {
    props: {
      post: getPostBySlug(params.slug),
    },
  };
}

export function getStaticPaths() {
  return {
    fallback: false,
    paths: getAllPosts().map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
  };
}
