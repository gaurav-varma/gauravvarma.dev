import PropTypes from 'prop-types';
import { findAllCategoryNames, findAllCategoryPosts } from '../../../api/blog';
import slugify from '../../../utils/slugify';
import Header from '../../../layouts/header';
import Footer from '../../../layouts/footer';
import BlogList from '../../../components/blogList';

export default function Category({ category }) {
  return (
    <main>
      <Header />
      <div className='container px-4 px-lg-5'>
        <div className='row gx-4 gx-lg-5 justify-content-center'>
          <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
            <h4 className='text-center'>
              {`Gaurav has written ${category.postCount} blog${category.postCount > 1 ? 's' : ''} in ${category.name} category.`}
            </h4>
            <hr className='my-5' />
          </div>
        </div>
      </div>
      <BlogList posts={category.posts} />
      <Footer />
    </main>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const categoryName = findAllCategoryNames().find((c) => slugify(c) === slug);

  return {
    props: {
      category: findAllCategoryPosts(categoryName),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: findAllCategoryNames().map((c) => ({
      params: { slug: slugify(c) },
    })),
    fallback: false,
  };
}
