---
title: Rails 6.1 introduces Strict Loading to catch N+1 queries
createdAt: '2020-12-18'
excerpt: Rails 6.1 adds strict loading mode, which raises errors when accessing associations that weren’t eager-loaded.
categories:
  - Rails
  - Rails 6.1
  - Performance
---

Rails 6.1 introduces **strict loading**, a helpful feature that enforces eager loading to prevent accidental N+1 queries.

### What is strict loading?

Strict loading raises an `ActiveRecord::StrictLoadingViolationError` if an association is accessed without being eager-loaded. It’s a great tool to catch inefficient queries early in development or test environments.

### Enabling strict loading per model

You can set strict loading as the default behavior for all records of a model:

```ruby
class Article < ApplicationRecord
  self.strict_loading_by_default = true

  has_many :comments
end
```

Now, if you fetch an `Article` and try to access its `comments` without including them, Rails will raise an error:

```ruby
article = Article.strict_loading.first
article.comments # => Raises ActiveRecord::StrictLoadingViolationError
```

### Fixing the error

Simply include the associations beforehand:

```ruby
article = Article.includes(:comments).strict_loading.first
article.comments # works as expected
```

You can verify strict loading is active:

```ruby
article.strict_loading? # => true
```

You can also check if associated records respect strict loading:

```ruby
article.comments.all?(&:strict_loading?) # => true
```

### Enabling strict loading per association

You can enforce strict loading on a specific association:

```ruby
class Article < ApplicationRecord
  has_many :comments, strict_loading: true
end
```

Now, accessing `comments` without eager loading raises an error, even if the model itself isn't strict:

```ruby
article = Article.first
article.comments # => Raises ActiveRecord::StrictLoadingViolationError
```

### Enabling strict loading on queries

If you want to enforce strict loading for specific queries only, use:

```ruby
Article.strict_loading.load
```

### Enable globally

Strict loading can be enabled for all models via configuration:

```ruby
# config/application.rb
config.active_record.strict_loading_by_default = true
```

This ensures all models and their associations are protected from lazy loading.

### Logging violations instead of raising

In production, instead of raising an error, you can choose to just log violations:

```ruby
# config/environments/production.rb
config.active_record.action_on_strict_loading_violation = :log
```

This helps teams gradually adopt strict loading without immediately breaking the app.

### Summary

Strict loading in Rails 6.1 is a powerful ally against N+1 query issues. By enforcing eager loading and surfacing violations early, it improves app performance and encourages better data access patterns.

For more, check out:

- [PR #37400](https://github.com/rails/rails/pull/37400)
- [PR #38541](https://github.com/rails/rails/pull/38541)
- [PR #39491](https://github.com/rails/rails/pull/39491)
- [PR #40511](https://github.com/rails/rails/pull/40511)
