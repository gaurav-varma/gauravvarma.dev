import Header from "../layouts/header";
import Footer from "../layouts/footer";
import BlogList from "../components/blogList";
import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
  return (
    <main>
      <Header></Header>
      <BlogList></BlogList>
    </main>
  );
}
