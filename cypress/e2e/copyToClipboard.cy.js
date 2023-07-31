it('copies input field text to the clipboard', () => {
  cy.visit('./index.html')

  cy.contains('button', 'Copy to clipboard')
    .focus()
    .click()

  cy.assertValueCopiedToClipboard('Hello World')

  cy.get('#copy-to-clipboard-input-field')
    .clear()
    .type('Foo bar baz')

  cy.contains('button', 'Copy to clipboard')
    .focus()
    .click()

  cy.assertValueCopiedToClipboard('Foo bar baz')
})

Cypress.Commands.add('assertValueCopiedToClipboard', value => {
  cy.window().then(win => {
    win.navigator.clipboard.readText().then(text => {
      expect(text).to.eq(value)
    })
  })
})
