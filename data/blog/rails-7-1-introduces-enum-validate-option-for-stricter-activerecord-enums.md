---
title: Rails 7.1 introduces enum validate option for stricter ActiveRecord enums
createdAt: '2023-10-16'
excerpt: Rails 7.1 adds validate option for enums to ensure only defined enum values are saved, helping prevent bugs caused by invalid assignments.
categories:
  - Rails
  - Rails 7.1
---

Rails 7.1 introduces a subtle but impactful improvement to enum handling with the addition of the `validate` option.

### The Problem Before

Enums have long been used in Rails to map symbolic values to integers — perfect for roles, states, or types. But assigning invalid enum values silently passed validation:

```ruby
class Holiday < ApplicationRecord
  enum kind: [:national, :regional]
end

holiday = Holiday.new(kind: :optional)
holiday.valid? # => true
```

In this case, `:optional` isn't even defined in the enum, yet no error is raised until it's saved, which causes an `ArgumentError`. That’s not great DX.

### What’s New in Rails 7.1

Rails 7.1 now lets you enforce value-level validations with `validate: true`:

```ruby
class Holiday < ApplicationRecord
  enum kind: [:national, :regional], validate: true
end

holiday = Holiday.new(kind: :optional)
holiday.valid? # => false
holiday.errors[:kind] # => ["is not a valid kind"]
```

No more ArgumentErrors. Just clean, predictable validation failures.

### Optional Enhancements

You can customize the validation further. For example, to allow `nil` as a valid value:

```ruby
class Holiday < ApplicationRecord
  enum kind: [:national, :regional], validate: { allow_nil: true }
end
```

Now `holiday.kind = nil` passes, but invalid values still fail validation.

### Why It Matters

This change brings enums in line with the rest of Rails' validation philosophy — **fail fast and fail clearly**.

It’s especially helpful for apps accepting enum values via API params or forms, where invalid data might sneak in.

### References

- [PR #49100 – Adds validate option for enums](https://github.com/rails/rails/pull/49100)
- [Rails 7.1 Release Notes](https://guides.rubyonrails.org/7_1_release_notes.html)

### Summary

Enums are safer now. With `validate: true`, Rails 7.1 lets your models reject invalid values before they hit the database — no surprises, just clean validations.
