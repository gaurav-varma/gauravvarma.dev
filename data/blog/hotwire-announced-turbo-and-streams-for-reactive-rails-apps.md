---
title: Hotwire announced Turbo & Streams for reactive Rails apps
createdAt: '2021-01-10'
excerpt: Basecamp introduced Hotwire, a new way to build modern, reactive applications in Rails without using much JavaScript. It includes Turbo and Stimulus to enable fast, real-time updates from the server.
categories:
  - Rails
  - Hotwire
  - Turbo
  - Stimulus
  - Real-Time
---

In January 2021, Basecamp introduced **Hotwire** — short for **HTML Over The Wire** — a new approach to building reactive web applications with minimal JavaScript.

Hotwire is a set of complementary technologies that replaces heavy frontend JavaScript frameworks with **server-rendered HTML** updates that are pushed over the wire.

### What is Hotwire?

Hotwire is made up of two main parts:

- **Turbo**: Replaces Rails’ default UJS and makes your app feel instant.

  - Turbo Drive: Speeds up navigation
  - Turbo Frames: Updates portions of the page
  - Turbo Streams: Sends real-time HTML updates via WebSockets or polling

- **Stimulus**: A lightweight JavaScript framework for adding client-side interactivity.

Together, Turbo and Stimulus provide a complete reactive experience with almost no custom JS.

### Why Hotwire?

- Reduces JS complexity by offloading rendering to the server
- Keeps your frontend in sync with your Rails views
- Easy to debug and maintain
- Great for full-stack Rails teams

It’s ideal for applications where server-rendered HTML still makes sense, but interactivity is needed.

### Getting Started

Add Hotwire to your Rails app:

```bash
bundle add hotwire-rails
bin/rails hotwire:install
```

This installs Turbo and Stimulus, sets up your JS structure, and prepares your app to use Turbo Drive, Frames, and Streams.

### Turbo Streams Example

Here’s a sample stream that appends a message to a chat box:

```erb
<%= turbo_stream.append "messages" do %>
  <div class="message"><%= @message.body %></div>
<% end %>
```

This automatically pushes HTML to clients connected via WebSockets (if using ActionCable).

### Turbo Frame Example

Split your page into replaceable components:

```erb
<turbo-frame id="profile">
  <%= render @user %>
</turbo-frame>
```

Rails will target this frame with updates, rather than reloading the whole page.

### Performance Boost

Hotwire apps feel incredibly fast because:

- Navigation doesn't reload the full page
- Partial updates happen without re-rendering JS
- Real-time streams are simple and efficient

### Resources

- [Hotwire.dev](https://hotwired.dev)
- [Turbo GitHub](https://github.com/hotwired/turbo-rails)
- [Stimulus GitHub](https://github.com/hotwired/stimulus)
- [DHH’s Announcement Post](https://world.hey.com/dhh/the-time-is-right-for-hotwire-ecdb9b33)

### Summary

Hotwire simplifies how we build reactive Rails apps by rethinking the role of JavaScript. With Turbo and Stimulus, you can create fast, real-time features without the complexity of SPAs — keeping the Rails magic alive.
