import PropTypes from 'prop-types';
import Header from '../../../layouts/header';
import Footer from '../../../layouts/footer';
import { findAllCategoryNames, findAllCategoryPosts } from '../../../api/blog';
import CategoryList from '../../../components/categoryList';

export default function All({ categories }) {
  return (
    <div className='container px-4 px-lg-5'>
      <div className='row gx-4 gx-lg-5 justify-content-center'>
        <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
          <Header />
          <h4 className='text-left'>Categories</h4>
          <hr className='my-5' />
          <CategoryList categories={categories} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

All.propTypes = {
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
