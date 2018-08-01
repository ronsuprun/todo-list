export class CySortComponent {

  get idSortBtn() {
    return cy.get('#id-sort');
  }

  get idSortOrder() {
    return cy.get('#id-sort').then((btn) => {
      var btnLabel = btn[0].innerHTML;
      return btnLabel.substring(btnLabel.length - 3);
    })
  }

  get nameSortBtn() {
    return cy.get('#name-sort');
  }

  get nameSortOrder() {
    return cy.get('#name-sort').then((btn) => {
      var btnLabel = btn[0].innerHTML;
      return btnLabel.substring(btnLabel.length - 3);
    })
  }

  get dtSortBtn() {
    return cy.get('#date-sort');
  }

  get dtSortOrder() {
    return cy.get('#date-sort').then((btn) => {
      var btnLabel = btn[0].innerHTML;
      return btnLabel.substring(btnLabel.length - 3);
    })
  }

  get statusSortBtn() {
    return cy.get('#status-sort');
  }

  get statusSortOrder() {
    return cy.get('#status-sort').then((btn) => {
      var btnLabel = btn[0].innerHTML;
      return btnLabel.substring(btnLabel.length - 3);
    })
  }

}