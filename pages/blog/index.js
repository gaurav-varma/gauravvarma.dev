import { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import BlogList from '../../components/blogList';
import { getAllPosts } from '../../api/blog';

export default function Blog({ posts }) {
  const [postsToShow, setPostsToShow] = useState(5);

  const loadMorePosts = () => {
    setPostsToShow((prevValue) => prevValue + 5);
  };

  return (
    <main>
      <Header />
      <BlogList posts={posts.slice(0, postsToShow)} />
      <div className='mt-8 mx-auto justify-center text-center'>
        {postsToShow < posts.length && (
          <button
            onClick={loadMorePosts}
            type='button'
            className='btn btn-dark rounded'
          >
            Load more
          </button>
        )}
      </div>
      <Footer />
    </main>
  );
}

Blog.propTypes = {
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
