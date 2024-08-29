// mouse over to make visibility of select tag
let nav1 = document.getElementById('category')
let nav2 = document.getElementById('trending')
let main = document.getElementsByTagName('main')[0]
let home = document.getElementById('Home')
// options for selecting from navbar
let sports = document.getElementById('sports')
let techno = document.getElementById('tech')
let science = document.getElementById('science')
let war = document.getElementById('war')
let weather = document.getElementById('weather')
let usa_news = document.getElementById('usa')
// parent elements
let articleCat = document.getElementById('articleCategory')
let trending = document.getElementById('trendingArticle')
let dropdownVisible = true;

nav1.addEventListener('mouseover',function(event){
    document.getElementById("articleCategory").style.cssText = 'background-color:whitesmoke;display:block; font-size:large;padding:1em;'
})

nav1.addEventListener('mouseout',function(event){
    document.getElementById("articleCategory").style.cssText = 'display:none;'
    dropdownVisible = false;
})

nav2.addEventListener('mouseover',function(event){
    document.getElementById("trendingArticle").style.cssText = 'background-color:whitesmoke;display:block; font-size:large;margin-top:0.5em;padding:1em;'
})

nav2.addEventListener('mouseout',function(event){
    document.getElementById("trendingArticle").style.cssText = 'display:none;'
    dropdownVisible= false;
})

async function getNewsData() {
    let response = await fetch('https://newsdata.io/api/1/latest?country=in&category=business&apikey=pub_51724e12742a9bb13217958a8754e285e4899')
    if(response.status === 200){
        return response.json();
    }
    console.log('Invalid URL')
    throw new Error("Unable to fetch");
    
}

async function handleData(){
    try {
        console.log('fetching data..')
         let jsonData =  await getNewsData()
         let newsArticles = jsonData.results
        console.log(newsArticles)
// create new element for adding news article info
  for(let article =1; article<17;article++){
         let news = document.createElement('div')
            let sentence = '';
            let words = newsArticles[article].description.split(' ');
            for (i = 0; i < 20; i++) {
            sentence += words[i] + " ";
            }
    news.innerHTML = `<span style="color:red; font-weight:500>${newsArticles[article].source_name}</span><br>
                    <img src = "${newsArticles[article].image_url}" class='articleImg'>
                       <p style="max-width:80%; font-weight:300;">${sentence}</p>
                    <p style="color:darkred;font-weight:bold;">Published on ${newsArticles[article].pubDate}</p>`
    news.style.cssText = "width:30%; max-height:30%;"
   main.insertAdjacentElement('afterbegin',news)
    }
  
    } catch (error) {
        console.log(error)
    }
}
handleData()

   
// if user has hovered over link then display option to select news category
    
    if(dropdownVisible){
    // event delegation
    articleCat.addEventListener('click',function(event){
        selectedOption(event.target)
    })
}
// if user has hovered over link then display option to select trending news
        if(dropdownVisible){
        // event delegation
        trending.addEventListener('click', function(event){
            selectedOption(event.target)
        })
    }
    let clicked = false;
let btn = document.getElementsByTagName('button')[0];
btn.onclick = function(){
    let input = document.getElementsByTagName('input')[0].value;
    input = input.trim(' ')
    if(input != '' || input != ' '){
        clicked = true;
        console.log(input)
       selectedOption(input)
    }
}

