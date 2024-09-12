import PropTypes from 'prop-types';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import BlogList from '../../components/blogList';
import { getAllPosts } from '../api/blog';

export default function Blog({ posts }) {
  return (
    <main>
      <Header />
      <BlogList posts={posts} />
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
