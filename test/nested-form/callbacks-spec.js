import { Application } from '@hotwired/stimulus';
import NestedFormController from 'index';

const application = Application.start();
application.register('nested-form', NestedFormController);

describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="nested-form">
          <div data-nested-form-target="form">
            <input type="text" name="tests_attributes[0][text]" id="tests_attributes_0_text">
            <button type="button" data-action="nested-form#remove">Remove</button>
          </div>
          <button type="button" data-action="nested-form#add">Add</button>
        </div>
      </form>
    `;
  });

  describe('call', () => {
    let messages = [];
    beforeEach(() => {
      let element = $('[data-controller="nested-form"]');
      element.addEventListener('nested-form:before-add', (e) => {
        messages.push('before-add: ' + e.detail.form.querySelector('input').id);
      });
      element.addEventListener('nested-form:after-add', (e) => {
        messages.push('after-add: ' + e.detail.form.querySelector('input').id);
      });
      element.addEventListener('nested-form:before-remove', (e) => {
        messages.push('before-remove: ' + e.detail.form.querySelector('input').id);
      });
      element.addEventListener('nested-form:after-remove', (e) => {
        messages.push('after-remove: ' + e.detail.form.querySelector('input').id);
      });
    });

    beforeEach(() => {
      $('[data-action="nested-form#add"]').click();
    });

    beforeEach(() => {
      $$('[data-action="nested-form#remove"]')[1].click();
    });

    it('runs callbacks', () => {
      expect(messages).toEqual([
        'before-add: tests_attributes_1_text',
        'after-add: tests_attributes_1_text',
        'before-remove: tests_attributes_1_text',
        'after-remove: tests_attributes_1_text'
      ]);
    });
  });

  describe('before-add', () => {
    beforeEach(() => {
      let element = $('[data-controller="nested-form"]');
      element.addEventListener('nested-form:before-add', (e) => {
        e.preventDefault();
      });
    });

    beforeEach(() => {
      $('[data-action="nested-form#add"]').click();
    });

    it('prevents addition', () => {
      expect($$('[data-nested-form-target="form"]').length).toEqual(1);
    });
  });

  describe('before-remove', () => {
    beforeEach(() => {
      let element = $('[data-controller="nested-form"]');
      element.addEventListener('nested-form:before-remove', (e) => {
        e.preventDefault();
      });
    });

    beforeEach(() => {
      $('[data-action="nested-form#add"]').click();
    });

    beforeEach(() => {
      $$('[data-action="nested-form#remove"]')[1].click();
    });

    it('prevents removal', () => {
      expect($$('[data-nested-form-target="form"]').length).toEqual(2);
    });
  });
});
