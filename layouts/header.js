import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='d-flex justify-content-center py-3'>
      <Link href='/' passHref>
        <div className='my-5 text-center headshot'>
          <Image
            className='d-block mx-auto mb-2 mt-1 rounded-circle'
            src='/gauravvarma.jpg'
            alt='Picture of the author'
            width={100}
            height={100}
            layout='fixed'
          />
          <p className='name headshot-text'>GAURAV VARMA</p>
        </div>
      </Link>
    </header>
  );
}
