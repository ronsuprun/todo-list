export class CyTasksComponent {
  get newTaskField() {
    return cy.get('#new-task');
  }

  get saveButton() {
    return cy.get('#save-button');
  }

  rowByOrder(order, deleted) {
    var selector = deleted ? 'tfoot' : 'tbody'
    return cy.get(selector).then(selector => { return selector[0].children[order] });
  }

  rowID(id) {
    return cy.get('tr#' + String(id)).then((tr) => { return tr[0].firstChild.innerHTML });
  }

  rowName(id) {
    return cy.get('tr#' + String(id)).then((tr) => { return tr[0].children[1].innerHTML });
  }

  rowDate(id) {
    return cy.get('tr#' + String(id)).then((tr) => { return tr[0].children[2].innerHTML });
  }

  rowStatusSelectElement(id) {
    return cy.get('tr#' + String(id)).then((tr) => { return tr[0].children[3].firstChild });
  }

  rowStatus(id) {
    return this.rowStatusSelectElement(id).then((select) => {
      return Array.from(select[0].children).filter((option) => {
        if (option.selected == true) {
          return option.value;
        }
      })[0].value
    })
  }

  rowDeleteButton(id) {
    return cy.get('tr#' + String(id)).then((tr) => { return tr[0].children[4].firstChild });
  }

  get currentTasks() {
    return cy.get('#current-tasks').then(tasks => { return tasks[0].children });
  }

  get deletedTasks() {
    return cy.get('#deleted-tasks').then(tasks => { return tasks[0].children });
  }

  get allTasks() {
    return cy.get('table').then(table => {
      var allTasks = [];
      allTasks = allTasks.concat(Array.from(table[0].children[1].children), Array.from(table[0].children[2].children))
      return allTasks
    });

  }
}