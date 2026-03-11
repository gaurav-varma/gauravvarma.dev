---
title: Rails 8 includes a built-in authentication system generator
createdAt: '2025-03-21'
excerpt: Rails 8 introduces a built-in authentication generator that scaffolds login, signup, and session management without external gems.
categories:
  - Rails
  - Rails 8
  - Security
---

Rails 8 introduces a **built-in authentication generator**, giving developers a simple way to add login and session management without relying on external gems.

For many years, Rails applications commonly used libraries like **Devise, Sorcery, or Authlogic** to implement authentication. While powerful, these libraries often add complexity for simple applications. Authentication flows can also emit structured login events using [Structured Event Reporting](/blog/rails-8-1-adds-structured-event-reporting), and run on top of modern Rails infrastructure like [Propshaft](/blog/rails-8-makes-propshaft-the-default-asset-pipeline).

The new Rails authentication generator provides a **secure, minimal starting point** that integrates directly with Rails conventions.

---

### Why a built-in authentication system?

Authentication is one of the most common requirements in web applications. However, new developers often struggle with:

- secure password handling
- session management
- login flows
- user registration

Rails 8 simplifies this by providing an official authentication generator that follows best practices.

Benefits include:

- built-in password hashing
- session-based authentication
- simple user models
- fewer external dependencies

---

### Generating authentication

You can generate the authentication system using the Rails generator:

```bash
bin/rails generate authentication
```

This command creates:

- a `User` model
- session controllers
- login/logout routes
- authentication helpers

---

### Password storage

Rails uses **bcrypt** for password hashing through `has_secure_password`.

Example model:

```ruby
class User < ApplicationRecord
  has_secure_password
end
```

This automatically adds secure password handling with:

- password hashing
- password confirmation
- authentication helpers

---

### Logging users in

Sessions are handled through a controller that verifies credentials.

Example login logic:

```ruby
user = User.find_by(email: params[:email])

if user&.authenticate(params[:password])
  session[:user_id] = user.id
end
```

Rails stores the session securely using cookies.

---

### Example authentication helper

Controllers can restrict access using authentication helpers:

```ruby
before_action :require_login

def require_login
  redirect_to login_path unless session[:user_id]
end
```

This ensures only authenticated users can access protected pages.

---

### Real-world use cases

The Rails authentication generator works well for:

- SaaS applications
- admin dashboards
- internal tools
- MVP products
- small to medium web apps

Larger applications may still prefer more advanced solutions like Devise, but the built-in system covers most common needs.

---

### Links

- [Rails 8.0 Release Notes](https://guides.rubyonrails.org/8_0_release_notes.html)
- [rails/rails on GitHub](https://github.com/rails/rails)

---

### Summary

Rails 8’s authentication generator makes it easier than ever to add secure login functionality to an application. By providing a simple, official solution built into the framework, Rails reduces dependency on external libraries while promoting secure authentication practices.
