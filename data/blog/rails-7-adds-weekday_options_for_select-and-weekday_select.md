---
title: Rails 7 adds weekday_options_for_select and weekday_select
createdAt: "2021-11-09"
excerpt: In web applications, forms are one of the most essential interfaces for user input and it can be tedious to write...
---

In web applications, forms are one of the most essential interfaces for user
input and it can be tedious to write and maintain form markups with many
attributes. Rails provide
[Action View Form Helpers](https://guides.rubyonrails.org/form_helpers.html) for
generating form markup.

Using
[select](https://guides.rubyonrails.org/form_helpers.html#making-select-boxes-with-ease)
helper we can easily create select boxes in HTML with one `<option>` element for
each option to choose from.

For example, let's say we have a list of cities for the user to choose from.

```ruby
# app/views/address/new.html.erb
<%= form.select :city, ["Pune", "Mumbai", "Delhi"] %>
```

Rails will generate the following markup.

```html
<select name="city" id="city">
  <option value="Pune">Pune</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Delhi">Delhi</option>
</select>
```

Previously for generating a select box for weekday select, we needed to write a
custom helper. Rails did not have anything out of the box for the weekday
selection.

However,
[Rails 7 has added weekday_options_for_select and weekday_select](https://github.com/rails/rails/pull/42979)
using which we can easily generate a dropdown field of selecting a weekday.

### Before

In Rails 6.1 we can create a dropdown field for weekday as shown here.

```ruby
# app/views/users/new.html.erb
<%= form_with(model: user) do |form| %>
  <div class="field">
    <%= form.label :weekly_off %>
    <%= form.select :weekly_off, I18n.t('date.day_names') %>
  </div>
<% end %>
```

Or we can do something like this.

```ruby
# app/views/users/new.html.erb
<%= form_with(model: user) do |form| %>
  <div class="field">
    <%= form.label :weekly_off %>
    <%= form.select :weekly_off, I18n.t('date.day_names').map.with_index.to_h %>
  </div>
<% end %>
```

Then The generated markup looks like this.

```html
<select name="user[weekly_off]" id="user_weekly_off">
  <option value="Sunday">Sunday</option>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
</select>
```

Here is how it would look if we go with the second option.

```html
<select name="user[weekly_off]" id="user_weekly_off">
  <option value="0">Sunday</option>
  <option value="1">Monday</option>
  <option value="2">Tuesday</option>
  <option value="3">Wednesday</option>
  <option value="4">Thursday</option>
  <option value="5">Friday</option>
  <option value="6">Saturday</option>
</select>
```

### Rails 7 onwards

We can use the `weekday_options_for_select` or `weekday_select` helper for
generating a dropdown field for selecting a weekday.

```ruby
# app/views/users/new.html.erb
<%= form_with(model: user) do |form| %>
  <div class="field">
    <%= form.label :weekly_off %>
    <%= form.select :weekly_off, weekday_options_for_select("Monday", day_format: :abbr_day_names) %>
  </div>
<% end %>
```

Or we can do something like this.

```ruby
# app/views/users/new.html.erb
<%= form_with(model: user) do |form| %>
  <div class="field">
    <%= form.label :weekly_off %>
    <%= form.weekday_select :weekly_off, { selected: "Monday", day_format: :abbr_day_names } %>
  </div>
<% end %>
```

Then The generated markup looks like this.

```html
<select name="user[weekly_off]" id="user_weekly_off">
  <option value="Sunday">Sunday</option>
  <option selected="selected" value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
</select>
```

`weekday_options_for_select` accepts a few options and all of them have a
default value.

`selected` defaults to nil and if we provide this argument the value passed will
be used as the selected option.

```html
 <!-- weekday_options_for_select("Friday") -->
<option value=\"Sunday\">Sunday</option>\n
<option value=\"Monday\">Monday</option>\n
<option value=\"Tuesday\">Tuesday</option>\n
<option value=\"Wednesday\">Wednesday</option>\n
<option value=\"Thursday\">Thursday</option>\n
<option selected=\"selected\" value=\"Friday\">Friday</option>\n
<option value=\"Saturday\">Saturday</option>"
```

`index_as_value` defaults to false and if true it will set the value of each
option to the index of that day.

```html
<!-- weekday_options_for_select(index_as_value: true) -->
<option value=\"0\">Sunday</option>\n
<option value=\"1\">Monday</option>\n
<option value=\"2\">Tuesday</option>\n
<option value=\"3\">Wednesday</option>\n
<option value=\"4\">Thursday</option>\n
<option value=\"5\">Friday</option>\n
<option value=\"6\">Saturday</option>"
```

`day_format` defaults to :day_names and passing this a different `I18n` key will
use different formats for the option display names and their values.

```html
<!-- weekday_options_for_select(day_format: :abbr_day_names) -->
<option value=\"Sun\">Sun</option>\n
<option value=\"Mon\">Mon</option>\n
<option value=\"Tue\">Tue</option>\n
<option value=\"We\">Wedn</option>\n
<option value=\"Thu\">Thu</option>\n
<option value=\"Fri\">Fri</option>\n
<option value=\"Sat\">Sat</option>"
```

Note that `:abbr_day_names` options are built into Rails but we can define your
array.

Check out this [pull request](https://github.com/rails/rails/pull/42979) for
more details.

This article was originally published on the this [website](https://www.bigbinary.com/blog/rails-7-adds-weekday_options_for_select-and-weekday_select).