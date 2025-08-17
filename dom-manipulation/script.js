// Local quotes (fallback)
let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [
  "The best way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today.",
  "It's not whether you get knocked down, it's whether you get up.",
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const quoteForm = document.getElementById("quoteForm");
const quoteInput = document.getElementById("quoteInput");
const statusDiv = document.getElementById("status");

// ✅ Fetch quotes from server (mock API)
async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    // Just take first 5 post titles as "quotes"
    const serverQuotes = data.slice(0, 5).map(post => post.title);

    return serverQuotes;
  } catch (err) {
    console.error("Error fetching quotes:", err);
    return [];
  }
}

// ✅ Post data to the server (mock API)
async function postQuoteToServer(quote) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: quote, body: "", userId: 1 }),
    });
    const data = await res.json();
    console.log("Posted to server:", data);
  } catch (err) {
    console.error("Error posting quote:", err);
  }
}

// ✅ Sync function (merges local + server quotes, resolves conflicts)
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Merge server and local, remove duplicates
  const mergedQuotes = Array.from(new Set([...localQuotes, ...serverQuotes]));

  // Update local storage
  localQuotes = mergedQuotes;
  localStorage.setItem("quotes", JSON.stringify(localQuotes));

  statusDiv.textContent = "Quotes synced with server ✔";
  setTimeout(() => (statusDiv.textContent = ""), 3000);
}

// ✅ Show random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * localQuotes.length);
  quoteDisplay.textContent = localQuotes[randomIndex];
}

// ✅ Add new quote (local + server)
quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newQuote = quoteInput.value.trim();
  if (newQuote) {
    localQuotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(localQuotes));
    await postQuoteToServer(newQuote);
    statusDiv.textContent = "New quote added ✔";
    setTimeout(() => (statusDiv.textContent = ""), 3000);
    quoteInput.value = "";
  }
});

// ✅ Button listener
newQuoteBtn.addEventListener("click", showRandomQuote);

// ✅ Periodically check for updates (every 15s)
setInterval(syncQuotes, 15000);

// Initial sync on page load
syncQuotes();
