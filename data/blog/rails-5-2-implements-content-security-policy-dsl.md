---
title: Rails 5.2 implements Content Security Policy DSL
createdAt: '2018-04-27'
excerpt: Rails 5.2 introduces a DSL to define content security policies (CSP), protecting applications from cross-site scripting (XSS) and other attacks.
categories:
  - Rails
  - Rails 5.2
---

Rails 5.2 brings built-in support for defining **Content Security Policies (CSP)** using a clear and expressive Ruby DSL. CSP is a browser feature that restricts which resources (scripts, styles, etc.) can be loaded on your site.

### Defining a policy

You can define a policy in `app/controllers/application_controller.rb`:

```ruby
class ApplicationController < ActionController::Base
  content_security_policy do |p|
    p.default_src :self, :https
    p.font_src    :self, :https, :data
    p.img_src     :self, :https, :data
    p.object_src  :none
    p.script_src  :self, :https
    p.style_src   :self, :https
  end
end
```

### Benefits of CSP

- Mitigates XSS and injection attacks
- Restricts third-party resource loading
- Helps enforce secure coding practices

### Links

- [PR #31162 - Adds DSL for configuring Content-Security-Policy header](https://github.com/rails/rails/pull/31162)
- [Rails documentation for Content Security Policy DSL](https://guides.rubyonrails.org/v5.2/security.html#content-security-policy)

### Summary

With its new CSP DSL, Rails 5.2 allows developers to easily define and enforce strong content security policies, improving browser-side security without relying on middleware or external gems.
