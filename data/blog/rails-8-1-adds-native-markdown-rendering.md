---
title: Rails 8.1 adds native Markdown rendering (respond to format.md in controllers)
createdAt: '2025-11-17'
excerpt: Rails 8.1 introduces native Markdown rendering support, allowing controllers to respond to format.md without external libraries.
categories:
  - Rails
  - Rails 8.1
  - Rendering
---

Rails 8.1 introduces **native Markdown rendering**, allowing controllers to respond directly to the `md` format. Markdown-based views fit naturally alongside modern asset handling with [Propshaft](../rails-8-makes-propshaft-the-default-asset-pipeline) and can be used to document features instrumented with [Structured Event Reporting](../rails-8-1-adds-structured-event-reporting).

Markdown is widely used for documentation, developer portals, and content-heavy applications. Before Rails 8.1, developers typically needed external libraries or custom rendering logic to support Markdown responses.

With this update, Rails can render Markdown content using the standard `respond_to` interface.

---

### Responding with Markdown

Controllers can now respond to Markdown requests using `format.md`.

Example controller:

```ruby
def show
  @article = Article.find(params[:id])

  respond_to do |format|
    format.html
    format.md
  end
end
```

Rails will automatically render the corresponding Markdown template.

---

### Example Markdown template

Create a view file:

```bash
app/views/articles/show.md.erb
```

Example content:

```markdown
# <%= @article.title %>

<%= @article.body %>
```

Rails renders the Markdown response when a client requests the `.md` format.

---

### Why Markdown support matters

Markdown is commonly used in many types of applications:

- documentation sites
- developer portals
- content publishing platforms
- knowledge bases
- APIs returning Markdown content

By supporting Markdown natively, Rails makes it easier to build applications that work with structured text content.

---

### Example request

A client can request Markdown content directly:

```bash
GET /articles/1.md
```

Rails will render the Markdown template instead of HTML.

---

### Example use cases

Native Markdown rendering works well for:

- documentation generators
- blog platforms
- developer-focused apps
- API responses
- knowledge base systems

It provides a lightweight alternative to HTML templates when structured text output is preferred.

---

### Links

- [https://guides.rubyonrails.org/8_1_release_notes.html](https://guides.rubyonrails.org/8_1_release_notes.html)
- [https://github.com/rails/rails](https://github.com/rails/rails)

---

### Summary

Rails 8.1 simplifies Markdown support by allowing controllers to respond to `format.md`. With native rendering built into the framework, developers can serve Markdown content without external libraries or custom integrations.
