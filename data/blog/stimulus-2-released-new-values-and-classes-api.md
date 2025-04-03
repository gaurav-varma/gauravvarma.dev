---
title: Stimulus 2.0 released – new Values & Classes API for controllers
createdAt: '2021-01-05'
excerpt: Stimulus 2.0 enhances controller flexibility with new `values` and `classes` APIs, simplifying how dynamic behavior is handled.
categories:
  - StimulusJS
  - JavaScript
---

Stimulus 2.0 brings new capabilities to your frontend controllers with the **Values API** and **Classes API**.

### Values API

Define typed properties with default values:

```javascript
export default class extends Controller {
  static values = { count: Number };

  connect() {
    console.log(this.countValue); // => 0 or passed value
  }
}
```

You can then set this value in your HTML:

```html
<div data-controller="my-controller" data-my-controller-count-value="5"></div>
```

### Classes API

Bind CSS classes to behavior:

```javascript
static classes = ["highlight"]

connect() {
  this.element.classList.add(this.highlightClass) // returns class name
}
```

You can specify the class name in your HTML:

```html
<div
  data-controller="my-controller"
  data-my-controller-highlight-class="active"
></div>
```

### Links

- [PR #202 - Adds values and classes APIs](https://github.com/hotwired/stimulus/pull/202)
- [Relevant Discussion](https://discuss.hotwired.dev/t/announcing-stimulus-2-0/1482)

### Summary

Stimulus 2.0 significantly enhances the power and flexibility of JavaScript controllers. The Values API simplifies the management of dynamic data and default configurations directly within the controller, while the Classes API provides a clean and declarative way to toggle and manage CSS classes based on controller state and actions. These additions allow for more expressive and maintainable frontend behavior without compromising Stimulus's core "modest" design principles.
