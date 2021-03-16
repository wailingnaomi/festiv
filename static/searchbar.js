// https://www.youtube.com/watch?v=3NG8zy0ywIk&list=PL4cUxeGkcC9gfoKa5la9dsdCNpuey2s-V&index=17&t=107s

const list = document.querySelectorAll('.user .interests');
console.log(list)

const searchBar = document.forms['searchInterests'].querySelector('input');
const container = document.getElementById('container');

searchBar.addEventListener('keyup', function (e) {
  e.preventDefault();
  const term = e.target.value.toLowerCase();
  console.log(term);

  var div = document.getElementsByClassName('user');
  var interests = document.getElementsByClassName('interests');

  const url = `http://localhost:8000/search:${term}`

  console.log(url)

  fetch(url).then((res) => {
    return res.json()
  }).then((data) => { // If there is a user with the term
    container.innerHTML = ""; // Delete everything

    data.forEach((user) => { // Loop through the array, for each user insert that data in HTML

      //beforeend = 
      container.insertAdjacentHTML("beforeend", ` 

    <div class="user">
        <img src=${user.img} alt="profileIMG" class="profileIMG">

        <h2 class="username">
            <a href=${user._id} class="linkProfile"> ${user.username} </a> |
            ${user.age}
        </h2>

        <p class="bio"> ${user.bio} </p>

        <p class="interests">${user.interests}</p>
    
        <div class="likeDislike">

            <button class="likeDislikeBTN">

                <img src="images/dislike.png" alt="profile" class="likeDislikeIMG" id=dislike
                    data-value=${user._id}>

            </button>

            <button class="likeDislikeBTN">
                <img src="images/like.png" alt="profile" class="likeDislikeIMG">
            </button>

        </div>


    `)
    })
    console.log(data);
  })

  Array.from(interests).forEach(function (interest) {
    console.log(interest)

  })

})