import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages/index';
import { getAllPosts } from '../../api/blog';
import mockPosts from '../../__mocks__/posts';

// Mock the api used in Home page
jest.mock('../../api/blog', () => ({
  getAllPosts: jest.fn(),
}));

describe('The Home Page', () => {
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
    expect(blogList).toHaveTextContent(mockPosts[0].title);
    expect(blogList).toHaveTextContent(mockPosts[4].title);
    expect(blogList).not.toHaveTextContent(mockPosts[5].title);
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
