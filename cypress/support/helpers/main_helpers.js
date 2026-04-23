export const clickLink = (title) => {
  const linkSelector = `ul.home-list > li > a[href$='/${title}']`;
  cy.get(linkSelector).click()
}

export const 