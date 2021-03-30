
// https://www.youtube.com/watch?v=3NG8zy0ywIk&list=PL4cUxeGkcC9gfoKa5la9dsdCNpuey2s-V&index=17&t=107s

const list = document.querySelectorAll('.userContainer .userGenre')
console.log(list)

const searchBar = document.forms['searchBar'].querySelector('input');
const container = document.getElementsByClassName('container')[0];

searchBar.addEventListener('keyup', function (e) {
  e.preventDefault();
  const term = e.target.value.toLowerCase();
  console.log(term);

  const div = document.getElementsByClassName('userContainer');
  const genre = document.getElementsByClassName('userGenre');

  const url = `/search:${term}`
  console.log(url)
  
  fetch(url).then((res) => res.json()).then((data) => { // If there is a user with the term
    container.innerHTML = '';// Delete everything

    data.forEach((user) => { // Loop through the array, for each user insert that data in HTML

      //beforeend = 
      container.insertAdjacentHTML('beforeend', ` 

      <section class="userContainer">
        <img src=${user.img} alt=${user.first_name}></img>
        <h2>${user.first_name}, ${user.age}</h2>
        <p>${user.occupation} | <span class="userGenre">${user.genre}</span></p>
        <form action="/match" method="POST">
          <div class='like'>
            <div class='matchBTN'>
              <input class="inputLike" type="submit" value='<%=user._id%>' src='../static/images/love_48px.png' name='like'>
            </div>
          </div>
          <div class='dislike'>
            <div class='matchBTN'>
              <input class="inputDislike" type='submit' value='<%=user._id%>' src='../static/images/multiply_48px.png' name='dislike'>
            </div>
          </div>
      </form>
      </section>                

    `)
    })
    console.log(data);
  })

  Array.from(genre).forEach(function (genre) {
    console.log(genre)

  })

})