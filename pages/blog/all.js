import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import BlogList from '../../components/blogList';
import { getAllPosts } from '../../api/blog';

export default function All({ posts }) {
  const [postsToShow, setPostsToShow] = useState(5);

  const loadMorePosts = () => {
    setPostsToShow((prevValue) => prevValue + 5);
  };

  return (
    <main>
      <Header />
      <div className='container px-4 px-lg-5'>
        <div className='row gx-4 gx-lg-5 justify-content-center'>
          <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
            <div className='d-flex'>
              <h4 className='text-left'>All Blogs</h4>
              <Link href='/blog/categories' passHref>
                <a
                  href='replace'
                  className='btn btn-dark rounded ms-auto'
                  data-testid='view-all-categories-link'
                >
                  View All Categories
                </a>
              </Link>
            </div>
            <hr className='my-5' />
          </div>
        </div>
      </div>
      <BlogList posts={posts.slice(0, postsToShow)} />
      <div className='mt-8 mx-auto justify-center text-center'>
        {postsToShow < posts.length && (
          <button
            onClick={loadMorePosts}
            type='button'
            className='btn btn-dark rounded'
            data-testid='load-more-link'
          >
            Load more
          </button>
        )}
      </div>
      <Footer />
    </main>
  );
}

All.propTypes = {
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

export function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
