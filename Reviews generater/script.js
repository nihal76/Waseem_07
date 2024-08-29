let reviews = [
   {
    img: 'Reviews/img2.jpg',
    name : 'sai',
    review : 'Dr Angela is the best teacher for web development! My confidence has sky rocketed- she imparts the spirit of the class and a mindset that sets one on taking new challenges and conquering them!'
   },
   {
    img: 'Reviews/img3i.webp',
    name : 'waiz',
    review : `Looking back at the skills I had before and after completing this course in just a month, I've seen a tremendous change in myself. I can now create some really good web projects and feel confident in these newly acquired skills. Thanks to Angela for her invaluable tips along the way; they were game changers for me.`
   },
   {
    img: 'Reviews/img3i.webp',
    name : 'santhosh',
    review : `I am a self taught programmer who has been programming for over 30 years. This is the best online course I have ever taken. Angela does an amazing job explaining the concepts, putting them in practice, yet moving along a a good pace to keep challenging you with new concepts all the time. She shows how each new concept builds on previous lessons, and makes you anxious to learn more. Well done!`
   },
   {
    img: 'Reviews/img4.jpg',
    name : 'rakshith',
    review : `Amazing course. Dr. Angela explained the concepts really well and the exercises were really helpful in strengthening my understanding of those concepts. The course included a plethora of topics which made this course extremely worth it`
   },
   {
    img: 'Reviews/img5.webp',
    name : 'deepak',
    review : `Angela is an amazing instructor and I loved learning from her. I just wish she had a separate, more in depth course on React because that's what I'm looking into taking right now. Hope she makes one some day.`
   },
   {
    img: 'Reviews/img6.jpg',
    name : 'Waseem',
    review : `I am a self taught programmer who has been programming for over 30 years. This is the best online course I have ever taken. Angela does an amazing job explaining the concepts, putting them in practice, yet moving along a a good pace to keep challenging you with new concepts all the time. She shows how each new concept builds on previous lessons, and makes you anxious to learn more. Well done!.`
   },
]

let image = document.getElementsByTagName('img')[0];
let person = document.getElementsByClassName('name')[0]
let review = document.getElementsByTagName('p')[0]
let start = 0;

let btn = document.querySelector('button');

btn.addEventListener('click', function(){
    let randomReview = Math.floor((Math.random() * reviews.length));
  person.innerText =  reviews[randomReview].name;
    image.setAttribute('src',reviews[randomReview].img)
    review.innerText = reviews[randomReview].review
    start = randomReview;
})

let nextReview = document.getElementsByClassName('next')[0]
let previousReview = document.getElementsByClassName('previous')[0]

nextReview.addEventListener('click', function(){
         if(start < reviews.length){
          person.innerText =  reviews[start].name;
          image.setAttribute('src',reviews[start].img)
          review.innerText = reviews[start].review;     
          start++;   
         }
      
})

previousReview.addEventListener('click', function(){
  if(start !=0){
  start--;
  }
  if(start >= 0){
    person.innerText =  reviews[start].name;
    image.setAttribute('src',reviews[start].img)
    review.innerText = reviews[start].review;
  }
})