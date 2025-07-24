const sectionSearchResult = document.querySelector('section.search-results');

const params = new URLSearchParams(window.location.search);
const username = params.get('user') || 'kitarobenaya';

fetch(`https://api.github.com/users/${username}`)
.then(response => response.json())
.then(response => {
    sectionSearchResult.innerHTML = renderData({
        image: response.avatar_url,
        username: response.login,
        name: response.name,
        bio: response.bio ? response.bio : 'No bio available.',
        followers: response.followers,
        repos: response.public_repos
    })
})

function renderData({image, name, bio, followers, repos}) {
    return `
    <div class="img-wrap">
        <img src="${image}" alt="your avatar" aria-label="Your avatar">
    </div>
    <div class="desc-wrap">
        <p class="username">Name : <span>${name}</span></p>
        <p class="bio">Bio : <br><span>${bio}</span></p>
        <p class="Followers">Followers : <span>${followers}</span></p>
        <p class="bio">Repos : <span>${repos}</span></p>
    </div>
`;
}