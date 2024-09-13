export default function Footer() {
  return (
    <footer className='py-3 my-4'>
      <p className='text-center fw-light subtext'>
        The code for this blog is
        {' '}
        <a
          className='text-decoration-underline fw-light subtext'
          href='https://github.com/gaurav-varma/gauravvarma.dev'
          target='_blank'
          rel='noreferrer'
        >
          available on Github
        </a>
      </p>
    </footer>
  );
}
