function searchRepositories() {
  const term = document.getElementById('searchTerms').value;
  $.get(`https://api.github.com/search/repositories?q=${term}`, (data) => {
    displayResults(data);
  }).fail((error) => {
    displayError(error);
  });
}

function displayResults(data) {
  let html = '<ul>';
  for (let i = 0; i < data.items.length; i++) {
    let name = data.items[i].name;
    let desc = data.items[i].description;
    let url = data.items[i].html_url;
    let owner = data.items[i].owner.login;
    html += `<li><a href="${url}">${name}</a> - ${desc} - <a href="#" onclick="showCommits(this)" data-repo="${name}" data-owner="${owner}">Show commits</a></li>`;
  }
  html += '</ul>';
  $('#results').html(html);
}

function showCommits(element) {
  const repo = element.dataset.repo;
  const owner = element.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, (data) => {
    displayCommits(data);
  }).fail((error) => {
    displayError(error);
  });
}

function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}

$(document).ready(function (){
});

function displayCommits(data) {
  let html = '<ul>';
  for (let i = 0; i < data.length; i++) {
    let sha = data[i].sha;
    let author = data[i].commit.author.name;
    let login = data[i].author;
    let avatar = data[i].author.avatar_url;
    html += `<li>${sha} - ${author} - ${login} - <img src="${avatar}" height="32" width="32"></li>`;
  }
  html += '</ul>';
  $('#details').html(html);
}