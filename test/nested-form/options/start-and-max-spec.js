import { Application } from '@hotwired/stimulus';
import NestedFormController from 'index';

const application = Application.start();
application.register('nested-form', NestedFormController);

describe('start-and-max', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="nested-form"
             data-nested-form-start-value="10"
             data-nested-form-max-value="3">
          <div data-nested-form-target="form">
            <input type="text" name="tests_attributes[0][text]" id="tests_attributes_0_text">
            <button type="button" data-action="nested-form#remove">Remove</button>
          </div>
          <button type="button" data-action="nested-form#add">Add</button>
        </div>
      </form>
    `;
  });

  it('sets start and max', () => {
    $('[data-action="nested-form#add"]').click();
    expect($$('#tests_attributes_11_text').length).toEqual(1);
    $('[data-action="nested-form#add"]').click();
    expect($$('#tests_attributes_12_text').length).toEqual(1);
    expect($('[data-action="nested-form#add"]').disabled).toEqual(true);
  });
});
