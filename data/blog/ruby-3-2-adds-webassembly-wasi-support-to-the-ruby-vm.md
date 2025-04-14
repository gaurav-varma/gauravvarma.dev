---
title: Ruby 3.2 adds WebAssembly (WASI) support to the Ruby VM
createdAt: '2023-01-05'
excerpt: Ruby 3.2 introduces support for compiling to WebAssembly with WASI, opening the door to running Ruby in new environments like browsers, edge computing, and serverless platforms.
categories:
  - Ruby
  - Ruby 3.2
---

With Ruby 3.2, developers can now compile Ruby code to WebAssembly using WASI (WebAssembly System Interface). This marks a significant step toward making Ruby applications portable across platforms like browsers, edge devices, and even serverless runtimes.

### What is WASI?

WASI stands for **WebAssembly System Interface** — a standardized set of APIs that give WebAssembly modules access to system-like features such as files, clocks, environment variables, and more. It allows WebAssembly to run in environments **outside the browser** safely and securely.

### Why Ruby in WebAssembly?

Historically, Ruby has been tightly coupled to its native system runtime. This made it difficult to run Ruby scripts in sandboxed environments like browsers or edge compute services. But with WASI support, you can now:

- Embed Ruby scripts in WebAssembly runtimes
- Run Ruby in the browser (with limited I/O)
- Deploy Ruby logic to edge functions or CDNs
- Experiment in isolated, reproducible environments

This is a foundational shift, enabling Ruby to be more portable, embeddable, and accessible in polyglot environments.

### How to Try It

The Ruby core team has created [ruby.wasm](https://github.com/ruby/ruby.wasm) — a project that compiles Ruby to WebAssembly and provides tools to run it in WASI-compatible runtimes.

Here’s how to get started:

```bash
git clone https://github.com/ruby/ruby.wasm
cd ruby.wasm
make setup
make build
```

You can also try it directly in the browser via the hosted playground:

👉 [https://livecodes.io](https://livecodes.io/?template=ruby-wasm)

Or run `.wasm` files using runtimes like Wasmtime or Wasmer:

```bash
wasmtime ruby.wasm --eval 'puts "Hello from WASI Ruby!"'
```

### Use Cases

- Interactive Ruby tutorials in the browser
- WASM-powered Ruby CLIs embedded in web UIs
- Edge deployments with tools like Fastly or Cloudflare Workers (WASI-based)
- Ruby playgrounds and sandboxes for teaching or demos

While you can’t yet run a full Rails app in WASM, this opens the door to future frameworks or mini-Rack-style implementations in the browser.

### Limitations

Ruby’s WASI support is still **experimental**. A few limitations include:

- No support for threads, sockets, or some native gems
- Limited system calls and file system access
- Only basic I/O support via stdout and stdin

Still, it's promising — especially for lightweight Ruby logic and experimentation.

### References

- [Ruby 3.2 Release Announcement](https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/)
- [GitHub Repo - ruby.wasm](https://github.com/ruby/ruby.wasm)
- [GitHub Repo - WASI (WebAssembly System Interface)](https://github.com/WebAssembly/WASI)
- [Wasmtime - A lightweight WebAssembly runtime](https://github.com/bytecodealliance/wasmtime)
- [WebAssembly (Wasm) Standard - Official Site](https://wasi.dev)
- [WebAssembly - Official Site](https://webassembly.org/)

### Final Thoughts

Ruby 3.2’s WASI support is one of the boldest moves toward modernizing Ruby’s deployment story. While still early, it represents a new era — where Ruby can live beyond servers, breaking into browsers, embedded platforms, and serverless worlds.
