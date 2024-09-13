import PropTypes from 'prop-types';
import Link from 'next/link';
import Header from '../../../layouts/header';
import Footer from '../../../layouts/footer';
import { findAllCategoryNames, findAllCategoryPosts } from '../../../api/blog';
import CategoryList from '../../../components/categoryList';

export default function Categories({ categories }) {
  return (
    <div className='container px-4 px-lg-5'>
      <div className='row gx-4 gx-lg-5 justify-content-center'>
        <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
          <Header />
          <div className='d-flex'>
            <h4 className='text-left'>Categories</h4>
            <Link href='/blog' passHref>
              <a href='replace' className='btn btn-dark rounded ms-auto'>
                View All Blogs
              </a>
            </Link>
          </div>
          <hr className='my-5' />
          <CategoryList categories={categories} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      posts: PropTypes.arrayOf(PropTypes.object).isRequired,
      postCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export async function getStaticProps() {
  const categories = findAllCategoryNames().map((category) => findAllCategoryPosts(category));
  return {
    props: {
      categories,
    },
  };
}
