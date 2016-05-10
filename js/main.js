$(document).ready(function () {

  var showCheatSheets = $('#cheatsheets-list');
  var showSnippets = $('#snippets-list');
  var showPasswords = $('#passwords-list');

  $.getJSON('src/data/db.json', function (data) {

    /* ========= Cheatsheet tab ========= */
    var cheatsheetsItems = data.cheatsheets.map(getItemsObject);

    if (cheatsheetsItems.length) {
      let content = cheatsheetsItems.map(function (item) {
        return `
        <a href="#" data-clipboard-target="#item-${item.id}" class="list-group-item">
          <h4 class="list-group-item-heading desc">${item.desc}<span class="badge pull-right"></span></h4>
          <p id="item-${item.id}" class="list-group-item-text code">${item.code}</p>
        </a>`;
      }).join(" ");
      showCheatSheets.append(content);
    }



    var cheatsheetsList = new List('cheatsheets', {
      valueNames: ['code', 'desc'],
        plugins: [ ListFuzzySearch() ]
    });



    /* ========= Snippet tab ========= */
    var snippetsItems = data.snippets.map(getItemsObject);

    if (snippetsItems.length) {
      let content = snippetsItems.join(" ");
      showSnippets.append(content);
    }

    if (snippetsItems.length) {
      let content = snippetsItems.map(function (item) {
        return `
        <a href="#" data-clipboard-target="#item-${item.id}" class="list-group-item">
          <h4 class="list-group-item-heading desc">${item.desc}<span class="badge pull-right"></span></h4>
          <p id="item-${item.id}" class="list-group-item-text code">${item.code}</p>
        </a>`;
      }).join(" ");
      showSnippets.append(content);
    }

    var snippetsList = new List('snippets', {
    valueNames: ['code', 'desc'],
      plugins: [ ListFuzzySearch() ]
    });

    /* ========= Password tab ========= */
    var passwordsItems = data.passwords.map(getItemsObject);

    if (passwordsItems.length) {
      let content = passwordsItems.map(function (item) {
        return `
        <a href="#" data-clipboard-target="#item-${item.id}" class="list-group-item">
          <h4 class="list-group-item-heading desc">${item.desc}<span class="badge pull-right"></span></h4>
          <p id="item-${item.id}" class="list-group-item-text code">${item.code}</p>
        </a>`;
      }).join(" ");
      showPasswords.append(content);
    }

    var passwordsList = new List('passwords', {
    valueNames: ['desc'],
      plugins: [ ListFuzzySearch() ]
    });

  });

  function getItemsObject(item) {
    var itemObj = {
      id: item.id,
      desc: item.desc,
      code: item.code
    };
    return itemObj;
  }

  (function(){
    new Clipboard(`.list-group-item`);
  })();

});
