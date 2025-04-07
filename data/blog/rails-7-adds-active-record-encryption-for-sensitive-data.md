---
title: Rails 7 adds Active Record Encryption for sensitive data
createdAt: '2021-12-20'
excerpt: Rails 7 introduces built-in Active Record Encryption, allowing transparent encryption/decryption of sensitive attributes.
categories:
  - Rails
  - Rails 7
---

Before Rails 7, encrypting attributes in Active Record models meant relying on third-party gems like `lockbox`. While effective, these added external dependencies and complexity.

Rails 7 brings first-class **Active Record Encryption** support, letting you securely store sensitive data with minimal setup and without external gems.

### How Active Record Encryption works

You can now mark model attributes to be encrypted like this:

```ruby
class User < ApplicationRecord
  encrypts :passport_number
end
```

Once configured, Rails will automatically encrypt `passport_number` before saving it to the database and decrypt it transparently when reading.

Behind the scenes, Rails uses AES-GCM encryption (non-deterministic by default) and the new `EncryptableRecord` concern.

### Setup

To get started, you’ll need to initialize encryption keys. Run the following command:

```bash
bin/rails db:encryption:init
```

This generates keys and salts in `config/credentials.yml.enc`:

```yaml
active_record_encryption:
  primary_key: <generated-key>
  deterministic_key: <generated-key>
  key_derivation_salt: <generated-salt>
```

These secrets are required to securely encrypt and decrypt the data.

### Example in action

```ruby
user = User.create(name: "Gaurav", passport_number: "DK76FS87DF")
```

When saved, the value of `passport_number` is encrypted in the DB But when queried:

```ruby
User.last.passport_number
# => "DK76FS87DF"
```

### Features

- Built-in AES-GCM encryption
- Per-attribute encryption support
- Key rotation
- Optional deterministic mode for searchable encrypted fields
- No extra gems required

### References

- [Rails Active Record Encryption Guide](https://guides.rubyonrails.org/v7.0/active_record_encryption.html)
- [Rails PR #41659 - Adds Active Record Encryption](https://github.com/rails/rails/pull/41659)

### Summary

Rails 7 introduces native, secure encryption for Active Record attributes—making it easier than ever to protect sensitive user data like SSNs, credit card numbers, or passport IDs. It’s opinionated, flexible, and ready for production use out of the box.
