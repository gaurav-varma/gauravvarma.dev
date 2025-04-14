---
title: Ruby 3.3 introduces the new Prism parser and RJIT compiler
createdAt: '2024-01-05'
excerpt: Ruby 3.3 ships with Prism, a new experimental Ruby parser, and RJIT, a new JIT compiler aimed at improving performance in production environments.
categories:
  - Ruby
  - Ruby 3.3
  - Performance
---

Ruby 3.3 brings two major under-the-hood updates: the **Prism parser** and the **RJIT compiler**.

These experimental features are aimed at making Ruby faster, more consistent, and more compatible with tools like linters, syntax checkers, and future language evolution.

### What is Prism?

Prism is a new parser written in C and built with modern compiler techniques. It aims to replace the legacy `Ripper` parser and provides a full-fidelity AST (Abstract Syntax Tree).

This allows better tooling, static analysis, and possibly safer syntax-level transformations.

### What is RJIT?

RJIT (Ruby JIT) is a new in-process JIT compiler intended to eventually replace MJIT. It’s simpler, more portable, and focused on real-world production performance, especially in Rails apps.

### Why it matters

- Prism will improve RuboCop, IDEs, and dev tools
- RJIT brings runtime speed improvements
- Both are modular and future-ready
- Enables a better language server (LSP) in Ruby tooling

### Enabling RJIT

In Ruby 3.3, RJIT is experimental and off by default. Enable it with:

```bash
ruby --enable-rjit my_script.rb
```

### Resources

- [Ruby 3.3 Release Notes](https://www.ruby-lang.org/en/news/2023/12/25/ruby-3-3-0-released/)
- [GitHub - Prism](https://github.com/ruby/prism)
- [Prism Documentation](https://ruby.github.io/prism/)
- [Ruby RJIT Doc](https://docs.ruby-lang.org/en/3.3/rjit/rjit_md.html)

### Summary

Prism and RJIT mark a new era for Ruby internals — laying the foundation for faster execution, better tooling, and a smoother developer experience in future Ruby versions.
