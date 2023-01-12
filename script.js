const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from aipQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent = quote.author || "Unknown";

  // Check Quote length to determin styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-text");
  }
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
  }
}
newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuotes();
