import { Controller } from '@hotwired/stimulus';
import FormBuilder from './form-builder';

export default class extends Controller {
  static targets = ['form'];
  static values = {
    start: { type: Number, default: 0 },
    increment: { type: Number, default: 1 },
    max: Number,
    addPos: { type: String, default: 'last' },
    associations: { type: Array, default: [''] },
    suffixes: { type: Array, default: ['_attributes'] },
    primaryKeys: { type: Array, default: ['id'] },
  };

  static tags = ['input', 'textarea', 'select', 'label'];
  static attributes = ['id', 'name', 'for'];

  get adder() {
    return this.element.querySelector(`[data-action="${this.identifier}#add"]`);
  }

  get assocs() {
    let associations = [].concat(this.associationsValue);
    let suffixes = [].concat(this.suffixesValue);
    let primaryKeys = [].concat(this.primaryKeysValue);
    return associations.map((assoc, i) => {
      let suffix = suffixes[i] || suffixes[0];
      let pk = primaryKeys[i] || primaryKeys[0];
      return { description: `${assoc}${suffix}`, pk: pk };
    });
  }

  initialize() {
    this.builder = new FormBuilder(this);
  }

  add(e) {
    for (let n=0; n<this.incrementValue; n++) {
      let form = this.builder.run();

      let event = this.dispatch('before-add', { detail: { form: form }});
      if (event.defaultPrevented) continue;
      this.addForm(form);
      this.dispatch('after-add', { detail: { form: form }});

      if (this.hasMaxForms()) break;
    }

    e.preventDefault();
  }

  remove(e) {
    let form = e.target.closest(`[data-${this.identifier}-target="form"]`);
    if (!form) return;

    let event = this.dispatch('before-remove', { detail: { form: form }});
    if (event.defaultPrevented) return;
    this.removeForm(form);
    this.dispatch('after-remove', { detail: { form: form }});

    e.preventDefault();
  }

  addForm(form) {
    if (this.addPosValue == 'first') {
      this.formTargets[0].before(form);
    } else {
      this.formTargets.slice(-1)[0].after(form);
    }

    setTimeout(() => {
      form.querySelectorAll(`[data-controller="${this.identifier}"]`).forEach(nestedForm => {
        let controller = this.application.getControllerForElementAndIdentifier(nestedForm, this.identifier);
        if (controller) {
          controller.formTargets.forEach(form => controller.builder.removePK(form));
        }
      });
    });

    this.refresh();
  }

  removeForm(form) {
    form.style.display = 'none';

    let regexps = this.assocs.map(assoc => new RegExp(`${assoc.description}(\\])?\\[\\d+\\]\\[_destroy\\]`));

    form.querySelectorAll('input[name][type=hidden]').forEach(elem => {
      regexps.forEach(regexp => {
        if (elem.name.match(regexp)) {
          elem.value = '1';
        }
      });
    });

    this.refresh();
  }

  refresh() {
    if (this.hasMaxForms()) {
      this.disableAdder(true);
    } else {
      this.disableAdder(false);
    }
  }

  hasMaxForms() {
    return this.maxValue &&
           this.formTargets.filter(form => form.style.display != 'none').length >= this.maxValue;
  }

  disableAdder(disabled) {
    if (this.adder) this.adder.disabled = disabled;
  }
}
