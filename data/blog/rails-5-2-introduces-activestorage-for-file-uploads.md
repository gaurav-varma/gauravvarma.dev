---
title: Rails 5.2 introduces ActiveStorage for file uploads
createdAt: '2018-04-15'
excerpt: Rails 5.2 introduced ActiveStorage, a new framework for managing file uploads. It supports cloud storage, variants, and direct uploads out of the box.
categories:
  - Rails
  - Rails 5.2
---

Rails 5.2 introduced **ActiveStorage**, a built-in solution for handling file uploads in Rails applications. This long-awaited feature brought native support for uploading files to services like Amazon S3, Google Cloud Storage, and Microsoft Azure.

### Why ActiveStorage?

Before ActiveStorage, developers often relied on third-party gems like `CarrierWave` or `Paperclip`. While powerful, they required significant configuration and integration. ActiveStorage is now part of Rails itself, providing:

- Easy setup and use
- Integration with cloud services
- Support for file variants (e.g., thumbnails)
- Direct uploads from the browser

### Setting it up

To get started, you run:

```bash
rails active_storage:install
rails db:migrate
```

This creates the necessary database tables.

In your model:

```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
```

### Uploading a file

In your form:

```erb
<%= form.file_field :avatar %>
```

Then attach it like:

```ruby
@user.avatar.attach(params[:avatar])
```

### Variants

You can process uploaded images:

```erb
<%= image_tag user.avatar.variant(resize_to_limit: [100, 100]) %>
```

### Links

- [PR #30020 - Adds Active Storage to Rails](https://github.com/rails/rails/pull/30020)
- [Rails documentation for Active Storage](https://guides.rubyonrails.org/v5.2.3/active_storage_overview.html)

### Summary

ActiveStorage modernized file uploads in Rails, giving developers a powerful and integrated toolset for managing attachments, variants, and direct cloud storage without third-party gems.
