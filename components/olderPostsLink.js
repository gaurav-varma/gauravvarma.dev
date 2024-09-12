import Link from 'next/link';

export default function OlderPostsLink() {
  return (
    <div className='container px-4 px-lg-5'>
      <div className='row gx-4 gx-lg-5 justify-content-center'>
        <div className='col-md-10 col-lg-8 col-xl-8 col-sm-12'>
          <div className='d-flex justify-content-end mb-4 mt-4'>
            <Link
              href='/blog'
              className='text-uppercase text-decoration-none fw-light subtext'
            >
              Older Posts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
