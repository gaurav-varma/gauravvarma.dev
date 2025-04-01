---
title: Ruby 2.7 introduces pattern matching (experimental)
createdAt: '2020-01-05'
excerpt: Ruby 2.7 introduces experimental support for pattern matching using the case in syntax, offering elegant destructuring for arrays, hashes, and custom data shapes.
categories:
  - Ruby
  - Ruby 2.7
---

Ruby 2.7 introduces **pattern matching** as an experimental feature — a powerful new control flow tool that brings deconstruction and deep matching to your Ruby code.

### What is Pattern Matching?

Pattern matching allows you to match against the structure of objects (arrays, hashes, or custom types) and extract values inline. It uses the new `case in` syntax to provide clean and expressive matching logic.

### Basic Example

```ruby
case [0, 1, 2]
in [0, x, y]
  puts "x = #{x}, y = #{y}"
end
```

This pattern matches the array `[0, 1, 2]` and destructures it: `x = 1`, `y = 2`.

### Matching Hashes and Object Types

You can use type guards with destructuring:

```ruby
case { name: "Alice", age: 30 }
in { name: String => name, age: Integer => age }
  puts "#{name} is #{age}"
end
```

This matches the hash shape, confirms the types, and binds values.

### Find Pattern Support

In Ruby 2.7 and beyond, you can match an element **within** a larger array using the splat (`*`) syntax:

```ruby
json = { name: "John", friends: [{ name: "Alex", age: 24 }, { name: "Don", age: 25 }] }

case json
in { name: "John", friends: [*, { name: "Alex", age: age }, *] }
  puts "Alex is #{age}"
end
```

This works even if the element appears in the middle of the array — thanks to the find pattern.

### Complex Matching with Arrays

You can match parts of arrays with trailing or leading elements using the splat operator:

```ruby
case ["alpha", 1, "beta", "gamma", 2, "a", "b", "c", 3]
in [*pre, String => x, String => y, *post]
  p pre   # => ["alpha", 1]
  p x     # => "beta"
  p y     # => "gamma"
  p post  # => [2, "a", "b", "c", 3]
end
```

This elegantly extracts the first matching sequence of two strings while capturing what's before and after.

### When to Use It

Pattern matching is great for:

- Cleaning up deeply nested `if`/`case` chains
- Extracting values from API responses
- Handling structured JSON-like data

### Caveats

- Pattern matching is **experimental** in Ruby 2.7 — syntax and behavior may evolve
- Only available via `case in` syntax (no standalone `in` blocks)
- Not all Ruby types and structures support pattern matching natively yet

### Resources

- [Ruby 2.7 Release Notes](https://www.ruby-lang.org/en/news/2019/12/25/ruby-2-7-0-released/)
- [Pattern Matching Guide (Matz’s Ruby)](https://bugs.ruby-lang.org/issues/14912)

### Summary

Pattern matching in Ruby 2.7 opens the door to **cleaner, safer, and more expressive control flow** — especially when dealing with structured data. While still evolving, it's a game-changing addition worth exploring in your apps and experiments.
