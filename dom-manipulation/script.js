// Quotes array with categories
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" },
  { text: "If you are working on something exciting, it will keep you motivated.", category: "Inspiration" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("showQuoteBtn");
const categoryFilter = document.getElementById("categoryFilter");

// Populate unique categories in dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))]; // extract unique categories
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category from localStorage
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuote(); // show filtered quotes on load
  }
}

// Show a random quote from current filter
function showRandomQuote() {
  let availableQuotes = quotes;

  // If a category is selected, filter quotes
  if (categoryFilter.value) {
    availableQuotes = quotes.filter(q => q.category === categoryFilter.value);
  }

  if (availableQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    quoteDisplay.textContent = availableQuotes[randomIndex].text;
  } else {
    quoteDisplay.textContent = "No quotes available for this category.";
  }
}

// Filter quotes when dropdown changes
function filterQuote() {
  localStorage.setItem("selectedCategory", categoryFilter.value);
  showRandomQuote();
}

// Event listeners
document.addEventListener("DOMContentLoaded", populateCategories);
showQuoteBtn.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", filterQuote);
