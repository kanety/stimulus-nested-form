jest.useFakeTimers();

describe('complex', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <ul data-controller="nested-form"
            data-nested-form-associations-value='["assocs"]'>
          <li data-nested-form-target="form">
            <input type="text" name="item[assocs_attributes][0][text]" id="item_assocs_attributes_0_text" style="width: 500px;">
            <input type="hidden" name="item[assocs_attributes][0][id]" id="item_assocs_attributes_0_id">
            <input type="hidden" name="item[assocs_attributes][0][_destroy]" id="item_assocs_attributes_0__destroy">
            <ul data-controller="nested-form"
                data-nested-form-associations-value='["deep"]'>
              <li data-nested-form-target="form">
                <input type="text" name="item[assocs_attributes][0][deep_attributes][0][text]" id="item_assocs_attributes_0_deep_attributes_0_text" style="width: 500px;">
                <input type="hidden" name="item[assocs_attributes][0][deep_attributes][0][id]" id="item_assocs_attributes_0_deep_attributes_0_id">
                <input type="hidden" name="item[assocs_attributes][0][deep_attributes][0][_destroy]" id="item_assocs_attributes_0_deep_attributes_0__destroy">
                <ul data-controller="nested-form"
                    data-nested-form-associations-value='["more_deep"]'>
                  <li data-nested-form-target="form">
                    <input type="text" name="item[assocs_attributes][0][deep_attributes][0][more_deep_attributes][0][text]" id="item_assocs_attributes_0_deep_attributes_0_more_deep_attributes_0_text" style="width: 500px;">
                    <input type="hidden" name="item[assocs_attributes][0][deep_attributes][0][more_deep_attributes][0][id]" id="item_assocs_attributes_0_deep_attributes_0_more_deep_attributes_0_id">
                    <input type="hidden" name="item[assocs_attributes][0][deep_attributes][0][more_deep_attributes][0][_destroy]" id="item_assocs_attributes_0_deep_attributes_0_more_deep_attributes_0__destroy">
                    <button type="button" data-action="nested-form#remove">Remove</button>
                  </li>
                  <button type="button" data-action="nested-form#add">Add</button>
                </ul>
                <button type="button" data-action="nested-form#remove">Remove</button>
              </li>
              <button type="button" data-action="nested-form#add">Add</button>
            </ul>
            <button type="button" data-action="nested-form#remove" class="remove">Remove</button>
          </li>
          <button type="button" data-action="nested-form#add" class="add">Add</button>
        </ul>
      </form>
    `;
  });

  describe('add', () => {
    it('adds form', () => {
      $('.add').click();
      expect($$('#item_assocs_attributes_1_text').length).toEqual(1);
      expect($$('#item_assocs_attributes_1_deep_attributes_0_text').length).toEqual(1);
      expect($$('#item_assocs_attributes_1_deep_attributes_0_more_deep_attributes_0_text').length).toEqual(1);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      $('.add').click();
    });

    beforeEach(() => {
      $$('.remove')[1].click();
    });

    beforeEach(() => {
      jest.runAllTimers();
    });

    it('removes form', () => {
      expect($('#item_assocs_attributes_1__destroy').value).toEqual('1');
    });
  });
});
