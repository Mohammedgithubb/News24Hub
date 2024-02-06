const API_KEY = "499d03534f224e8890dcd1f95376001c"
const url = "https://newsapi.org/v2/everything?q="



async function fetchData(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}
fetchData("all").then(data => renderMain(data.articles))

//menu btn
let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})


//To render news
function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += '<div class="card">';
            mainHTML += '<a href="' + arr[i].url + '">';
            mainHTML += '<img src="' + arr[i].urlToImage + '" lazy="loading" />';
            mainHTML += '<h4>' + arr[i].title + '</h4>';
            mainHTML += '<div class="publishbyDate">';
            mainHTML += '<p>' + arr[i].source.name + '</p>';
            mainHTML += '<span>•</span>';
            mainHTML += '<p>' + new Date(arr[i].publishedAt).toLocaleDateString() + '</p>';
            mainHTML += '</div>';
            mainHTML += '<div class="desc">';
            mainHTML += arr[i].description;
            mainHTML += '</div>';
            mainHTML += '</a>';
            mainHTML += '</div>';
        }
    }

    document.querySelector("main").innerHTML = mainHTML
}


const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
})


async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}



