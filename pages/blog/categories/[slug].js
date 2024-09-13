import PropTypes from 'prop-types';
import Link from 'next/link';
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
            <div className='d-flex'>
              <h4 className='text-left'>
                {`${category.name} Blog${category.postCount > 1 ? 's' : ''}`}
              </h4>
              <Link href='/blog/categories/all' passHref>
                <a href='replace' className='btn btn-dark rounded ms-auto'>
                  View All Categories
                </a>
              </Link>
            </div>
            <p className='text-left'>
              {`Gaurav has written ${category.postCount} blog${category.postCount > 1 ? 's' : ''} in ${category.name} category.`}
            </p>
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
