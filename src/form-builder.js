export default class FormBuilder {
  constructor(controller) {
    this.controller = controller;
  }

  get forms() {
    return this.controller.formTargets;
  }

  get template() {
    return this.forms.slice(-1)[0];
  }

  get tags() {
    return this.controller.constructor.tags;
  }

  get attributes() {
    return this.controller.constructor.attributes;
  }

  get assocs() {
    return this.controller.assocs;
  }

  run() {
    let form = this.clone(this.template);
    form.style.display = '';

    let newIndex = this.forms.length + this.controller.startValue;
    this.renewIndex(form, newIndex);

    return form;
  }

  clone(template) {
    let clone = template.cloneNode(true);
    this.clear(clone);
    this.setRadio(clone);
    this.removePK(clone);
    return clone;
  }

  clear(clone) {
    clone.querySelectorAll('textarea, input[type="text"]').forEach(elem => elem.value = '');
    clone.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(elem => elem.checked = false);
    clone.querySelectorAll('option').forEach(elem => elem.selected = false);
    clone.querySelectorAll('input[name$="[_destroy]"]').forEach(elem => elem.removeAttribute('value'));
  }

  setRadio(clone) {
    let names = Array.from(clone.querySelectorAll('input[name][type="radio"]')).map(radio => radio.name);
    let nameSet = new Set(names);
    nameSet.forEach(name => {
      let radios = Array.from(clone.querySelectorAll(`input[type="radio"][name="${name}"]`));
      if (radios.every(radio => radio.checked == false)) {
        radios[0].checked = true;
      }
    });
  }

  removePK(form) {
    let regexps = this.assocs.map(assoc => new RegExp(`${assoc.description}(\\])?\\[\\d+\\]\\[${assoc.pk}\\]$`));

    form.querySelectorAll('input[name][type="hidden"]').forEach(elem => {
      regexps.forEach(regexp => {
        if (elem.name.match(regexp)) {
          elem.remove();
        }
      });
    });
  }

  renewIndex(form, newIndex) {
    let selector = this.tags.join(', ');
    let regexps = this.assocs.map(assoc => new RegExp(`(${assoc.description}(\\[|\\]\\[|_)?)\\d+`));

    form.querySelectorAll(selector).forEach(elem => {
      this.attributes.forEach(attr => {
        let value = elem.getAttribute(attr);
        if (!value) return;
        regexps.forEach(regexp => {
          value = value.replace(regexp, '$1' + newIndex);
        });
        elem.setAttribute(attr, value);
      });
    });
  }
}
