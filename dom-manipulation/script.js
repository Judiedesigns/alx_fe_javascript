let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" },
  { text: "Push yourself, because no one else is going to do it for you.", category: "Motivation" }
];

function showRandomQuote() {
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

  let quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${newText}" — <em>${newCategory}</em>`;

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// This function dynamically creates the add-quote form
function createAddQuoteForm() {
  let formContainer = document.createElement("div");

  let inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";

  let inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";

  let addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append everything into the form container
  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  // Attach to body (or a specific section)
  document.body.appendChild(formContainer);
}

// Attach event listener for "Show New Quote"
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Call this so the form actually shows up when page loads
createAddQuoteForm();
