
document.querySelector('.edit-cover').addEventListener('click', () => {
    alert('Editează fotografia de copertă');
});

document.querySelector('.add-story').addEventListener('click', () => {
    let response = confirm('Permiteți accesul la camera foto?');
    if (response) {
        alert('Permisiune dată! Camera foto pornită!');
    } else {
        alert('Permisiune refuzată!');
    }
});

document.querySelector('.edit-profile').addEventListener('click', () => {
    alert('Editează profilul');
});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function editAboutSection() {
    let aboutSection = document.querySelector('.about-section');
    let newContent = prompt("Modifică secțiunea 'Despre':", aboutSection.innerText);
    if (newContent !== null) {
        aboutSection.innerHTML = '<h2>Despre</h2>' + newContent + '<button class="edit-btn" onclick="editAboutSection()">Editează secțiunea</button>';
    }
}

let likeCount = 20; 
let likedPosts = {}; 

function likePost(button) {
    const postElement = button.closest('.post');
    const likeCountElement = postElement.querySelector('.like-count'); 
    
   
    const postId = postElement.dataset.id; 
    if (!likedPosts[postId]) {
        likeCount += 1;
        likeCountElement.textContent = likeCount;
        likedPosts[postId] = true; 
        button.innerText = "Liked"; 
    }
}

function addComment(event, input) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const commentText = input.value.trim();
        if (commentText) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<strong>Elena B:</strong> ${commentText}`;
            input.nextElementSibling.appendChild(commentDiv); 
            input.value = ''; 
        } else {
            alert("Introduceți un comentariu.");
        }
    }
}

function addRemoveFriend(button) {
    if (button.innerText === "Adaugă") {
        button.innerText = "Șterge";
    } else {
        button.innerText = "Adaugă";
    }
}

function createPost() {
    
    const thoughts = document.getElementById('thoughts').value.trim();

   
    if (thoughts === "") {
        alert("Scrie ceva pentru a posta!");
        return;
    }
    const date = new Date();
    const postDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const post = document.createElement('div');
    post.classList.add('post');
    post.setAttribute('data-id', Date.now()); 

    post.innerHTML = `
        <div class="post-header">
            <img src="../assests/profile.png" alt="Profile Picture">
            <div class="post-info">
                <strong>Elena B.</strong><br>
                <span>${postDate}</span>
                <span class="like-count">${likeCount}</span> <!-- Display like count -->
            </div>
        </div>
        <div class="post-content">
            <p>${thoughts}</p>
        </div>
        <div class="reaction-buttons">
            <button onclick="likePost(this)">Like</button>
            <button onclick="sharePost()">Share</button>
            <button onclick="showComments(this)">Comentarii</button>
            <div class="comments"></div> <!-- Container for comments -->
        </div>
    `;

    document.getElementById('posts-container').prepend(post);

    document.getElementById('thoughts').value = '';
}

function sharePost() {
    const shareMessage = document.getElementById("share-message");
    shareMessage.style.display = "block";  
    setTimeout(() => {
        shareMessage.style.display = "none";  
    }, 3000);
}

document.getElementById('comment-input').addEventListener('keypress', function(event) {
    addComment(event, this);
});
