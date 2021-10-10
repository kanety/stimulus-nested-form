import { Application } from '@hotwired/stimulus';
import NestedFormController from 'index';

const application = Application.start();
application.register('nested-form', NestedFormController);

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="nested-form">
          <div data-nested-form-target="form">
            <input type="hidden" name="tests_attributes[0][id]" id="tests_attributes_0_id">
            <input type="text" name="tests_attributes[0][text]" id="tests_attributes_0_text">
            <input type="radio" value="1" name="tests_attributes[0][radio]" id="tests_attributes_0_radio_1">
            <input type="radio" value="2" name="tests_attributes[0][radio]" id="tests_attributes_0_radio_2">
            <select name="tests_attributes[0][select]" id="tests_attributes_0_select">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <input type="hidden" name="tests_attributes[0][_destroy]" id="tests_attributes_0__destroy">
            <button type="button" data-action="nested-form#remove">Remove</button>
          </div>
          <button type="button" data-action="nested-form#add">Add</button>
        </div>
      </form>
    `;
  });

  describe('add', () => {
    it('adds form', () => {
      $('[data-action="nested-form#add"]').click();
      expect($$('[data-nested-form-target="form"]').length).toEqual(2);
      expect($$('[name="tests_attributes[1][text]"]').length).toEqual(1);
      expect($$('#tests_attributes_1_text').length).toEqual(1);

      $('[data-action="nested-form#add"]').click();
      expect($$('[data-nested-form-target="form"]').length).toEqual(3);
      expect($$('[name="tests_attributes[2][text]"]').length).toEqual(1);
      expect($$('#tests_attributes_2_text').length).toEqual(1);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      $('[data-action="nested-form#add"]').click();
    });

    beforeEach(() => {
      $$('[data-action="nested-form#remove"]')[1].click();
    });

    it('removes form', () => {
      expect($$('[data-nested-form-target="form"]:not([style*="display: none;"])').length).toEqual(1);
      expect($('#tests_attributes_1__destroy').value).toEqual('1');
    });
  });
});
