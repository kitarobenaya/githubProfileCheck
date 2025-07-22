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
        bio: response.bio ? response.bio + '.' : 'No bio available.',
        followers: response.followers,
        repos: response.public_repos
    })
})

function renderData({image, username, name, bio, followers, repos}) {
    const HTMLstring = `
    <div class="img-wrap" aria-hidden="true">
        <img src="${image}" alt="your avatar" aria-label="Your avatar">
        <figcaption>Lorem ipsum Culpa officia magnam saepe cum. Vero, tenetur voluptas.</figcaption>
    </div>
    <div class="desc-wrap">
        <p class="login">Username : <span>${username}.</span></p>
        <p class="username">Name : <span>${name}.</span></p>
        <p class="bio">Bio : <span>${bio}</span></p>
        <p class="Followers">Followers : <span>${followers}.</span></p>
        <p class="bio">Repos : <span>${repos}.</span></p>
    </div>
`;
return HTMLstring;
}