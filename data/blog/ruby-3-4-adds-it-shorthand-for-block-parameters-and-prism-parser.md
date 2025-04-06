---
title: Ruby 3.4 adds it shorthand for block parameters and makes Prism the default parser
createdAt: '2025-04-06'
excerpt: Ruby 3.4 introduces the `it` shorthand for block parameters and adopts Prism as the default parser, improving Ruby syntax handling and tooling.
categories:
  - Ruby
  - Ruby 3.4
---

Ruby 3.4 introduces two notable improvements to the language: a new **`it` shorthand for block parameters** and the adoption of **Prism as the default Ruby parser**. In parallel, Ruby continues to invest in runtime performance with updates to [YJIT](../ruby-3-4-optimizes-yjit-for-better-performance) and the upcoming [ZJIT compiler](../ruby-4-0-introduces-zjit-and-ruby-box-isolated-namespaces).

These updates improve both the developer experience and the internal architecture of Ruby.

The `it` shorthand simplifies common block usage, while Prism modernizes how Ruby code is parsed and analyzed.

---

### `it` shorthand for block parameters

Ruby developers frequently write blocks using numbered parameters like `_1`.

For example:

```ruby
numbers.map { _1 * 2 }
```

Ruby 3.4 introduces `it` as a more readable shorthand.

```ruby
numbers.map { it * 2 }
```

This improves clarity, especially for simple one-argument blocks.

---

### When to use `it`

The `it` shorthand works for blocks that accept **a single argument**.

Example:

```ruby
names.each { puts it }
```

This behaves the same as:

```ruby
names.each { |name| puts name }
```

However, `it` is designed primarily for concise blocks rather than complex logic.

---

### Introducing Prism

Ruby 3.4 also introduces **Prism** as the new default Ruby parser.

Prism is a modern parsing engine written in C and designed to improve:

- performance
- tooling support
- syntax analysis
- compatibility with static analysis tools

Prism replaces the traditional Ruby parser used internally by the interpreter.

---

### Why Prism matters

The parser plays a crucial role in Ruby’s ecosystem. Tools like:

- RuboCop
- syntax highlighters
- static analyzers
- language servers

all depend on accurate parsing.

Prism provides a more consistent and modern parsing architecture, which improves tooling reliability.

---

### Example parsing workflow

When Ruby loads a file, the parser converts source code into an abstract syntax tree (AST).

Example Ruby code:

```ruby
numbers.map { it * 2 }
```

The Prism parser transforms this into an AST that the Ruby interpreter executes.

By improving the parser implementation, Ruby can support better tooling and future language features.

---

### Real-world impact

Developers benefit from these improvements through:

- cleaner block syntax
- improved editor tooling
- better static analysis
- faster parsing performance

These changes may appear small on the surface but contribute significantly to the long-term evolution of Ruby.

---

### Links

- [Ruby 3.4.0 Released](https://www.ruby-lang.org/en/news/2024/12/25/ruby-3-4-0-released/)
- [ruby/prism on GitHub](https://github.com/ruby/prism)

---

### Summary

Ruby 3.4 improves the language with the `it` block shorthand and introduces Prism as the default parser. Together, these changes make Ruby code more expressive while strengthening the foundation for future language tooling and development.
