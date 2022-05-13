---
title: Rails 7 replaced byebug with ruby/debug
createdAt: "2021-11-09"
excerpt: Rails 5 introduced byebug which is an easy-to-use, feature-rich ruby debugger. It offers features like Stepping, Breaking, Evaluating, Tracking...
---

Rails 5 introduced [byebug](https://github.com/deivid-rodriguez/byebug) which is
an easy-to-use, feature-rich ruby debugger. It offers features like `Stepping`,
`Breaking`, `Evaluating`, `Tracking`.

Using [byebug](https://github.com/deivid-rodriguez/byebug) we can easily control
the execution of a program and the debug inspector for call stack navigation.
This allows us to handle and track the execution flow.

Here is
[byebug documentation](https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-byebug-gem)
and here is the [pull request](https://github.com/rails/rails/pull/14646) where
it was added.

[Rails 7 is replacing byebug with ruby/debug](https://github.com/rails/rails/pull/43187).
`debug` is Ruby’s new debugger which will be included in Ruby 3.1. To align
Rails with Ruby `debug` has been added to Rails 7.

Let's see an example of debugging with both Byebug and Debug.

### Before

Let's assume we have a `NameController`. Inside any Rails application, you can
call the debugger by calling the `byebug` method.

```ruby
# app/controllers/name_controller.rb
class NameController < ApplicationController
  def index
    name = "John Doe"
    byebug # Call to debugger
    city = "San Francisco"
  end
end
```

Then The invoked debugger results in the following.

```ruby
    [1, 7] in app/controllers/test_controller.rb
    1: class NameController < ApplicationController
    2:   def index
    3:     name = "John Doe"
    4:     byebug # Call to debugger
=>  5:    city = "San Francisco"
    6:   end
    7: end

  (byebug) name # variable call
  "John Doe"
```

### Rails 7 onwards

We can use the `binding.break` method for calling Ruby Debug.

```ruby
# app/controllers/name_controller.rb
class NameController < ApplicationController
  def index
    name = "John Doe"
    binding.break # Call to debugger
    city = "San Francisco"
  end
end
```

The invoked debugger results in the following.

```ruby
  [1, 7] in app/controllers/test_controller.rb
  1| class NameController < ApplicationController
  2|   def index
  3|     name = "John Doe"
  4|     binding.break # Call to debugger
> 5|    city = "San Francisco"
  6|   end
  7| end
>#0 NameController#index at ~/demo_app/app/controllers/name_controller.rb:5
  #1  ActionController::BasicImplicitRender#send_action(method="index", args=[])
(rdbg) name # variable call
"John Doe"
```

Check out this [pull request](https://github.com/rails/rails/pull/43187) for more details and for commands or features of Ruby Debug, please visit [Ruby-Debug](https://github.com/ruby/debug).

This article was originally published on this [website](https://www.bigbinary.com/blog/rails-7-replaced-byebug-with-ruby-debug).
