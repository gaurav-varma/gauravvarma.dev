import Link from 'next/link';
import PropTypes from 'prop-types';

export default function CategoryList({ categories }) {
  return (
    <div className='container px-4'>
      <div className='row row-cols-1 row-cols-xs-1 row-cols-md-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-4'>
        {categories.map((category) => (
          <div className='col'>
            <Link href={`/blog/categories/${category.slug}`} passHref>
              <a href='replace' className='text-decoration-none category-card'>
                <div className='card text-white bg-dark mb-3 category-card'>
                  <div className='card-body'>
                    <h4>{category.name}</h4>
                    <small className='subtext'>{category.postCount}</small>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      posts: PropTypes.arrayOf(PropTypes.object).isRequired,
      postCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
