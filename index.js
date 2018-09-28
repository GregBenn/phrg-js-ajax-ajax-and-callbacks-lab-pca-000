$(document).ready(function (){
});

function displayError(){
  $('#errors').html("I'm Sorry, There was an error.");
}

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data =>{
    $('#results').html(renderSearchResults(data.items))
  }).fail(error => {
    displayError()
  })
}

function renderSearchResults(items) {
let htmlItems = items.map(item => {
  return `
      <div>
        <p>${item.name}</p>
        <p>${item.description}</p>
        <p>${item.html_url}</p>
        <p>${item.owner.login}</p>
        <img src="${item.owner.avatar_url}"></img>
        <button onClick="showCommits(
          {
            dataset: {
              repository: '${item.name}',
              owner: '${item.owner.login}'
            }
          }
        )">Show Commits</button>
      </div>`
  })
  return htmlItems.join()
}

function showCommits(data) {
  $.get(`https://api.github.com/repos/${data.dataset.owner}/${data.dataset.repository}/commits`, function(data){
    const detailsHtml = data.map( commit => {
      return `
          <div>
            <p>${commit.sha}</p>
            <p>${commit.commit.author.name}</p>
            <p>${commit.committer.login}</p>
            <img src="${commit.committer.avatar_url}"></img>
          </div>`
    })
     $("#details").html(detailsHtml.join())
  })
}
