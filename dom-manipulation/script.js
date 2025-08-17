// Get references
const quoteInput = document.getElementById("quoteInput");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const showQuoteBtn = document.getElementById("showQuoteBtn");
const quoteList = document.getElementById("quoteList");

let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Save to local storage
function saveToLocal() {
  localStorage.setItem("quotes", JSON.stringify(localQuotes));
}

// Render quotes
function renderQuotes() {
  quoteList.innerHTML = "";
  localQuotes.forEach((quote, index) => {
    const li = document.createElement("li");
    li.textContent = quote.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = quote.completed || false;
    checkbox.addEventListener("change", () => {
      localQuotes[index].completed = checkbox.checked;
      saveToLocal();
    });

    li.appendChild(checkbox);
    quoteList.appendChild(li);
  });
}

// Add quote
addQuoteBtn.addEventListener("click", () => {
  const text = quoteInput.value.trim();
  if (text !== "") {
    const newQuote = { text, completed: false };
    localQuotes.push(newQuote);
    saveToLocal();
    renderQuotes();
    postQuoteToServer(newQuote); // send to server
    quoteInput.value = "";
  }
});

// Show quotes
showQuoteBtn.addEventListener("click", () => {
  renderQuotes();
});

// Fetch quotes from server (mock API)
async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const data = await response.json();
  return data.map(item => ({ text: item.title, completed: false }));
}

// Post quote to server (mock API)
async function postQuoteToServer(quote) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  });
}

// Sync function
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();

    // Merge (simple conflict resolution: prefer local if duplicate text)
    const texts = new Set(localQuotes.map(q => q.text));
    const merged = [...localQuotes];
    serverQuotes.forEach(q => {
      if (!texts.has(q.text)) {
        merged.push(q);
      }
    });

    localQuotes = merged;
    saveToLocal();
    renderQuotes();

    // ✅ Explicit alert for sync success
    alert("Quotes synced with server!");
  } catch (err) {
    console.error("Sync failed:", err);
  }
}

// Periodically sync with server
setInterval(syncQuotes, 15000);

// Initial render
renderQuotes();
