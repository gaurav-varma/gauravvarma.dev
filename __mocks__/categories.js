import { faker } from '@faker-js/faker';

const generateMockPosts = (count) => Array.from({ length: count }, () => ({
  title: faker.lorem.words(3),
  excerpt: faker.lorem.sentence(),
}));

const generateMockCategory = () => {
  const name = faker.word.noun();
  const postCount = faker.number.int({ min: 1, max: 5 });

  return {
    slug: faker.helpers.slugify(name.toLowerCase()),
    name,
    posts: generateMockPosts(postCount),
    postCount,
  };
};

const mockCategories = Array.from(
  { length: faker.number.int({ min: 3, max: 7 }) },
  generateMockCategory,
);

export default mockCategories;
