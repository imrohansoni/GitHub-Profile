const API_URL = `https://api.github.com/users/`;

const main = document.querySelector('.main');
const profile = document.querySelector('.profile');
const reposCount = document.querySelector('.repos_count');
const navListContainer = document.querySelector('.nav_list_container');
const navRepos = document.querySelector('.nav_repos');

let mainUsername = 'rohanSoni2033';

navRepos.addEventListener('click', () => {
  displayRepos(mainUsername);
});

const search = async (username) => {
  mainUsername = username;
  const data = await fetch(`${API_URL}${username}`);
  const p = await data.json();

  const followers = await fetch(
    `https://api.github.com/users/${username}/followers`
  );

  const following = await fetch(
    `https://api.github.com/users/${username}/following`
  );

  displayProfile(p);
  displayRepos(username);

  // getLink(await followers.json());
};

const displayProfile = (d) => {
  profile.innerHTML = ``;
  const markup = `
            <div class="avatar">
                <img src="${d.avatar_url}" alt="">
            </div>
            <span class="name">${d.name}</span>
            <a href="https://github.com/${d.login}" class="login">${d.login}</a>
            <span class="bio">${d.bio}</span>
            <div class="account">
                <span class="followers">
                    <span class="followers_count">
                        <i class="fas fa-user-friends"></i> ${d.followers}
                    </span> followers
                </span>
                &middot;
                <span class="following">
                    <span class="following_count">
                        ${d.following}
                    </span> following
                </span>
            </div>
            ${
              d.company
                ? `<span class="company">
                <i class="far fa-building"></i> ${d.company}
            </span>`
                : ''
            }
            ${
              d.blog
                ? `<a href="${d.blog}" class="blog">
                <i class="fas fa-link"></i> ${d.blog}
            </a>`
                : ''
            }
            ${
              d.location
                ? `<span class="location">
                <i class="fas fa-map-marker-alt"></i> ${d.location}
            </span>`
                : ''
            }
            ${
              d.email
                ? `<span class="email">
                <i class="far fa-envelope"></i> ${d.email}
            </span>`
                : ''
            }

            ${
              d.twitter_username
                ? `<a href="https://twitter.com/${d.twitter_username}" class="twitter_url">
                <i class="fab fa-twitter"></i> ${d.twitter_username}
            </a>`
                : ''
            }
        `;

  profile.insertAdjacentHTML('afterbegin', markup);
};

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  search(searchInput.value);
});

const getLink = function (link) {
  navListContainer.innerHTML = ``;
  link.forEach((f) => {
    const markup = `
    <li>
      <div class="user_container">
        <div class="user_avatar">
          <img src="${f.avatar_url}" alt="">
        </div>
        <div>
          <a href="https://github.com/${f.login}" class="user_login">${f.login}</a>
       </div>
      </div>
    </li>
          `;
    navListContainer.insertAdjacentHTML('afterbegin', markup);
  });
};

const displayRepos = async (username) => {
  navListContainer.innerHTML = ``;

  const data = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await data.json();

  reposCount.textContent = repos.length;
  repos.forEach((r) => {
    const markup = `
   <li>
      <div class="repositories">
        <div class="repos_name_container">
          <a href="https://github.com/${username}/${r.name}" class="repos_name">${r.name}</a>
          <span class="repos_visibility">${r.visibility}</span>
        </div>
          <a href="https://github.com/${username}/${r.name}/archive/refs/heads/master.zip" class="repos_download"><i class="fas fa-file-archive"></i>
          </a>
          <span class="repos_language">
            <div class="circle"></div> ${r.language}
          </span>
      </div>
    </li>
  `;

    navListContainer.insertAdjacentHTML('afterbegin', markup);
  });
};

search('rohanSoni2033');
