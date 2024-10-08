const accountSettingsButton = document.getElementById("accountSettingsButton");
const accountSettingsList = document.getElementsByClassName(
  "accountSettingsMenu"
)[0];
const logoutButton = document.getElementById("logoutButton");

accountSettingsButton.addEventListener("click", function () {
  if (accountSettingsList.style.display !== "flex") {
    accountSettingsList.style.display = "flex";
  } else {
    accountSettingsList.style.display = "none";
  }
});

accountSettingsButton.addEventListener("blur", function () {
  accountSettingsList.style.display = "none";
});

logoutButton.addEventListener("click", () => {
  window.open("../login.html", "_self");
});

const noOfLikesElem = document.getElementById("likesNumber");
const noOfSharesElem = document.getElementById("sharesNumber");

function getNumberOfLikes() {
  noOfLikesElem.innerText = noOfLikesElem.innerText || 21;
}

function getNumberOfShares() {
  noOfSharesElem.innerText = noOfSharesElem.innerText || 27;
}

function getData() {
  getNumberOfLikes();
  getNumberOfShares();
}

getData();

const likeButton = document.getElementById("likeButton");
const shareButton = document.getElementById("shareButton");
const noOfSharesBadge = document.getElementsByClassName("noOfSharesBadge")[0];
noOfSharesBadge.innerText = 0;

let isLiked = false;
let isShared = false;

likeButton.addEventListener("click", function () {
  isLiked = !isLiked;

  noOfLikesElem.innerText = isLiked
    ? Number(noOfLikesElem.innerText) + 1
    : Number(noOfLikesElem.innerText) - 1;

  this.classList.toggle("touched");
});

shareButton.addEventListener("click", function () {
  noOfSharesElem.innerText = Number(noOfSharesElem.innerText) + 1;
  noOfSharesBadge.innerText = Number(noOfSharesBadge.innerText) + 1;

  this.classList.add("touched");
});

const commentButton = document.getElementById("commentButton");
const commentInput = document.getElementById("commentInput");

const commentMessage = document.getElementById("commentMessage");
const userCommentList = document.getElementsByClassName("userComments")[0];

commentMessage.innerText =
  localStorage.getItem("comment") || commentMessage.innerText;

let showComments = true;

commentButton.addEventListener("click", function () {
  if (showComments) {
    userCommentList.style.display = "block";
    commentInput.focus();
  } else {
    userCommentList.style.display = "none";
  }
  showComments = !showComments;
});

function setComment() {
  const newComment = document.createElement("div");

  const newCommentUsername = Date.now();
  const newCommentMessageContent = `
  <div class="commentContent">
              <div class="profileUserComment">
                <a href=""
                  ><img
                    src="../assests/profile.png"
                    alt="user profile"
                    class="profileImage"
                /></a>
                <span>${newCommentUsername}</span>
              </div>

              <div class="userCommentText">
                <span id="commentMessage"
                  >${commentInput.value}</span
                >
                <div class="emojiReaction">🥳</div>
                <strong class="removeCommentButton">Remove this comment</strong>
              </div>

              <div class="commentReaction">
                <strong class="commentReactionButton">Like</strong>
                <strong class="commentReactionButton">Dislike</strong>
                <strong class="commentReactionButton">Comment</strong>
              </div>
            </div>`;
  newComment.innerHTML = newCommentMessageContent;
  userCommentList.insertAdjacentElement("afterbegin", newComment);
  localStorage.setItem("comment", JSON.stringify(commentInput.value));
  commentInput.value = "";
  addRemoveCommentListeners();
}

commentInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    setComment();
    this.blur();
  }
});

const comentInputButton = document.getElementsByClassName(
  "insertCommentButton"
)[0];

comentInputButton.addEventListener("click", setComment);

function addRemoveCommentListeners() {
  const commentContentList = Array.from(
    document.getElementsByClassName("commentContent")
  );

  const removeCommentButtons = Array.from(
    document.getElementsByClassName("removeCommentButton")
  );

  commentContentList.forEach((commentContent, index) => {
    commentContent.addEventListener("mouseover", function () {
      removeCommentButtons[index].style.display = "inline-block";
    });

    commentContent.addEventListener("mouseout", function () {
      removeCommentButtons[index].style.display = "none";
    });
  });

  removeCommentButtons.forEach((removeCommentButton, index) => {
    removeCommentButton.addEventListener("click", () => {
      commentContentList[index].remove();
    });
  });
}

addRemoveCommentListeners();

const infoIcon = document.getElementsByClassName("infoIcon")[0];
const infoMessage = document.getElementsByClassName("infoMessage")[0];

let infoIconDisplayTimeout;

infoIcon.addEventListener("mouseover", function () {
  infoIconDisplayTimeout = setTimeout(() => {
    infoMessage.style.display = "block";
  }, 1000);
});

infoIcon.addEventListener("mouseout", function () {
  clearTimeout(infoIconDisplayTimeout);
  infoMessage.style.display = "none";
});

infoIcon.addEventListener("click", () => {
  if (infoMessage.style.display === "block") {
    infoMessage.style.display = "none";
  } else {
    infoMessage.style.display = "block";
  }
});

infoIcon.addEventListener("blur", () => {
  infoMessage.style.display = "none";
});

const profileOptionsDropdown = document.getElementsByClassName('profileOptionsDropdown')[0];
const profileOptionsButton = document.getElementsByClassName('profileOptions')[0];

