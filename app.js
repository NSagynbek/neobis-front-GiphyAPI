

const searchInput = document.querySelector(".form__input");
const searchBtn = document.querySelector(".form__serachIcon");
const logoImage = document.querySelector(".logo__image"); 
const contentContainer = document.querySelector(".content");
const fadeElement = document.querySelector('.header');
const form = document.querySelector(".form"); 



document.addEventListener("DOMContentLoaded", getTrendingGiphs);
form.addEventListener("submit", getGiphy);
searchBtn.addEventListener("click",getGiphy)

let url = "https://api.giphy.com/v1/gifs/search?";
let trendingUrl = "https://api.giphy.com/v1/gifs/trending?"
let apiKey = "XV3AGWfuGBdof4NytvxH3D41VL5HVfni";


let isFadingOut = false;

window.addEventListener('scroll', () => {
    if (!isFadingOut && window.scrollY > 0) {
        fadeElement.classList.add('fade-out');
        isFadingOut = true;
    } else if (isFadingOut && window.scrollY <= 0) {
        fadeElement.classList.remove('fade-out');
        isFadingOut = false;
    }
});

 async function  getTrendingGiphs(){
  try{
let response = await axios.get(trendingUrl,{
  params: {
    api_key: apiKey,
  }
});

let trend = response.data.data;
trend.forEach(el => {
  const img = document.createElement("img");
  img.classList.add("giphis")
  img.src = el.images.fixed_width.url
  img.alt = el.title;
  contentContainer.append(img)

});



  }catch(error){
    console.log(error)

  }


}






let isRotated = false;

setInterval(function () {
  isRotated = !isRotated;
  if (isRotated) {
    logoImage.classList.add("rotate");
  } else {
    logoImage.classList.remove("rotate");
  }
}, 3000);



async function getGiphy(e) {
    e.preventDefault();
    contentContainer.innerHTML = null;
    console.log("form submited")

  let q = searchInput.value;

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        q: q,
      },
    });

 let gifs = response.data.data
 console.log(gifs)


 gifs.forEach(el => {
     const img = document.createElement("img");
     img.classList.add("giphis")
     img.src = el.images.fixed_width.url
     img.alt = el.title;
     contentContainer.append(img)

 });

 searchInput.value = "";

  } catch (error) {
    console.error('Error:', error);
  }
}





