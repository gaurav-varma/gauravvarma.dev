---
title: Rails 6 introduces Action Mailbox for inbound emails
createdAt: '2019-08-20'
excerpt: Action Mailbox is a new framework in Rails 6 for routing and processing incoming emails in your Rails app.
categories:
  - Rails
  - Rails 6
---

Rails 6 adds **Action Mailbox**, a framework for processing incoming emails directly in your application.

### What does it do?

Action Mailbox routes incoming emails to controller-like mailboxes in your app. It can be used for:

- Handling replies to notifications
- Creating records from emailed content
- Automating support ticket systems

### Supported ingress methods

- Postmark
- Mailgun
- Mandrill
- Exim/Sendmail
- Amazon SES

### Example usage

```ruby
class SupportMailbox < ApplicationMailbox
  def process
    SupportTicket.create!(
      email: mail.from,
      message: mail.body.decoded
    )
  end
end
```

### Resources

- [PR #34786 - Adds Action Mailbox](https://github.com/rails/rails/pull/34786)
- [Rails Documentation for Action Mailbox](https://guides.rubyonrails.org/action_mailbox_basics.html)
- [Rails 6 Action Mailbox Tryout](https://blog.saeloun.com/2019/11/11/rails-6-action-mailbox-tryout/)

### Summary

With Action Mailbox, Rails apps can become full-fledged email receivers. It brings an elegant, Rails-style approach to handling inbound messages.
