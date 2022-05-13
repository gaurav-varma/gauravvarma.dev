---
title: Rails 7 adds ComparisonValidator to ActiveRecord
createdAt: "2021-10-05"
excerpt: ActiveRecord is one of the most powerful features in Rails. With ActiveRecord we can easily query and handle database objects without writing any SQL...
---

Rails
[Active Record Validation](https://guides.rubyonrails.org/active_record_validations.html)
provides a convenient way to validate the state of an object before it is stored
in the database. There are various built-in
[Active Record validations](https://guides.rubyonrails.org/active_record_validations.html)
like `presence`, `length`, `numericality` and `uniqueness`.

By using
[numericality validator](https://guides.rubyonrails.org/active_record_validations.html#numericality),
we can validate an attribute to only have numeric values.

```ruby
# app/models/blog.rb
class Blog < ApplicationRecord
  validates :likes, numericality: true
end
```

We can also use helpers like `greater_than`, `greater_than_or_equal_to`,
`equal_to`, `less_than`, `less_than_or_equal_to`, `other_than`, `odd`, `even`
with
[numericality validator](https://guides.rubyonrails.org/active_record_validations.html#numericality)
but these work only on numbers.

```ruby
# app/models/blog.rb
class Blog < ApplicationRecord
  validates :likes, numericality: { greater_than: 1 }
end
```

Previously for validating comparisons of dates we needed to write
[custom validators](https://guides.rubyonrails.org/active_record_validations.html#performing-custom-validations)
or use a gem like [date_validator](https://github.com/codegram/date_validator).

However,
[Rails 7 has added ComparisonValidator](https://github.com/rails/rails/pull/40095)
which provides a way to easily validate comparisons with another value, proc, or
attribute. Let's assume we have a model `Blog` with an `end_date` attribute.

### Before

If we want to validate the `end_date` attribute for the provided value or then
we would need to write a
[custom validator](https://guides.rubyonrails.org/active_record_validations.html#performing-custom-validations)
or use a gem like [date_validator](https://github.com/codegram/date_validator).

```ruby
# Using date_validator gem
class Blog < ApplicationRecord
  # validate against provided value
  validates :end_date, date: { after: Proc.new { Date.today } }
  # validate against another attribute
  validates :end_date, date: { after: :start_date }
end
```

### Rails 7 onwards

We can use [ComparisonValidator](https://github.com/rails/rails/pull/40095) to
validate the comparison of the `end_date` attribute for a provided value.

```ruby
class Blog < ApplicationRecord
  # validate against provided value
  validates_comparison_of :end_date, greater_than: -> { Date.today }
  # validate against another attribute
  validates :end_date, greater_than: :start_date
end
```

[ComparisonValidator](https://github.com/rails/rails/pull/40095) also provides
helpers like `greater_than`, `greater_than_or_equal_to`, `equal_to`,
`less_than`, `less_than_or_equal_to` and `other_than`.

Check out this [pull request](https://github.com/rails/rails/pull/40095) for
more details.

This article was originally published on the this [website](https://www.bigbinary.com/blog/rails-7-adds-comparison-validator-to-active-record).