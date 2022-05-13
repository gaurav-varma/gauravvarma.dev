---
title: Rails 7 adds the ability to use pre-defined variants
createdAt: "2021-10-19"
excerpt: Rails 5.2 introduced ActiveStorage which made it possible to easily upload files to a cloud storage service like Amazon S3, Google Cloud Storage, or Microsoft Azure...
---

Rails 5.2 introduced
[ActiveStorage](https://guides.rubyonrails.org/active_storage_overview.html)
which made it possible to easily upload files to a cloud storage service like
Amazon S3, Google Cloud Storage, or Microsoft Azure Storage. It also helped in
attaching the files to active record objects.

Using `ActiveStorage` and [ImageMagick](https://www.imagemagick.org) we can
transform image uploads and extract metadata from files. For transforming image
uploads we can use [image_processing](https://www.imagemagick.org) gem with
`ActiveStorage` and create variants of an image.

Previously for creating image variants, we needed to use
[image_processing](https://www.imagemagick.org) gem with `ActiveStorage`
processor. The default processor for `ActiveStorage` is `MiniMagick`, but we can
also use [Vips](https://www.rubydoc.info/gems/ruby-vips/Vips/Image).

However,
[Rails 7 has added the ability to use pre-defined variants](https://github.com/rails/rails/pull/39135)
which provides a way to easily create variants for images.

Let's assume we have a model `Blog`. Using `has_one_attched` every record can
have one file attached to it.

```ruby
# app/models/blog.rb
class Blog < ApplicationRecord
  has_one_attached :display_picture # Setup mapping between record and file
end
```

To create a `blog` with an attachment on `display_picture`.

```ruby
# app/views/blogs/new.html.erb
<%= form.file_field :avatar %>
```

```ruby
# app/controllers/blogs_controller.rb
class BlogsController < ApplicationController
  def create
    blog = Blog.create!(blog_params)
    session[:user_id] = blog.id
    redirect_to root_path
  end

  private
    def blog_params
      params.require(:blog).permit(:title, :display_picture)
    end
end
```

### Before

If we want to create variants of `display_picture`, we needed add the
[image_processing](https://www.imagemagick.org) gem to the `Gemfile`.

```ruby
# project_folder/Gemfile
gem 'image_processing'
```

Then to create variants of the image, we can call the `variant` method on the
attachment record.

```ruby
# app/views/blogs/show.html.erb
<%= image_tag blog.display_picture.variant(resize_to_limit: [100, 100]) %>
```

### Rails 7 onwards

We can use the `variants` option on `has_one_attached`.

```ruby
class Blog < ActiveRecord::Base
  has_one_attached :display_picture, variants: {
    thumb: { resize: "100x100" },
    medium: { resize: "300x300" }
  }
end
```

To display we can use the `variant` method.

```ruby
# app/views/blogs/show.html.erb
<%= image_tag blog.display_picture.variant(:thumb) %>
```

`variants` can also be used on `has_many_attached`. Check out this
[pull request](https://github.com/rails/rails/pull/39135) for more details.

This article was originally published on this [website](https://www.bigbinary.com/blog/rails-7-adds-ability-to-use-predefined-variants).