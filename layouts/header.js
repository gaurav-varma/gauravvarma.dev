import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <header className="d-flex justify-content-center py-3">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-2 rounded-circle"
          src="/gauravvarma.jpg"
          alt="Picture of the author"
          width={100}
          height={100}
          layout="fixed"
        />
        <p className={styles.name + ' headshot-text'}>GAURAV VARMA</p>
      </div>
    </header>
  );
}
