import { useState } from 'react';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import BlogList from '../../components/blogList';
import { getAllPosts } from '../api/blog';

export default function Blog({ posts }) {
  return (
    <main>
      <Header></Header>
      <BlogList posts={posts} />
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
