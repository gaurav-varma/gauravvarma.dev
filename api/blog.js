import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'data/blog');

export function getPostBySlug(slug) {
  const file = readFileSync(
    join(process.cwd(), 'data/blog', `${slug}.md`),
    'utf8',
  );
  const { content, data } = matter(file);
  const body = content.toString();
  const permalink = `/blog/${slug}`;
  const { createdAt, categories } = data;
  return {
    ...data,
    body,
    slug,
    permalink,
    createdAt,
    categories,
  };
}

export function getAllPosts() {
  const filenames = readdirSync(postsDirectory);
  return filenames
    .map((filename) => getPostBySlug(filename.replace(/\.md$/, '')))
    .sort((post1, post2) => (post1.createdAt > post2.createdAt ? -1 : 1));
}
