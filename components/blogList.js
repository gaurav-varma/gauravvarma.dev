import styles from "../styles/Home.module.css";

export default function BlogList() {
  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-adds-from-option-to-assert_no_changes"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 Adds from option to
                ActiveSupport::TestCase#assert_no_changes
              </h4>
            </a>
            <p className="post-subtitle">
              Rails Active Support provides various extensions, utilities, and
              helpers. It provides a collection of utility classes...
            </p>
            <p className="post-meta text-black-50">November 19, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-replaced-byebug-with-ruby-debug"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 replaced byebug with ruby/debug
              </h4>
            </a>
            <p className="post-subtitle ">
              Rails 5 introduced byebug which is an easy-to-use, feature-rich
              ruby debugger. It offers features like Stepping, Breaking,
              Evaluating, Tracking...
            </p>
            <p className="post-meta text-black-50">November 9, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-adds-weekday_options_for_select-and-weekday_select"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 adds weekday_options_for_select and weekday_select
              </h4>
            </a>
            <p className="post-subtitle ">
              In web applications, forms are one of the most essential
              interfaces for user input and it can be tedious to write...
            </p>
            <p className="post-meta text-black-50">November 9, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-adds-activerecord-previously_persisted"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 adds ActiveRecord::Base#previously_persisted?
              </h4>
            </a>
            <p className="post-subtitle ">
              Active Record in Rails provides various methods like exists?,
              persisted?, destroyed? and many more...
            </p>
            <p className="post-meta text-black-50">November 9, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-adds-ability-to-use-predefined-variants"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 adds the ability to use pre-defined variants
              </h4>
            </a>
            <p className="post-subtitle ">
              Rails 5.2 introduced ActiveStorage which made it possible to
              easily upload files to a cloud storage service like Amazon S3,
              Google Cloud Storage, or Microsoft Azure...
            </p>
            <p className="post-meta text-black-50">October 19, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-adds-comparison-validator-to-active-record"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 adds ComparisonValidator to ActiveRecord
              </h4>
            </a>
            <p className="post-subtitle ">
              Rails Active Record Validation provides a convenient way to
              validate the state of an object before it is stored in the
              database...
            </p>
            <p className="post-meta text-black-50">October 5, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="post-preview">
            <a
              href="https://www.bigbinary.com/blog/rails-7-adds-active-record-relation-structurally-compatible"
              target="_blank"
              className={styles.post_title_link}
              rel="noreferrer"
            >
              <h4 className="post-title fw-bold">
                Rails 7 adds ActiveRecord::Relation#structurally_compatible?
              </h4>
            </a>
            <p className="post-subtitle ">
              ActiveRecord is one of the most powerful features in Rails. With
              ActiveRecord we can easily query and handle database objects
              without writing any SQL...
            </p>
            <p className="post-meta text-black-50">September 15, 2021</p>
          </div>
          <hr className="my-4"></hr>
          <div className="d-flex justify-content-end mb-4">
            <a
              className="text-uppercase text-decoration-none text-muted fw-light"
              href="#"
            >
              Older Posts →
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
