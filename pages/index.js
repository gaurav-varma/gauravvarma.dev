import Header from '../layouts/header';
import Footer from '../layouts/footer';
import BlogList from '../components/blogList';
import { getAllPosts } from './api/blog';

export default function Home({ posts }) {
  const recentPosts = posts.slice(0, 5);
  return (
    <main>
      <Header></Header>
      <BlogList posts={recentPosts} showOlderPostLink={true}></BlogList>
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
