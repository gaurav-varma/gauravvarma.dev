---
title: Rails 6 adopts Zeitwerk autoloader by default
createdAt: '2019-09-02'
excerpt: Rails 6 adopts Zeitwerk as the default code loader, bringing thread-safety, consistency, and improved autoloading behavior.
categories:
  - Rails
  - Rails 6
---

Rails 6 introduces **Zeitwerk** as the new default code loader, replacing the classic autoloader. Zeitwerk provides a modern, thread-safe, and eager-loading-friendly autoloading mechanism.

### What is Zeitwerk?

Zeitwerk is a code loader gem developed by Xavier Noria. It provides:

- Autoloading of constants
- Eager loading for production
- Reloading in development
- Thread safety by design

Unlike the classic autoloader, Zeitwerk doesn’t rely on `const_missing` hooks. Instead, it registers autoload paths directly with Ruby using `Module.autoload`, aligning more closely with Ruby’s semantics.

### Why Zeitwerk?

The motivation behind Zeitwerk was to keep code DRY and remove the need for brittle `require` calls. It also improves reliability by:

- Respecting Ruby's constant resolution rules
- Using the `TracePoint` API to manage nested modules
- Reducing confusion with explicit autoload paths

Zeitwerk is available as a standalone gem, so you can also use it in non-Rails Ruby projects.

### Using Zeitwerk in a Non-Rails Project

Zeitwerk is fully independent and works in plain Ruby apps:

```ruby
require "zeitwerk"

loader = Zeitwerk::Loader.new
loader.push_dir("lib")
loader.setup
```

For gem authors, Zeitwerk offers a helper:

```ruby
require "zeitwerk"

loader = Zeitwerk::Loader.for_gem
loader.setup

module MyGem
  include MyLogger
end
```

Once setup is done, constants are ready to be referenced without manual requires.

### How Zeitwerk Works

Zeitwerk leverages Ruby’s constant resolution flow:

- `Module.nesting`
- `Module.ancestors`

It no longer relies on `Object.ancestors`, and doesn't override `const_missing`.

In the classic loader (Rails < 6), autoloading worked by overriding `Module#const_missing` and looking for matching files in `ActiveSupport::Dependencies.autoload_paths`. It depended on naming conventions:

- File must be named after the class
- Must reside in an autoload path

### Zeitwerk Mode and TracePoint

Zeitwerk uses `Module.autoload` instead. For example:

```ruby
loader.push_dir("./lib")
# Internally does:
autoload "Automobile", "lib/automobile.rb"
```

When Zeitwerk sees `class Automobile`, it triggers a TracePoint hook. It checks if a directory named `automobile/` exists, and sets up autoloads for any files inside, like `automobile/engine.rb`.

```ruby
class Automobile
  # TracePoint triggers
  # Zeitwerk autoloads ./automobile/engine.rb if needed
end
```

This design ensures that modules are loaded in a predictable, Ruby-native way.

### Reverting to classic loader in Rails

Rails handles the switch automatically, but apps using non-standard structures may need adjustments. You can temporarily revert to the classic loader with:

```ruby
config.autoloader = :classic
```

### Links

- [Relevant Commit](https://github.com/rails/rails/commit/e53430fa9af239e21e11548499d814f540d421e5)
- [Zeitwerk-Rails integration](https://github.com/rails/rails/blob/bfc9065d58508fb19dd1a4170406604dd3b3234a/activesupport/lib/active_support/dependencies/zeitwerk_integration.rb)
- [Rails Documentation for Autoloading and Reloading Constants (Zeitwerk Mode)](https://guides.rubyonrails.org/v6.0/autoloading_and_reloading_constants.html)
- [Zeitwerk GitHub Repo](https://github.com/fxn/zeitwerk)

### Summary

Zeitwerk is a significant improvement over the classical Rails code loader. It's thread-safe, efficient, and aligns with Ruby’s native constant loading behavior. With Zeitwerk, Rails apps enjoy cleaner structure, fewer manual `require` calls, and a more predictable autoloading experience.

If you're upgrading to Rails 6 or starting fresh, Zeitwerk is already baked in — no extra config needed.
