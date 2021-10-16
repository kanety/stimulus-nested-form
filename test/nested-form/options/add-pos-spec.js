describe('add-pos', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <div data-controller="nested-form"
             data-nested-form-add-pos-value="first">
          <div data-nested-form-target="form">
            <input type="text" name="tests_attributes[0][text]" id="tests_attributes_0_text">
            <button type="button" data-action="nested-form#remove">Remove</button>
          </div>
          <button type="button" data-action="nested-form#add">Add</button>
        </div>
      </form>
    `;
  });

  it('adds a form at first position', () => {
    $('[data-action="nested-form#add"]').click();
    expect($('input').id).toEqual('tests_attributes_1_text');
  });
});
