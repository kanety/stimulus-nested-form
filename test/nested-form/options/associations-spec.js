import { Application } from '@hotwired/stimulus';
import NestedFormController from 'index';

const application = Application.start();
application.register('nested-form', NestedFormController);

describe('associations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="nested-form"
             data-nested-form-associations-value='["one", "another"]'>
          <div data-nested-form-target="form">
            <input type="text" name="one_attributes[0][text]" id="one_attributes_0_text">
            <input type="text" name="another_attributes[0][text]" id="another_attributes_0_text">
            <button type="button" data-action="nested-form#remove">Remove</button>
          </div>
          <button type="button" data-action="nested-form#add">Add</button>
        </div>
      </form>
    `;
  });

  it('adds form', () => {
    $('[data-action="nested-form#add"]').click();
    expect($$('#one_attributes_1_text').length).toEqual(1);
    expect($$('#another_attributes_1_text').length).toEqual(1);
  });
});
