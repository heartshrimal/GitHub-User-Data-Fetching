function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getUserData();
        document.getElementById('usernameInput').value = "";
    }
}

function getUserData() {
    const username = document.getElementById('usernameInput').value;
    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayUserData(data);
            fetchRepositories(username);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Error fetching user data. Please try again.');
        });
}

function fetchRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRepositories(data))
        .catch(error => {
            console.error('Error fetching repositories:', error);
            alert('Error fetching repositories. Please try again.');
        });
}

function displayUserData(user) {
    const avatar = document.getElementById('avatar');
    const userInfo = document.getElementById('userInfo');

    avatar.innerHTML = `<img src="${user.avatar_url}" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px;">`;
    userInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Username:</strong> ${user.login}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>`;
    if(user.email!=null){
        userInfo.innerHTML += '<p><strong>Email:</strong> ${user.email}</p>'
    }

    document.getElementById('userData').classList.remove('hidden');
}

function displayRepositories(repositories) {
    const reposContainer = document.getElementById('repos');
    reposContainer.innerHTML = '<h2>Repositories:</h2>';

    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo');
        repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposContainer.appendChild(repoElement);
    });
}