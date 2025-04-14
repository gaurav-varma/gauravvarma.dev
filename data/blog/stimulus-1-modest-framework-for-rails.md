---
title: Stimulus 1.0 – A modest JavaScript framework for Rails
createdAt: '2018-02-01'
excerpt: Stimulus 1.0, introduced by Basecamp, is a lightweight JavaScript framework designed to enhance server-rendered HTML. It pairs perfectly with Rails by adding behavior to the DOM without taking over the frontend.
categories:
  - StimulusJS
  - JavaScript
---

Basecamp introduced **Stimulus 1.0** as a lightweight JavaScript framework tailored for enhancing server-rendered applications—especially those built with Ruby on Rails. Unlike heavier frontend frameworks, Stimulus doesn’t aim to take over your application. Instead, it works **with** your HTML to add just the behavior you need.

### What is Stimulus?

Stimulus is a "modest" JavaScript framework that adds structure and interactivity to HTML. It observes the DOM and wires up behavior using HTML attributes like `data-controller`, `data-action`, and `data-target`.

It is part of the [Hotwire](https://hotwired.dev/) stack, designed to support fast, modern web apps without heavy JavaScript tooling.

### Why use Stimulus with Rails?

Stimulus complements the Rails philosophy:

- Embraces server-side rendering
- Minimal JavaScript setup and configuration
- Clean integration with Rails views
- Pairs naturally with Turbolinks (now Turbo)

### A simple example

Given an HTML element like this:

```html
<div data-controller="hello">
  <button data-action="click->hello#greet">Greet</button>
</div>
```

You could have a controller like:

```javascript
// hello_controller.js
import { Controller } from 'stimulus';

export default class extends Controller {
  greet() {
    alert('Hello from Stimulus!');
  }
}
```

No need for DOM selectors or event listeners in JavaScript—Stimulus handles it via declarative attributes.

### Key features of Stimulus 1.0

- **Simple and declarative**: Use HTML attributes to bind behavior.
- **Automatic lifecycle management**: Stimulus connects/disconnects controllers as elements appear or disappear.
- **Data-targets and data-values**: Use the DOM as your state tree.

### Use cases

- Form toggles
- Dynamic validation
- Real-time UI updates (when paired with Turbo)
- Alerts, counters, or light interactions

### Summary

Stimulus 1.0 is a perfect match for Rails developers who want JavaScript enhancements **without abandoning server-rendered views**. It provides structure and maintainability while keeping complexity low.

For more, visit [stimulus.hotwired.dev](https://stimulus.hotwired.dev/) or explore how Basecamp and 37signals use it in production.
