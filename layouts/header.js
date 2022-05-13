import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="d-flex justify-content-center py-3">
      <Link href="/" passHref>
        <div className="py-5 text-center headshot">
          <img
            className="d-block mx-auto mb-2 rounded-circle"
            src="/gauravvarma.jpg"
            alt="Picture of the author"
            width={100}
            height={100}
            layout="fixed"
          />
          <p className="name headshot-text">GAURAV VARMA</p>
        </div>
      </Link>
    </header>
  );
}
