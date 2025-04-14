---
title: Ruby 3.2 introduces Data class for immutable value objects
createdAt: '2023-01-08'
excerpt: Ruby 3.2 adds a new `Data` class, designed to simplify the creation of immutable value objects with built-in equality, inspection, and pattern matching support.
categories:
  - Ruby
  - Ruby 3.2
---

Ruby 3.2 introduces a new core class called `Data`, a lightweight way to define **immutable value objects** with less boilerplate. It’s ideal for modeling plain data structures where mutability isn’t needed and immutability is a benefit.

This addition helps Ruby stay competitive with modern language features, offering similar benefits to `Struct`, but with stricter immutability and improved pattern matching compatibility.

### What is the `Data` class?

The `Data` class is a subclass of `Object` that behaves much like `Struct`, but with **immutable attributes** and **value equality** out of the box.

Here’s how to define and use it:

```ruby
Person = Data.define(:name, :age)

john = Person.new("John", 30)

john.name
# => "John"

john.age
# => 30
```

Unlike `Struct`, trying to change `john.name` will raise an error:

```ruby
john.name = "Mike"
# => NoMethodError (undefined method `name=')
```

### Why use `Data` over `Struct`?

```code
| Feature                   | Struct            | Data                       |
| ------------------------- | ----------------- | -------------------------- |
| Mutable                   | ✅ Yes            | ❌ No (immutable)          |
| Value-based equality      | ✅ Yes            | ✅ Yes                     |
| Built-in pattern matching | ⚠️ Limited        | ✅ Fully supported         |
| Safer for modeling        | ❌ Prone to bugs  | ✅ Encourages immutability |
```

If you don’t want your object’s state to change after initialization, `Data` is the better choice. This is especially useful when you’re working with domain models, value objects, or functional-style programming.

### Pattern Matching Support

The `Data` class is **optimized for pattern matching**, a feature introduced in Ruby 2.7 and improved in later versions.

```ruby
case john
in Person(name:, age:)
  puts "Name: #{name}, Age: #{age}"
end
# => Name: John, Age: 30
```

Pattern matching works seamlessly and makes destructuring data objects intuitive.

### Real-world Use Cases

- Value objects in DDD (Domain-Driven Design)
- Lightweight DTOs (Data Transfer Objects)
- Parameters passed across service layers
- Declarative and functional code styles

### Notes

- The `Data` class is immutable and does not support custom instance methods by default.
- You can still add methods via class reopening:

```ruby
Person = Data.define(:name, :age)

class Person
  def greeting
    "Hello, #{name}!"
  end
end

john.greeting
# => "Hello, John!"
```

### Resources

- [Ruby 3.2 Release Notes](https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/)
- [Data Class Proposal](https://bugs.ruby-lang.org/issues/16122)
- [PR #6353 - Adds Data Class](https://github.com/ruby/ruby/pull/6353)

### Summary

Ruby’s new `Data` class is a welcome addition for developers who want clean, immutable, and efficient value objects with minimal syntax. It simplifies functional programming and domain modeling in Ruby, and its native support for pattern matching makes it a powerful new primitive in the language.
