import { render, screen, fireEvent } from '@testing-library/react';
import AllBlogs, { getStaticProps } from '../../../pages/blog/all';
import { getAllPosts } from '../../../api/blog';
import mockPosts from '../../../__mocks__/posts';

// Mock the api used in All Blogs page
jest.mock('../../../api/blog', () => ({
  getAllPosts: jest.fn(),
}));

describe('The All Blog Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render with all child elements', () => {
    render(<AllBlogs posts={mockPosts} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('All Blogs')).toBeInTheDocument();
    expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    expect(screen.getByTestId('view-all-categories-link')).toBeInTheDocument();
    expect(screen.getByTestId('load-more-link')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Should display only 5 of the most recent posts', () => {
    render(<AllBlogs posts={mockPosts} />);

    const blogList = screen.getByTestId('blog-list');
    expect(blogList.children.length).toBe(5);
    expect(blogList).toHaveTextContent(mockPosts[0].title);
    expect(blogList).toHaveTextContent(mockPosts[4].title);
    expect(blogList).not.toHaveTextContent(mockPosts[5].title);
  });

  it('Should render the 5 most recent posts correctly', () => {
    render(<AllBlogs posts={mockPosts} />);

    const blogList = screen.getByTestId('blog-list');
    expect(blogList.children.length).toBe(5);
    mockPosts.slice(0, 5).forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('Should display more than 5 posts after clicking load more', () => {
    render(<AllBlogs posts={mockPosts} />);

    const blogList = screen.getByTestId('blog-list');
    expect(blogList.children.length).toBe(5);
    expect(blogList).toHaveTextContent(mockPosts[0].title);
    expect(blogList).toHaveTextContent(mockPosts[4].title);
    expect(blogList).not.toHaveTextContent(mockPosts[5].title);
    fireEvent.click(screen.getByText(/Load more/i));
    expect(blogList.children.length).toBe(7);
    expect(blogList).toHaveTextContent(mockPosts[5].title);
    expect(blogList).toHaveTextContent(mockPosts[6].title);
  });

  it('Should render more than 5 posts correctly after clicking load more', () => {
    render(<AllBlogs posts={mockPosts} />);

    const blogList = screen.getByTestId('blog-list');
    expect(blogList.children.length).toBe(5);
    fireEvent.click(screen.getByText(/Load more/i));
    expect(blogList.children.length).toBe(7);
    mockPosts.slice(0, 6).forEach((post) => {
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
