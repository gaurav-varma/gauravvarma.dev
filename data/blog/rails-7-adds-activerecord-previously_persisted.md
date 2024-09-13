---
title: Rails 7 adds ActiveRecord::Base#previously_persisted?
createdAt: '2021-11-09'
excerpt: Active Record in Rails provides various methods like exists?, persisted?, destroyed? and many more...
categories:
  - Rails
  - Rails 7
---

[Active Record](https://api.rubyonrails.org/v6.1.4/classes/ActiveRecord/Persistence.html)
in Rails provides various methods like `exists?`, `persisted?`, `destroyed?` and
many more. Using these methods we can easily determine if an object exists in
the database or if an object is an existing record in the database and not a new
record.

Using these methods we can quickly determine the state of an object and easily
write complex conditional statements that depend on the state of an object.
Previously we did not have a method that lets us determine if an object was a
part of the database in past but now does not exist.

However,
[Rails 7 has added previously_persisted? method to ActiveRecord](https://github.com/rails/rails/pull/42389),
which returns `true` if an object has been previously a part of the database
records but now has been destroyed.

Let’s assume we have a `User` model with the name column value `John Doe`. If
this record has been deleted from the database, we can still check if `John Doe`
was a user of our app or not in the past.

### Before

Let's say we delete the user with the name `John Doe`.

```ruby
# app/controllers/user_controller.rb
previous_user = User.find_by_name('John Doe')
previous_user.destroy!
```

Now we can check if the user exists in our database.

```ruby
# app/controllers/user_controller.rb
# check if previous_user is destroyed and is not a new user
if previous_user.destroyed? && !previous_user.new_record?
  # returns true
end
```

### Rails 7 onwards

We can use the `previously_persisted?` method on an object.

Let's delete the user with the name `John Doe`.

```ruby
# app/controllers/user_controller.rb
previous_user = User.find_by_name('John Doe')
previous_user.destroy!
```

Now we can check if the user exists in our database using the
`previously_persisted?` method.

```ruby
# app/controllers/user_controller.rb
previous_user.previously_persisted? # returns true
```

Check out this [pull request](https://github.com/rails/rails/pull/42389) for
more details.

This article was originally published on this [website](https://www.bigbinary.com/blog/rails-7-adds-activerecord-previously_persisted).
