---
title: Ruby 2.5 adds yield_self and other new core methods
createdAt: '2018-01-05'
excerpt: Ruby 2.5 introduced several new features to make Ruby more expressive and chain-friendly. One of the standout additions is `yield_self`, a method that helps create cleaner pipelines and improves readability.
categories:
  - Ruby
  - Ruby 2.5
---

Ruby 2.5 introduced some elegant features that make writing expressive and clean code easier. One such feature is `yield_self`, a method that brings in a functional programming flavor to Ruby’s already flexible syntax.

### What is `yield_self`?

`yield_self` is a method that passes the receiver to a block and returns the block’s result. It’s particularly useful when you want to start a chain with an object, pass it through a transformation, and continue chaining.

### How is it different from `tap`?

You might be familiar with `tap`, which also yields the receiver to a block. However, there is a key difference:

- `tap` returns the original object after yielding it.
- `yield_self` returns the **result of the block**.

### Example: `tap` vs `yield_self`

```ruby
# Using tap
10.tap { |n| puts n + 1 } # prints 11
# => 10 (returns the original object)

# Using yield_self
10.yield_self { |n| n + 1 }
# => 11 (returns the result of the block)
```

### When to use `yield_self`

Use `yield_self` when you want to apply a transformation to an object mid-chain or when you want to perform operations where each step returns a different object.

```ruby
"5".yield_self { |s| Integer(s) }.yield_self { |i| i * 2 }
# => 10
```

It’s especially useful in functional-style pipelines:

```ruby
result = user_input
  .yield_self { |s| s.strip }
  .yield_self { |s| s.downcase }
  .yield_self { |s| s.gsub(/[^a-z]/, '') }
```

### Other notable Ruby 2.5 features

- **Top-level rescue inside do/end blocks** — now you can write `begin ... rescue ... end` inline more concisely.
- **do/end blocks now return** — making multi-line lambdas easier to use.
- **Improved error backtraces** — cleaner and easier to navigate.

### Summary

`yield_self` gives Ruby developers a powerful and elegant way to chain transformations, especially in contexts where intermediate values need to be passed along in a clean and readable manner. It's a small but impactful addition to the Ruby toolbox that promotes a more functional programming style without sacrificing clarity.

For full details on Ruby 2.5, check out the [official release notes](https://www.ruby-lang.org/en/news/2017/12/25/ruby-2-5-0-released/).
