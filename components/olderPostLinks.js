import Link from 'next/link';

export default function OlderPostsLinks() {
  return (
    <div className='container px-4 px-lg-5'>
      <div className='row gx-4 gx-lg-5 justify-content-center'>
        <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
          <div className='d-flex mb-4 mt-4'>
            <Link href='/blog/categories' passHref>
              <a
                href='replace'
                className='text-uppercase text-decoration-none fw-light subtext'
              >
                View All Categories
              </a>
            </Link>
            <Link href='/blog/all' passHref>
              <a
                href='replace'
                className='text-uppercase text-decoration-none fw-light subtext ms-auto'
              >
                Older Posts →
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
