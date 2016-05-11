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
            <p id="item-${item.id}" class="list-group-item-text"><span class="code">${item.code}</span></p>
          </a>`;
      }).join(" ");
      showCheatSheets.append(content);

      $('a').on('click', function() {
        var myCode = $(this).find('span.code').addClass('bg-success');
        setTimeout(function(){
           myCode.removeClass('bg-success');
        }, 500);
      });
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
            <p id="item-${item.id}" class="list-group-item-text"><span class="code">${item.code}</span></p>
          </a>`;
      }).join(" ");
      showSnippets.append(content);

      $('a').on('click', function() {
        var myCode = $(this).find('span.code').addClass('bg-success');
        setTimeout(function(){
           myCode.removeClass('bg-success');
        }, 500);
      });
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
            <p id="item-${item.id}" class="list-group-item-text"><span class="code">${item.code}</span></p>
          </a>`;
      }).join(" ");
      showPasswords.append(content);
      $('a').on('click', function() {
        var myCode = $(this).find('span.code').addClass('bg-success');
        setTimeout(function(){
           myCode.removeClass('bg-success');
        }, 500);
      });
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

  var clipboard = new Clipboard('.list-group-item');
  clipboard.on('success', function(e) {
    e.clearSelection();
  });

  $('#add-button').on('click', function () {
    $('.tab-pane.active').find('.fuzzy-search').hide();
    $('.tab-pane.active').prepend(function () {
      return `
        <div class="list-group-item">
        <form id="test-form">
        <div class="form-group">
          <label class="sr-only" for="add-new-desc">Title or description</label>
          <input type="text" id="add-new-desc" class="form-control list-group-item-heading" placeholder="Title or description">
        </div>
        <div class="form-group">
          <label class="sr-only" for="add-new-code">Cheat, snipp, code...</label>
          <input type="text" id="add-new-code" class="form-control list-group-item-text" placeholder="Cheat, snipp, code...">
        </div>

          <button type="submit" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
          <button type="cancel" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>

        </form>
        </div>
        `;
    });
  });

  $('.form-control').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      $('#test-form').submit(function() {
        $('.fuzzy-search').show('slow');
        console.log('gonna hide submit form');
        $(this).hide();
      });
    }
  });




});
