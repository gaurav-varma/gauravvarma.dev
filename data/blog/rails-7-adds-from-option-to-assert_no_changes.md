---
title: Rails 7 Adds from option to ActiveSupport::TestCase#assert_no_changes
createdAt: '2021-11-19'
excerpt: Rails Active Support provides various extensions, utilities, and helpers. It provides a collection of utility classes...
categories:
  - Rails
  - Rails 7
---

Rails
[Active Support](https://guides.rubyonrails.org/active_support_core_extensions.html)
provides various extensions, utilities, and helpers. It provides a collection of
utility classes and standard library extensions that are very useful.

Rails 5.1 introduced `assert_no_changes` and `assert_changes` making it easier
to observe changes. Using
[ActiveSupport::TestCase#assert_no_changes](https://api.rubyonrails.org/classes/ActiveSupport/Testing/Assertions.html#method-i-assert_no_changes)
we can easily assert that the result of evaluating an expression has not changed
before and after calling the passed block.

To assert the expected change in the value of an object we can use
`assert_changes`.

```ruby
assert_changes -> { user.address } do
  user.update address: 'Miami'
end
```

`assert_changes` also supports `from` and `to` options.

```ruby
assert_changes -> { user.address }, from: 'San Francisco', to: 'Miami' do
  user.update address: 'Miami'
end
```

Similarly, `assert_no_changes` allows us to assert a value that is expected to
not change.

```ruby
assert_no_changes -> { user.address } do
  user.update address: 'Miami'
end
```

We can also specify an error message with `assert_no_changes`.

```ruby
assert_no_changes -> { user.address }, 'Expect the address to not change' do
  user.update address: 'Miami'
end
```

### Before

`assert_no_changes` did not support the `from` option similar to
`assert_changes`.

```ruby
assert_no_changes -> { user.address } do
  user.update address: 'Miami'
end
```

However,
[Rails 7 has added from: option to ActiveSupport::TestCase#assert_no_changes](https://github.com/rails/rails/pull/42277),
allowing us to assert on the initial value that is expected to not change.

### Rails 7 onwards

Provides the optional `from` argument to specify the expected initial value.

```ruby
assert_no_changes -> { user.address }, from: 'San Francisco' do
  user.update address: 'Miami'
end
```

Check out this [pull request](https://github.com/rails/rails/pull/42277) for
more details.

This article was originally published on this [website](https://www.bigbinary.com/blog/rails-7-adds-from-option-to-assert_no_changes).