// search news articles of selected category
function selectedOption(search){
    let selected;
    if(clicked){
        selected = search;
        console.log('searching..')
        clicked = false;
    }
    else{
   selected = search.innerText;
    }
   console.log(selected)
   switch (selected) {
    case "Sports": selected
  console.log('sports selected')
     // fetch sports news article
    fetch('https://newsdata.io/api/1/latest?country=in&category=sports&apikey=pub_51724e12742a9bb13217958a8754e285e4899')
       .then((response) => { return response.json()})
     //    update the dom after getting json data
        .then((data) => {
         let sports = data.results
         console.log(sports[2].description)
         // empty prrevious news articles
         main.innerText = ''
        // add sports article info to dom

        for(let article =0; sports.length;article++){
            let sentence = '';  
            if(sports[article].description != null){
            let words = sports[article].description.split(' ');
            for (i = 0; i < 20; i++) {
            sentence += words[i] + " "; /*limit description to 20 words */
            }
     }
        let news = document.createElement('div')
                 news.innerHTML = `<span style="color:red; font-weight:500">${sports[article].source_name}</span><br>
                     <img src = "${sports[article].image_url}" class='articleImg' alt="No image in API">
                    <p style="max-width:80%; font-weight:300;">${sentence}</p>
                 <p style="color:darkred;font-weight:bold;">Published on ${sports[article].pubDate}</p>`
   news.style.cssText = "width:25%; height:30%; overflow:hidden;"
   main.insertAdjacentElement('afterbegin',news)
         }      
        })
        break;
    case "Technology" :  selected
    // console.log('tech selected')
    // fetch tech news data
    fetch('https://newsdata.io/api/1/latest?country=in&category=technology&apikey=pub_51724e12742a9bb13217958a8754e285e4899')
    .then((response) => { return response.json()})
    //  update the dom after getting json data
       .then((data) => {
        let tech = data.results
        // empty prrevious news articles
        main.innerText = ''
        // add technology articles info to dom

        for(let article =0; article<20;article++){
            let sentence = '';  
            if(tech[article].description != null){
            let words = tech[article].description.split(' ');
            for (i = 0; i < 20; i++) {
            sentence += words[i] + " "; /*limit description to 20 words */
            }
     }
        let news = document.createElement('div')
                 news.innerHTML = `<span style="color:red; font-weight:500">${tech[article].source_name}</span><br>
                     <img src = "${tech[article].image_url}" class='articleImg' alt="No image in API">
                    <p style="max-width:80%; font-weight:300;">${sentence}</p>
                 <p style="color:darkblue;font-weight:bold;">Published on ${tech[article].pubDate}</p>`
   news.style.cssText = "width:25%; height:30%; overflow:hidden;"
   main.insertAdjacentElement('afterbegin',news) 
    }
    })
    break;
    case "Science" :  selected
    console.log('science')
      //    fetch tech science articles data
    fetch('https://newsdata.io/api/1/latest?country=in&category=science&apikey=pub_51724e12742a9bb13217958a8754e285e4899')
    .then((response) => { return response.json()})
//     update the dom after getting json data
       .then((data) => {
        let science = data.results
        // empty previous news articles
        main.innerText = ''
        // add science articles info to dom

        for(let article =0; article<20;article++){
            let sentence = '';  
            if(science[article].description != null){
            let words = science[article].description.split(' ');
            for (i = 0; i < 20; i++) {
            sentence += words[i] + " "; /*limit description to 20 words */
            }
     }
        let news = document.createElement('div')
                 news.innerHTML = `<span style="color:red; font-weight:500r">${science[article].source_name}</span><br>
                     <img src = "${science[article].image_url}" class='articleImg' alt="No image in API">
                    <p style="max-width:80%; font-weight:300;">${sentence}</p>
                 <p style="color:darkblue;font-weight:bold;">Published on ${science[article].pubDate}</p>`
   news.style.cssText = "width:25%; height:30%; overflow:hidden;"
   main.insertAdjacentElement('afterbegin',news) 
    }
    })
    break;
    case "Business" : selected
    console.log('business')
    break;
    case "Latest from USA" : search.innerText
    fetch('https://newsdata.io/api/1/latest?apikey=pub_51724e12742a9bb13217958a8754e285e4899&country=us&prioritydomain=top')
       .then((response) => { return response.json()})
     //    update the dom after getting json data
        .then((data) => {
         let usa = data.results
         // empty prrevious news articles
         main.innerText = ''
        // add top headlines of usa article info to dom

        for(let article =0; article<20;article++){
            let sentence = '';  
            if(usa[article].description != null){
            let words = usa[article].description.split(' ');
            for (i = 0; i < 20; i++) {
            sentence += words[i] + " "; /*limit description to 20 words */
            }
     }
        let news = document.createElement('div')
                 news.innerHTML = `<span style="color:red; font-weight:500">${usa[article].source_name}</span><br>
                     <img src = "${usa[article].image_url}" class='articleImg' alt="No image in API">
                    <p style="max-width:80%; font-weight:300;">${sentence}</p>
                 <p style="color:darkblue;font-weight:bold;">Published on ${usa[article].pubDate}</p>`
   news.style.cssText = "width:25%; height:30%; overflow:hidden;"
   main.insertAdjacentElement('afterbegin',news)
         }      
        })
    break;
    case "Israel War" : selected
    fetch('https://newsdata.io/api/1/latest?apikey=pub_51724e12742a9bb13217958a8754e285e4899&q=Iran%20War')
    .then((response) => { return response.json()})
  //    update the dom after getting json data
     .then((data) => {
      let war = data.results
      console.log(war)
      // empty prrevious news articles
      main.innerText = ''
     // add top headlines of usa article info to dom

     for(let article =0; war.length;article++){
         let sentence = '';  
         if(war[article].description != null){
         let words = war[article].description.split(' ');
         for (i = 0; i < 20; i++) {
         sentence += words[i] + " "; /*limit description to 20 words */
         }
  }
     let news = document.createElement('div')
              news.innerHTML = `<span style="color:red; font-weight:500">${war[article].source_name}</span><br>
                  <img src = "${war[article].image_url}" class='articleImg' alt="No image in API">
                 <p style="max-width:80%; font-weight:300;">${sentence}</p>
              <p style="color:darkblue;font-weight:bold;">Published on ${war[article].pubDate}</p>`
news.style.cssText = "width:25%; height:25%; overflow:hidden;"
main.insertAdjacentElement('afterbegin',news)
      }      
     })
 break;
    default:
        break;
   }

}

/*  

   */

