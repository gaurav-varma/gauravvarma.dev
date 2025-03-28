---
title: Rails 6 introduces parameterized mailers in ActionMailer
createdAt: '2019-09-08'
excerpt: Rails 6 adds parameterized mailers, allowing mailer defaults like `@user` or `@order` to be reused across methods.
categories:
  - Rails
  - Rails 6
---

Rails 6 introduces **parameterized mailers**, which simplify mailer usage by setting instance variables shared across mail methods.

### Before

Each mail method had to receive parameters and assign them manually:

```ruby
class UserMailer < ApplicationMailer
  def welcome(user)
    @user = user
    mail(to: @user.email)
  end
end
```

### After: Parameterized Mailer

```ruby
class UserMailer < ApplicationMailer
  def welcome
    mail(to: @user.email)
  end
end

UserMailer.with(user: user).welcome.deliver_later
```

Instance variables like `@user` are automatically available, reducing duplication.

### Links

- [PR #34591 - Adds Parameterized mailer](https://github.com/rails/rails/pull/34591)
- [Rails Documentation for ActionMailer Parameterized ](https://api.rubyonrails.org/v6.0.5/classes/ActionMailer/Parameterized.html)

### Summary

Parameterized mailers reduce boilerplate and make mailer usage more consistent. This update helps keep mailer code clean and focused on delivery.
