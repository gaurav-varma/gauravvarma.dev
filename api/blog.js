import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import slugify from '../utils/slugify';

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

// // Find all unique categories
export const findAllCategoryNames = () => {
  const categoryNames = getAllPosts().map((post) => post.categories);
  return [...new Set(categoryNames.flat())];
};

// Find all posts for a category with count
export function findAllCategoryPosts(category) {
  const result = {
    name: category,
    slug: slugify(category),
    postCount: 0,
    posts: [],
  };

  getAllPosts().forEach((post) => {
    if (post.categories.includes(category)) {
      result.postCount += 1;
      result.posts.push(post);
    }
  });

  return result;
}
