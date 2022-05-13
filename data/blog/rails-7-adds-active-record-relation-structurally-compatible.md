---
title: Rails 7 adds ActiveRecord::Relation#structurally_compatible?
createdAt: "2021-09-12"
excerpt: ActiveRecord is one of the most powerful features in Rails. With ActiveRecord we can easily query and handle database objects without writing any SQL...
---

[ActiveRecord](https://guides.rubyonrails.org/active_record_querying.html) is
one of the most powerful features in Rails. With `ActiveRecord` we can easily
query and handle database objects without writing any SQL.

By using `ActiveRecord Query Interface`, we can perform various query operations
like `Joins`, `Group`, `Find`, `Order`. We can also chain relations with
`where`, `and`, `or`, `not` but for `and` or `or` the two chaining relations
must be structurally compatible.

For any two relations to be
[Structurally Compatible](https://github.com/rails/rails/blob/c577657f6de64b743b12a21108dc9cc5cfc35098/activerecord/lib/active_record/relation/query_methods.rb#L650)
they must be scoping the same model, and they must differ only by the `where`
clause when no `group` clause has been defined. If a `group` clause is present
then the relations must differ by the `having` clause. Also, Neither relation
may use a `limit`, `offset`, or `distinct` method.

Previously for `and` or `or` query methods, we needed to make sure that the two
relations are structurally compatible otherwise `ActiveRecord` would raise an
error.

However,
[Rails 7 has added ActiveRecord::Relation#structurally_compatible?](https://github.com/rails/rails/pull/41841)
which provides a method to easily tell if two relations are structurally
compatible. We can use this method before we run `and` or `or` query methods on
any two relations.

Let's assume we have two models `Blog` and `Post` with the following relations
```ruby
# app/models/blog.rb
class Blog < ApplicationRecord
  has_many :posts
end
```

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :blog
end
```

### Before

If we run `or` query between incompatible relations we would get an
ArgumentError.

```ruby
relation_1 = Blog.where(name: 'bigbinary blog')
relation_2 = Blog.joins(:posts).where(posts: { user_id: current_user.id})

begin
  relation_1.or(relation_2)
rescue ArgumentError
  # Rescue ArgumentError
end
```

### Rails 7 onwards

We can check the structural compatibility of the two relations.

```ruby
relation_1 = Blog.where(name: 'bigbinary blog')
relation_2 = Blog.where(user_id: current_user.id)

if relation_1.structurally_compatible?(relation_2) # returns true
  relation_1.or(relation_2)
end
```

Check out this [pull request](https://github.com/rails/rails/pull/41841/files)
for more details.

This article was originally published on the this [website](https://www.bigbinary.com/blog/rails-7-adds-active-record-relation-structurally-compatible).
