import Header from '../layouts/header';
import Footer from '../layouts/footer';
import BlogList from '../components/blogList';
import OlderPostsLink from '../components/olderPostsLink';
import { getAllPosts } from './api/blog';

export default function Home({ posts }) {
  const recentPosts = posts.slice(0, 5);
  return (
    <main>
      <Header></Header>
      <BlogList posts={recentPosts}></BlogList>
      <OlderPostsLink />
      <Footer></Footer>
    </main>
  );
}

export function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
