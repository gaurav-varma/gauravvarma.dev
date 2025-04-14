---
title: RSpec 3.9 adds example filtering and failure grouping
createdAt: '2019-10-16'
excerpt: RSpec 3.9 improves test organization with grouped failures and enhanced filtering options for large test suites.
categories:
  - RSpec
  - Testing
---

RSpec 3.9 continues to improve the developer experience for large test suites with two major usability enhancements: **grouped failures** and **advanced example filtering**.

### Grouped failures

Debugging a test suite becomes easier when related failures are grouped together. RSpec 3.9 introduces structured output that organizes failing examples by file and context, making it quicker to pinpoint and address issues.

### Enhanced Example Filtering

You now have more power to target specific tests. RSpec 3.9 supports:

- **Tag-based filtering** using metadata like `:focus` or custom tags
- **Line number targeting** (e.g. run a test near a specific line)
- **Regex filtering** with `--example-matches`, which lets you run examples that match a pattern in the description

#### Example

```bash
rspec spec/models/user_spec.rb:42
```

Or use `--example-matches` for fuzzy matching:

```bash
rspec --example-matches "user updates"
```

### New: Minimalist Failure Formatter

A new formatter, `--format failure_list` (or just `-f f`), was introduced. It outputs failing specs in a clean, quick-fix-friendly format:

```bash
spec/models/user_spec.rb:15 # User validations fails with invalid email
spec/services/payment_service_spec.rb:37 # PaymentService charges card
```

Great for CI pipelines or quick copy-paste debugging.

### Behind the Scenes

Other internal improvements in RSpec 3.9 include:

- Smarter error handling when loading spec support files
- `did_you_mean` suggestions for LoadErrors
- Improved thread safety in mocks using mutexes
- Generator support for system specs, generators, and controller routes in `rspec-rails`

### Links

- [RSpec 3.9 Release Notes](https://rspec.info/blog/2019/10/rspec-3-9-has-been-released/)
- [RSpec Documentation](https://rspec.info/documentation/)
- [RSpec GitHub](https://github.com/rspec/rspec-core)

### Summary

With improved filtering, grouped failure output, and new CLI tools like `--example-matches` and `failure_list`, RSpec 3.9 makes debugging faster and more intuitive — especially in large or flaky test suites.
