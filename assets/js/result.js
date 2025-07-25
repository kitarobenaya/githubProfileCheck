const sectionSearchResult = document.querySelector("section.search-results");
const sectionRepos = document.querySelector("section.repos-page");

const params = new URLSearchParams(window.location.search);
const username = params.get("user");

fetch(`https://api.github.com/users/${username}`)
  .then((response) => response.json())
  .then((response) => {
    if (response.status == 404) {
      sectionSearchResult.innerHTML = `<h2 class="error">User not found. Please check the username and try again.</h2>`;
      sectionRepos.innerHTML = `<h2 class="error" style='text-align: center;'>No repositories found for this user.</h2>`;
    } else {
      sectionSearchResult.innerHTML = renderDataProfile(response);
    }
  });

function renderDataProfile(data) {
  return `
    <div class="img-wrap">
        <img src="${
          data.avatar_url
        }" alt="your avatar" aria-label="Your avatar">
    </div>
    <div class="desc-wrap">
        <p class="username">Name : <span>${data.name}</span></p>
        <p class="bio">Bio : <br><span>${
          data.bio || "No bio available."
        }</span></p>
        <p class="followers">Followers : <span>${data.followers}</span></p>
        <p class="repos">Repos : <span>${data.public_repos}</span></p>
        <p class="from">From : <span>${data.location || "Unknown"}</span></p>
    </div>
`;
}

fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => response.json())
  .then((response) => {
    const listRepos = document.querySelector(
      "section.repos-page div.container ul"
    );
    response.map((repo) => {
      listRepos.innerHTML += renderDataRepos(repo);
    });
  });

function renderDataRepos(repo) {
  if (!repo || repo.length === 0) {
    return `<li><h2 class="error" style='text-align: center;'>No repositories found for this user.</h2></li>`;
  } else {
    return `<li>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          <h3>${repo.name}</h3>
          </a>
          <p class="desc">${repo.description ? repo.description : "No description available."}</p>
          <small>
          ⭐ ${
            repo.stargazers_count > 1
              ? repo.stargazers_count + " stars"
              : repo.stargazers_count + " star"
          } | ${repo.language} | 📅 Updated on ${
      repo.updated_at.length === 10
        ? repo.updated_at
        : repo.updated_at.slice(0, 10)
    }
          </small>
      </li>`;
  }
}

const searchResults = document.querySelector("input#search");

searchResults.addEventListener("change", (e) => {
    const searchValue = e.target.value.trim();
    if (searchValue) {
        window.location.href = `result.html?user=${searchValue}`;
    }
})