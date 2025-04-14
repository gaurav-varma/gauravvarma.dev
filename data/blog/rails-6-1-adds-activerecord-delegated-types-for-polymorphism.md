---
title: Rails 6.1 adds ActiveRecord delegated types for polymorphism
createdAt: '2020-12-24'
excerpt: Rails 6.1 introduces delegated_type, a more elegant and flexible alternative to classic polymorphic associations with helpful query and helper methods out of the box.
categories:
  - Rails
  - Rails 6.1
---

Rails 6.1 introduces `delegated_type`, a cleaner and more expressive way to handle polymorphic relationships in ActiveRecord. It builds on traditional polymorphism by making it easier to work with multiple types and providing helpful querying and predicate methods.

### The Problem with Classic Polymorphism

Using polymorphic `belongs_to` often leads to awkward queries and boilerplate. Let’s say we manage two types of vehicles: `Car` and `Motorcycle`. With polymorphic associations, you'd typically do this:

```ruby
class Vehicle < ApplicationRecord
  belongs_to :vehicleable, polymorphic: true
end

class Car < ApplicationRecord
  has_one :vehicle, as: :vehicleable
end

class Motorcycle < ApplicationRecord
  has_one :vehicle, as: :vehicleable
end
```

You can query attributes via `vehicle.vehicleable`, but checking the type or fetching records by type requires manual filtering and string comparisons.

### Enter `delegated_type`

Rails 6.1 improves this pattern with `delegated_type`:

```ruby
class Vehicle < ApplicationRecord
  delegated_type :vehicleable, types: %w[Car Motorcycle]
end
```

That one line gives you:

- `vehicle.vehicleable` (just like before)
- Type-specific accessors: `vehicle.car`, `vehicle.motorcycle`
- Type predicate helpers: `vehicle.car?`, `vehicle.motorcycle?`
- Scope helpers: `Vehicle.cars`, `Vehicle.motorcycles`

### Creating Records

With `delegated_type`, you can initialize and persist both the delegator and delegatee in one go. Note that `vehicleable:` expects an instance of the associated type:

```ruby
Vehicle.create!(
  vehicleable: Car.new(interior_color: '#fff', adjustable_roof: true),
  name: 'TS78Z',
  mileage: 89
)
```

This automatically saves both the `Car` and associated `Vehicle` record.

### Querying and Type Helpers

You get handy scopes and methods out of the box:

```ruby
Vehicle.cars
# => ActiveRecord::Relation of all Vehicles with vehicleable_type: "Car"

Vehicle.motorcycles
# => ActiveRecord::Relation of all Vehicles with vehicleable_type: "Motorcycle"

vehicle = Vehicle.first
vehicle.car?        # => true or false
vehicle.car         # => Returns the Car object or nil
```

This removes the need for manual conditionals or type comparisons.

### Summary

`delegated_type` is a modern, ergonomic alternative to polymorphic associations. It gives your models cleaner APIs, less boilerplate, and better type safety — all while keeping your data normalized.

To learn more, check out the [pull request](https://github.com/rails/rails/pull/39322) that introduced it.
