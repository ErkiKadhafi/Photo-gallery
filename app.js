const auth = "563492ad6f91700001000001685864cdf8164e7eaf7bdcea48c4eff9";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
const circle = document.querySelector(".circle");
const more = document.querySelector(".more");
const mode = document.querySelector(".mode");
const header = document.querySelector("nav a");
let fetchLink;
let searchValue;
let page = 1;
let currentSearch;

//event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  searchPhotos(searchValue);
  e.preventDefault();
  currentSearch = searchValue;
});
more.addEventListener("click", loadMore);
mode.addEventListener("click", changeMode);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhotos(data) {
  data.photos.forEach((photo) => {
    // console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<div class="search-info">
         <p>${photo.photographer}</p>
         <a href="${photo.src.original}" target="_blank">Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  console.log(data);
  generatePhotos(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}
async function loadMore() {
  page++;
  console.log(page);
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

function changeMode() {
  // const background = document.querySelector("header");
  if (!mode.classList.contains("dark")) {
    mode.classList.add("dark");
    // header.classList.add("dark");
    // submitBtn.classList.add("dark");
    gsap.to(circle, 1, { clipPath: "circle(2500px at 100% -10%)" });
    gsap.to(submitBtn, 0.8, {
      background: "white",
      color: "rgb(103, 91, 170)",
    });
    gsap.to(header, 0.8, { color: "white" });
    gsap.to(mode, 0.8, {
      background: "white",
      color: "rgb(103, 91, 170)",
    });
    // gsap.to(background, 0.2, { background: "rgb(37, 37, 37)", delay: 0.5 });
    mode.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    mode.classList.remove("dark");
    // header.classList.remove("dark");
    // submitBtn.classList.remove("dark");
    gsap.to(circle, 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to(submitBtn, 0.8, {
      background: "rgb(103, 91, 170)",
      color: "white",
    });
    gsap.to(header, 0.8, { color: "black" });
    gsap.to(mode, 0.8, {
      background: "rgb(103, 91, 170)",
      color: "white",
    });
    // gsap.to(background, 0.5, { background: "white" }, "+=1");
    mode.innerHTML = '<i class="fas fa-moon"></i>';
  }
}
curatedPhotos();
