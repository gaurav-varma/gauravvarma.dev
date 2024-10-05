import { render, screen } from '@testing-library/react';
import Categories, { getStaticProps } from '../../../../pages/blog/categories';
import {
  findAllCategoryNames,
  findAllCategoryPosts,
} from '../../../../api/blog';
import mockCategories from '../../../../__mocks__/categories';

jest.mock('../../../../api/blog', () => ({
  findAllCategoryNames: jest.fn(),
  findAllCategoryPosts: jest.fn(),
}));

describe('The Categories Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render with all child elements', () => {
    render(<Categories categories={mockCategories} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('View All Blogs')).toBeInTheDocument();
    expect(screen.getByTestId('category-list')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Should display all categories', () => {
    render(<Categories categories={mockCategories} />);
    const categoryList = screen.getByTestId('category-list');
    expect(categoryList.children.length).toBe(mockCategories.length);
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('Should return the correct props', async () => {
    const mockCategoryNames = mockCategories.map((cat) => cat.name);
    findAllCategoryNames.mockReturnValue(mockCategoryNames);
    // eslint-disable-next-line max-len
    findAllCategoryPosts.mockImplementation((categoryName) => mockCategories.find((cat) => cat.name === categoryName));

    const result = await getStaticProps();
    expect(result).toEqual({
      props: {
        categories: mockCategories,
      },
    });
    expect(findAllCategoryNames).toHaveBeenCalledTimes(1);
    expect(findAllCategoryPosts).toHaveBeenCalledTimes(
      mockCategoryNames.length,
    );
  });
});
