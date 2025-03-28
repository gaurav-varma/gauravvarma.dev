---
title: Rails 6 adds Action Text for rich text content (Trix)
createdAt: '2019-08-23'
excerpt: Rails 6 includes Action Text, a new framework for managing rich text content using Trix editor and ActiveStorage attachments.
categories:
  - Rails
  - Rails 6
---

Rails 6 introduces **Action Text**, which lets developers build rich text fields with file attachments, inline images, and more using the Trix editor.

### Why Action Text?

Most rich text editors require significant setup and don’t integrate well with Rails’ asset pipeline. Action Text solves this by integrating:

- [Trix editor](https://trix-editor.org/)
- [ActiveStorage](https://guides.rubyonrails.org/v6.0.3/active_storage_overview.html) for uploads
- Embedded images and formatting

### Getting started

Run:

```bash
bin/rails action_text:install
rails db:migrate
```

In your model:

```ruby
has_rich_text :content
```

In your form/view:

```erb
<%= form.rich_text_area :content %>
```

### Links

- [PR #34873 - Adds Action Text](https://github.com/rails/rails/pull/34873)
- [Rails Documentation for ActiveStorage](https://guides.rubyonrails.org/v6.0.3/active_storage_overview.html)
- [Trix GitHub Repo](https://github.com/basecamp/trix)

### Summary

Action Text dramatically simplifies adding WYSIWYG editing to Rails apps. It brings modern UX and tightly couples with ActiveStorage and Trix out of the box.
