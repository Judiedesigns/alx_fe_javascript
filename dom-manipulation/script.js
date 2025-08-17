// Mock server API simulation
const mockServer = {
  quotes: [
    { id: 1, text: "The best way to get started is to quit talking and begin doing." },
    { id: 2, text: "Don't let yesterday take up too much of today." },
    { id: 3, text: "It's not whether you get knocked down, it's whether you get up." }
  ],
};

// Fetch quotes from mock server
async function fetchQuotesFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockServer.quotes), 500);
  });
}

// Post a new quote to mock server
async function postQuoteToServer(quote) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newQuote = { id: Date.now(), text: quote };
      mockServer.quotes.push(newQuote);
      resolve(newQuote);
    }, 500);
  });
}

// Update localStorage with conflict resolution
function updateLocalQuotes(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const merged = [...localQuotes];

  serverQuotes.forEach((serverQuote) => {
    if (!merged.some((q) => q.id === serverQuote.id)) {
      merged.push(serverQuote);
    }
  });

  localStorage.setItem("quotes", JSON.stringify(merged));
}

// Sync quotes with server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  updateLocalQuotes(serverQuotes);
  document.getElementById("syncStatus").textContent = "Quotes synced with server!";
}

// Periodically check for new quotes
setInterval(syncQuotes, 10000);

// Show a random quote
document.getElementById("showQuote").addEventListener("click", () => {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes available.";
    return;
  }
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteDisplay").textContent = randomQuote.text;
});

// Add a new quote
document.getElementById("addQuote").addEventListener("click", async () => {
  const newQuoteText = document.getElementById("newQuote").value.trim();
  if (newQuoteText === "") return;

  const newQuote = await postQuoteToServer(newQuoteText);

  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  localQuotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(localQuotes));

  document.getElementById("newQuote").value = "";
  document.getElementById("syncStatus").textContent = "New quote added and synced!";
});

// Export quotes to a file
document.getElementById("exportQuotes").addEventListener("click", () => {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  link.click();
});

// Initial sync
syncQuotes();
