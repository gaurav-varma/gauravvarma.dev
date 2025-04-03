---
title: Rails 6.1 revamps ActiveModel Errors with a new API
createdAt: '2020-12-27'
excerpt: Rails 6.1 refactors `ActiveModel::Errors` to behave more like a rich object, improving its integration with validations and serialization.
categories:
  - Rails
  - Rails 6.1
---

Rails 6.1 overhauls the `ActiveModel::Errors` API, making it behave more like a true object.

### What’s new?

- Errors are now objects instead of just hashes
- Improved error messages and introspection
- Easier to add and query error metadata

### Example

```ruby
user.errors.add(:email, :invalid, message: "is not a valid format")
user.errors[:email].any?           # true
user.errors[:email].first.full_message # => "Email is not a valid format"
user.errors[:email].first.attribute  # => :email
user.errors[:email].first.type       # => :invalid
```

This change improves form error handling by providing more structured error information, simplifies testing error conditions with easier introspection, and enhances serialization by allowing inclusion of error metadata in API responses.

### Summary

The new `ActiveModel::Errors` API gives developers better tools for working with validations and error messages, leading to more robust and maintainable applications.

For more details, check out the [PR #32313](https://github.com/rails/rails/pull/32313).
