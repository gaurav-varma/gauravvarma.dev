import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages/index';
import { getAllPosts } from '../../api/blog';

// Mock the api used in Home page
jest.mock('../../api/blog', () => ({
  getAllPosts: jest.fn(),
}));

describe('The Home Page', () => {
  const mockPosts = [
    {
      slug: 'post-1',
      permalink: '/post-1',
      title: 'Post 1',
      excerpt: 'Excerpt 1',
      createdAt: '2023-01-01',
      categories: ['cat1'],
    },
    {
      slug: 'post-2',
      permalink: '/post-2',
      title: 'Post 2',
      excerpt: 'Excerpt 2',
      createdAt: '2023-01-02',
      categories: ['cat2'],
    },
    {
      slug: 'post-3',
      permalink: '/post-3',
      title: 'Post 3',
      excerpt: 'Excerpt 3',
      createdAt: '2023-01-03',
      categories: ['cat3'],
    },
    {
      slug: 'post-4',
      permalink: '/post-4',
      title: 'Post 4',
      excerpt: 'Excerpt 4',
      createdAt: '2023-01-04',
      categories: ['cat4'],
    },
    {
      slug: 'post-5',
      permalink: '/post-5',
      title: 'Post 5',
      excerpt: 'Excerpt 5',
      createdAt: '2023-01-05',
      categories: ['cat5'],
    },
    {
      slug: 'post-6',
      permalink: '/post-6',
      title: 'Post 6',
      excerpt: 'Excerpt 6',
      createdAt: '2023-01-06',
      categories: ['cat6'],
    },
    {
      slug: 'post-7',
      permalink: '/post-7',
      title: 'Post 7',
      excerpt: 'Excerpt 7',
      createdAt: '2023-01-07',
      categories: ['cat6'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render with all child elements', () => {
    render(<Home posts={mockPosts} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    expect(screen.getByTestId('older-posts-links')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Should display only 5 of the most recent posts', () => {
    render(<Home posts={mockPosts} />);

    const blogList = screen.getByTestId('blog-list');
    expect(blogList.children.length).toBe(5);
    expect(blogList).toHaveTextContent('Post 1');
    expect(blogList).toHaveTextContent('Post 5');
    expect(blogList).not.toHaveTextContent('Post 6');
  });

  it('Should render the 5 most recent posts correctly', () => {
    render(<Home posts={mockPosts} />);

    const blogList = screen.getByTestId('blog-list');
    expect(blogList.children.length).toBe(5);
    mockPosts.slice(0, 5).forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('Should returns the correct props', async () => {
    getAllPosts.mockReturnValue(mockPosts);

    const result = await getStaticProps();

    expect(result).toEqual({
      props: {
        posts: mockPosts,
      },
    });
    expect(getAllPosts).toHaveBeenCalledTimes(1);
  });
});
