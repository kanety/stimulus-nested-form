# stimulus-nested-form

A stimulus controller for adding / removing Rails nested form dynamically.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-nested-form --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import NestedFormController from '@kanety/stimulus-nested-form';

const application = Application.start();
application.register('nested-form', NestedFormController);
```

Import css:

```css
@import '@kanety/stimulus-nested-form';
```

Build nested form using Rails `fields_for`:

```erb
<%= form_with do |f| %>
  <div data-controller="nested-form">
    <%= f.fields_for :assocs do |assoc_form| %>
      <div data-nested-form-target="form">
        <%= assoc_form.text_field :text %>
        <button type="button" data-action="nested-form#remove">Remove</button>
      </div>
    <% end %>
    <button type="button" data-action="nested-form#add">Add</button>
  </div>
<% end %>
```

New nested form will be added when the `Add` button is clicked.
The last element of the nested forms is used as a template to be added.
The index written in `id` and `name` attributes are incremented automatically as the following example:

```html
<form>
  <div data-controller="nested-form">
    <div data-nested-form-target="form">
      <input type="text" name="model[assocs_attributes][0][text]" id="model_assocs_attributes_0_text">
      <button type="button" data-action="nested-form#remove">Remove</button>
    </div>
    <div data-nested-form-target="form">
      <input type="text" name="model[assocs_attributes][1][text]" id="model_assocs_attributes_1_text">
      <button type="button" data-action="nested-form#remove">Remove</button>
    </div>
    <button type="button" data-action="nested-form#add">Add</button>
  </div>
</form>
```

The added form is handled as follows:

* The values of `input` and `textarea` elements are cleared.
* The selected options of `select` elements are cleared.
* The first element of radio buttons is selected.

### Options

#### associations

You can specify name of associations by `associations` option.
If the nested form consists of multiple associations such as `assocsA` and `assocsB`,
you can set the name of associations as the following example:

```html
<div data-controller="nested-form"
    data-nested-form-associations-value="[&quote;assocsA&quote;, &quote;assocsB&quote;]">
</div>
```

You can also specify name of primary keys as follows:

```html
<div data-controller="nested-form"
    data-nested-form-associations-value="[&quote;assocsA&quote;, &quote;assocsB&quote;]"
    data-nested-form-primary-keys-value="[&quote;id&quote;, &quote;id&quote;]">
</div>
```

#### max

If you want to disable `Add` button when the number of nested forms reached to the limit,
`max` option is available:

```javascript
<div data-controller="nested-form"
     data-nested-form-max-value="10">
</div>
```

#### start

If you want to change start index of nested form, `start` option is available:

```javascript
<div data-controller="nested-form"
     data-nested-form-start-value="10">
</div>
```

#### increment

If you want to change the number of adding nested form at once, `increment` option is available:

```javascript
<div data-controller="nested-form"
     data-nested-form-increment-value="3">
</div>
```

#### tags and attributes

You can customize tags and attributes which contains index value of nested form:

```javascript
NestedFormController.tags = NestedFormController.tags.concat(['a']);
NestedFormController.attributes = NestedFormController.attributes.concat(['onclick']);
```

Default tags and attributes are:

```javascript
static tags = ['input', 'textarea', 'select', 'label'];
static attributes = ['id', 'name', 'for'];
```

### Callbacks

Following callbacks are available to manipulate nested form elements:

```javascript
let element = document.querySelector('[data-controller="nested-form"]')
element.addEventListener('nested-form:before-add', (e) => {
  console.log(e.detail.form);  // form to be added
  e.preventDefault();          // you can cancel form addition by preventDefault
});
element.addEventListener('nested-form:after-add', (e) => {
  console.log(e.detail.form);  // added form
});
element.addEventListener('nested-form:before-remove', (e) => {
  console.log(e.detail.form);  // form to be remove
  e.preventDefault();          // you can cancel form removal by preventDefault
});
element.addEventListener('nested-form:after-remove', (e) => {
  console.log(e.detail.form);  // removed form
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
