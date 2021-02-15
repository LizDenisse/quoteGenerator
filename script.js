let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author')
const twitterBtn= document.getElementById('twitter')
const newQuotebtn= document.getElementById('new-quote')
const loader= document.getElementById('loader');


//show loading 

function loading() {
    loader.hidden= false; 
    quoteContainer.hidden= true; 

}

// hide loader 
function complete()  {

    quoteContainer.hidden=false;
    loader.hidden= true;

}

//Show new quote 

function newQuote() {
    loading();
    //pick random quoe
const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

//check if author field is blank 

if (!quote.author) {
    authorText.textContent= "Unknown";
}
else {
    authorText.textContent= quote.author;
}

if (quote.text.length >120) {
    quoteText.classList.add('long-quote');
}
else {
    quoteText.classList.remove('long-quote');
}

//Set Quote, hide loader 
quoteText.textContent=quote.text;
complete();

}

// get quote from API 


async function getQuote() {
    loading();  //if you do not add it here as well when loading you will see the quote container empty next to the loader
    const apiUrl = 'https://type.fit/api/quotes';
try {
    const response= await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();    
}
catch (error) {
}
}

//tweet quote

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listener 


newQuotebtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
 getQuote();