profileOptionsButton.addEventListener('click', function() {
  if (profileOptionsDropdown.style.display === 'flex') {
    profileOptionsDropdown.style.display = 'none'
  } else {
    profileOptionsDropdown.style.display = 'flex'
  }
})

window.addEventListener('click', (event) => {
  if (event.target.id !== "removePostButton" && event.target.className !== 'bi bi-three-dots') {
    profileOptionsDropdown.style.display = 'none'
  }
})

const removePostButton = document.getElementById('removePostButton');

removePostButton.addEventListener('click', () => {
  document.getElementsByClassName('post')[0].remove();
})

const searchInput = document.querySelector('.searchInput');

searchInput.addEventListener('keydown', function(event) {

  const data = [
    {
      username: 'Username 1',
      date: '32 JUL 2024',
      likes: 10,
      shares: 15,
      comments: [],
      title: 'Ceva',
      description: 'Altceva'
    },
    {
      username: 'Username 2',
      date: '32 JUL 2024',
      likes: 20,
      shares: 25,
      comments: [],
      title: 'Titlu 2',
      description: 'Description 2'
    }
  ]

  setTimeout(() => {
    const filtredResults = data.filter(post => post.username.includes(event.target.value))
    console.log(filtredResults)
  })

  filterData(event.target.value).then( data => {
  })
})

async function  filterData(searchTerm) {
  const filteredPostUrl = `GET_DATA_URL?searchTerm=${searchTerm}`
  const response = await fetch(filteredPostUrl)

  return response.json()
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  document.getElementById("outputCelsius").innerHTML = (valNum-32) / 1.8;
}

/*acordion2*/
var acc = document.getElementsByClassName("accordion2");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel2 = this.nextElementSibling;
    if (panel2.style.display === "block") {
      panel2.style.display = "none";
    } else {
      panel2.style.display = "block";
    }
  });
}

var acc = document.getElementsByClassName("accordion3");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");


    var panel3 = this.nextElementSibling;
    if (panel3.style.display === "block") {
      panel3.style.display = "none";
    } else {
      panel3.style.display = "block";
    }
  });
}

document.getElementById("completeOrderBtn").addEventListener("click", function() {
  const orderText = document.querySelector(".order-text");
  orderText.textContent = "Comanda ta a fost finalizată!";
  orderText.style.color = "#28a745"; // schimbă culoarea textului în verde
});

document.getElementById("loginBtn").addEventListener("click", function() {
  const phoneInput = document.getElementById("phoneInput").value;
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";

  // Verifică dacă inputul este valid (doar numere)
  const phonePattern = /^[0-9]+$/;
  if (phoneInput === "") {
    errorMessage.textContent = "Te rugăm să introduci un număr de telefon.";
    errorMessage.style.display = "block";
  } else if (!phonePattern.test(phoneInput)) {
    errorMessage.textContent = "Numărul de telefon poate conține doar cifre.";
    errorMessage.style.display = "block";
  } else {
    errorMessage.textContent = "";
    alert("Te-ai logat cu numărul: " + phoneInput); 
  }
});

let recentDeletedFiles = 0; 

function toggleFolder() {
    const folder = document.getElementById("folder");
    folder.style.display = folder.style.display === "none" ? "block" : "none";
}

function toggleTrash() {
    const trash = document.getElementById("trash");
    trash.style.display = trash.style.display === "none" ? "block" : "none";
}

function showRecentFiles() {
    const recentFiles = document.getElementById("recentFiles");
    recentFiles.style.display = recentFiles.style.display === "none" ? "block" : "none";
    document.getElementById("recentCount").textContent = recentDeletedFiles;
}

function openTabs() {
    const tabs = document.getElementById("tabs");
    tabs.style.display = tabs.style.display === "none" ? "block" : "none";
}

function closeTab(button) {
    const tab = button.parentElement;
    tab.style.display = "none";
}
function acceptFriend(button) {
  button.parentElement.innerHTML = 'Acum sunteți prieteni';
}

function rejectFriend(button) {
  button.parentElement.style.display = 'none';
}

function openChat(contactId, name, profilePic) {
  document.getElementById('chat-name').textContent = name;
  document.getElementById('chat-profile-pic').src = profilePic;
  document.getElementById('chat-window').style.display = 'block';
}

function closeChat() {
  document.getElementById('chat-window').style.display = 'none';
}

function sendMessage(event) {
  if (event.key === 'Enter') {
      const message = document.getElementById('chat-input').value;
      const chatBody = document.getElementById('chat-body');
      chatBody.innerHTML += `
          <div class="my-message">
              <img src="../assests/pozacontact2.jpg" class="profile-pic"> ${message}
          </div>`;
      document.getElementById('chat-input').value = ''; 
      chatBody.scrollTop = chatBody.scrollHeight; 
  }
}
function showBirthdays() {
  const birthdayList = document.getElementById('birthday-list');
  birthdayList.style.display = birthdayList.style.display === 'none' ? 'block' : 'none';
}

function showFeedbackForm() {
  const feedbackForm = document.getElementById('feedback-form');
  feedbackForm.style.display = feedbackForm.style.display === 'none' ? 'block' : 'none';
}
const socialIcons = document.querySelectorAll('.social-icons a');
socialIcons.forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault(); 
        const url = this.getAttribute('href'); 
        window.open(url, '_blank'); 
    });
});
