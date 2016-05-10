$(document).ready(function () {
  $.getJSON('src/data/db.json', function (data) {

    var showCheatSheets = $('#cheatsheets-list');
    var showSnippets = $('#snippets-list');
    var showPasswords = $('#passwords-list');

    var cheatsheetsItems = data.cheatsheets.map(function (item) {
      return `
      <li class="list-group-item">
        <h4 class="list-group-item-heading desc">${item.desc}<span class="badge pull-right"></span></h4>
        <p class="list-group-item-text code">${item.code}</p>
      </li>
      `;
    });

    var snippetsItems = data.snippets.map(function (item) {
      return `
      <li class="list-group-item">
        <h4 class="list-group-item-heading desc">${item.desc}<span class="badge pull-right"></span></h4>
        <p class="list-group-item-text code">${item.code}</p>
      </li>
      `;
    });

    var passwordsItems = data.passwords.map(function (item) {
      return `
      <li class="list-group-item">
        <h4 class="list-group-item-heading desc">${item.service}: ${item.email}<span class="badge pull-right"></span></h4>
        <p class="list-group-item-text">${item.password}</p>
      </li>
      `;
    });

    if (cheatsheetsItems.length) {
      let content = cheatsheetsItems.join(" ");
      showCheatSheets.append(content);
    }

    if (snippetsItems.length) {
      let content = snippetsItems.join(" ");
      showSnippets.append(content);
    }

    if (passwordsItems.length) {
      let content = passwordsItems.join(" ");
      showPasswords.append(content);
    }

    var cheatsheetsList = new List('cheatsheets', {
    valueNames: ['code', 'desc'],
      plugins: [ ListFuzzySearch() ]
    });

    var snippetsList = new List('snippets', {
    valueNames: ['code', 'desc'],
      plugins: [ ListFuzzySearch() ]
    });

    var passwordsList = new List('passwords', {
    valueNames: ['desc'],
      plugins: [ ListFuzzySearch() ]
    });
    
  });


});
