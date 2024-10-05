import { faker } from '@faker-js/faker';

const generatePost = (index) => ({
  slug: `post-${index + 1}`,
  permalink: `/post-${index + 1}`,
  title: faker.lorem.words(3),
  excerpt: faker.lorem.sentence(),
  createdAt: faker.date
    .between({ from: '2023-01-01', to: '2023-12-31' })
    .toISOString()
    .split('T')[0],
  categories: [faker.word.noun()],
});

export const posts = Array.from({ length: 7 }, (_, index) => generatePost(index));

export default posts;
