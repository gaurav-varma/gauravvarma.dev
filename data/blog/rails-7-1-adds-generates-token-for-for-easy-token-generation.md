---
title: Rails 7.1 adds generates_token_for for easy token generation
createdAt: '2023-10-19'
excerpt: Rails 7.1 introduces `generates_token_for`, a declarative way to generate secure signed tokens for resources—perfect for email links, invitations, and password resets.
categories:
  - Rails
  - Rails 7.1
---

Token-based workflows like password resets, email confirmations, and invitation flows are everywhere in Rails apps. Rails 7.1 introduces a built-in way to handle them securely and declaratively with `generates_token_for`.

This eliminates boilerplate and external gems, making token handling feel like native Rails magic.

### What is `generates_token_for`?

It's a declarative API that generates **signed, tamper-proof tokens** scoped to your models and purposes. You can also add expiration and validations.

Under the hood, it uses `ActiveSupport::MessageVerifier`.

### Basic usage

```ruby
class User < ApplicationRecord
  generates_token_for :password_reset, expires_in: 15.minutes
end
```

Generate a token:

```ruby
token = user.generate_token_for(:password_reset)
```

Find the user from token:

```ruby
user = User.find_by_token_for(:password_reset, token)
```

Raise an error instead of returning `nil` if invalid:

```ruby
user = User.find_by_token_for!(:password_reset, token)
```

### Token lifecycle and block validation

You can optionally pass a block to `generates_token_for` that defines what makes the token valid. The return value is stored in the token and checked during lookup.

```ruby
class User < ApplicationRecord
  generates_token_for :name_confirmation, expires_in: 24.hours do
    name
  end
end
```

This means if the user’s name changes, the token becomes invalid—even before expiry.

```ruby
user = User.create!(name: "John Doe")
token = user.generate_token_for(:name_confirmation)

User.find_by_token_for(:name_confirmation, token) # => user

user.update!(name: "Jane Doe")
User.find_by_token_for(:name_confirmation, token) # => nil
```

If no block is given, the token only expires after the `expires_in` duration.

### Real-world examples

#### Password Reset

```ruby
class User < ApplicationRecord
  generates_token_for :password_reset, expires_in: 30.minutes
end

url = edit_password_url(token: user.generate_token_for(:password_reset))
```

#### Invite Token

```ruby
class Invitation < ApplicationRecord
  generates_token_for :invite, expires_in: 2.days
end

url = accept_invitation_url(token: invitation.generate_token_for(:invite))
```

#### Auth Token (no expiry)

```ruby
class User < ApplicationRecord
  generates_token_for :auth_token
end

token = user.generate_token_for(:auth_token)
```

This token won’t expire and remains valid even if attributes change.

### Bonus: Expiry vs Block

```
Configuration                    | Expires?        | Invalidated on update?
---------------------------------|------------------|-------------------------
`expires_in` only                | ✅ Yes (time)     | ❌ No
Block only                       | ❌ No             | ✅ Yes
Both `expires_in` and block      | ✅ Yes (time)     | ✅ Yes
None                             | ❌ No             | ❌ No
```

### References

- [Rails 7.1 release notes](https://guides.rubyonrails.org/7_1_release_notes.html#add-activerecord-base-generates-token-for)
- [API Docs](https://api.rubyonrails.org/v7.1/classes/ActiveRecord/TokenFor/ClassMethods.html#method-i-generates_token_for)

### Summary

`generates_token_for` is a long-awaited addition that simplifies token-based workflows in Rails apps. It’s clean, secure, flexible, and comes with zero setup. Whether you're building email confirmations, one-time links, or long-lived auth tokens—this API has you covered.
