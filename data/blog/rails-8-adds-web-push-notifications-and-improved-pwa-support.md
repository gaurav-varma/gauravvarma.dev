---
title: Rails 8 embraces PWA by default with manifest, service workers, and push notifications
createdAt: '2025-01-11'
excerpt: Rails 8 turns every new app into a Progressive Web App (PWA) out of the box with a default manifest.json, service worker, and Action Notifier support for push notifications.
categories:
  - Rails
  - Rails 8
---

Rails 8 makes it official: every new Rails app is now a **Progressive Web App by default** — complete with a `manifest.json`, service worker, and hooks for web push notifications via the upcoming Action Notifier framework.

This means Rails apps can now be installable, work offline, and send native-like push messages — without extra setup.

### Why PWAs matter

PWAs bridge the gap between web and native apps:

- Installable like a mobile app
- Launch without browser chrome
- Offline-capable
- Support for push notifications

Especially for B2C apps, being installable and having push capabilities can be make-or-break. With Rails 8, these features come out of the box.

### What's included in Rails 8

Rails 8 now scaffolds:

- `manifest.json.erb`: Defines the app name, icons, display behavior, and metadata
- `service-worker.js`: Registered automatically to enable offline caching and push
- Action Notifier (coming soon): A new framework to send push notifications

A recent [Rails PR (#50528)](https://github.com/rails/rails/pull/50528) added default PWA setup to every new app.

### Enabling the manifest

To make your Rails app installable on mobile:

1. Add `<link rel="manifest" href="/manifest.json">` to your layout
2. Ensure your manifest is served at `/manifest.json`
3. Add platform-specific icons:
   ```erb
   <link rel="icon" href="/logo.png" type="image/png">
   <link rel="apple-touch-icon" href="/logo.png">
   ```

Your app now prompts install in Chrome, Safari, Edge, and more.

Sample manifest:

```json
{
  "name": "My Rails App",
  "short_name": "RailsApp",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#f43f5e",
  "background_color": "#f43f5e",
  "icons": [{ "src": "/logo.png", "sizes": "512x512", "type": "image/png" }]
}
```

### Service worker basics

Rails 8 adds an empty service worker scaffold to get you started:

```js
// app/javascript/application.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

```js
// app/views/pwa/service-worker.js
self.addEventListener('install', () => console.log('Service Worker installed'));
self.addEventListener('activate', () =>
  console.log('Service Worker activated'),
);
```

You can extend it to handle caching and push notifications as needed.

### Push Notifications (coming soon)

The upcoming **Action Notifier** framework will power native-style push notifications with support for:

- Subscription handling
- VAPID keys
- Background delivery

This complements the service worker, making it easy to notify users even when they’re not actively using the app.

### Resources

- [PWA (Progressive Web Apps) in Rails 8](https://youtu.be/dU3Znt5E8Bg?si=ds-M17XSjPkVAgta)
- [Rails PR #50528 - Adds default pwa manifest and service worker](https://github.com/rails/rails/pull/50528)

### Summary

Rails 8 is now **PWA-ready by default**, removing all friction for developers who want modern app-like experiences.

You get:

- `manifest.json` and install prompts
- Service workers out of the box
- Hooks for push via Action Notifier

Whether you're building for mobile users, aiming for offline-first performance, or looking to boost engagement — Rails 8 sets the foundation right.
