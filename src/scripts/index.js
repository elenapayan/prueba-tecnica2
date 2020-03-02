import '../styles/index.scss';

const btn = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const moviesList = document.querySelector(".js-movies-list");


function getMovies() {
  const api_key = "bb6f51bef07465653c3e553d6ab161a8";
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${input.value}`)
    .then(response => response.json())
    .then(data => {
      paintMovies(data.results);
    });
};


function getResults(ev) {
  ev.preventDefault();
  getMovies();
}
btn.addEventListener("click", getResults);


function paintMovies(results) {
  deleteMoviesList();
  const defaultImage = "http://via.placeholder.com/132x195";

  if (results.length >= 1) {
    for (let i = 0; i < results.length; i++) {

      const title = document.createElement("h2");
      title.classList.add("movie__information-title");
      const titleContent = document.createTextNode(results[i].original_title);
      title.appendChild(titleContent);

      const date = document.createElement("small");
      date.classList.add("movie__information-date");
      const dateContent = document.createTextNode(results[i].release_date === "" ? "Date not available" : results[i].release_date.split("-").reverse().join("/"));
      date.appendChild(dateContent);

      const description = document.createElement("p");
      description.classList.add("movie__information-description");
      const descriptionContent = document.createTextNode(results[i].overview === "" ? "Description not available" : results[i].overview);
      description.appendChild(descriptionContent);

      const link = document.createElement("a");
      link.classList.add("movie__information-link");
      link.href = "#";
      const linkContent = document.createTextNode("Read More");
      link.appendChild(linkContent);

      const information = document.createElement('div');
      information.classList.add("movie__information");
      information.appendChild(title);
      information.appendChild(date);
      information.appendChild(description);
      information.appendChild(link);

      const picture = document.createElement("img");
      picture.classList.add("movie__picture");
      picture.src = results[i].poster_path === null ? defaultImage : `https://image.tmdb.org/t/p/w500/${results[i].poster_path}`;
      picture.alt = titleContent;

      const item = document.createElement("li");
      item.classList.add("movie__card");
      item.appendChild(picture);
      item.appendChild(information);

      moviesList.appendChild(item);
    }
  } else {
    const error = document.createElement("p");
    const errorContent = document.createTextNode("Not found");
    error.appendChild(errorContent);

    moviesList.appendChild(error);
  }
}


function deleteMoviesList() {
  moviesList.innerHTML = "";
}


