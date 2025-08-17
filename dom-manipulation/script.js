let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" },
  { text: "Push yourself, because no one else is going to do it for you.", category: "Motivation" }
];

function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${randomQuote.text}" — <em>${randomQuote.category}</em>`;
}

function addQuote() {
  let newText = document.getElementById("newQuoteText").value;
  let newCategory = document.getElementById("newQuoteCategory").value;

  if (newText === "" || newCategory === "") {
    alert("Please enter both a quote and a category!");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  // Update the DOM immediately
  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${newText}" — <em>${newCategory}</em>`;

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.querySelector("button[onclick='addQuote()']").addEventListener("click", addQuote);
