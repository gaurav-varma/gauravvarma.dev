import PropTypes from 'prop-types';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import BlogList from '../components/blogList';
import OlderPostsLink from '../components/olderPostsLink';
import { getAllPosts } from '../api/blog';

export default function Home({ posts }) {
  const recentPosts = posts.slice(0, 5);
  return (
    <main>
      <Header />
      <BlogList posts={recentPosts} />
      <OlderPostsLink />
      <Footer />
    </main>
  );
}

Home.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      permalink: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
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
