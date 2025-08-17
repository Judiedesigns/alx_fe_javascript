// =====================
// Local Storage Helpers
// =====================
function getLocalQuotes() {
  return JSON.parse(localStorage.getItem("quotes")) || [];
}

function saveLocalQuotes(quotes) {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// =====================
// Show Quote
// =====================
function showQuote() {
  const quotes = getLocalQuotes();
  if (quotes.length === 0) {
    document.getElementById("quoteText").textContent = "No quotes available!";
    document.getElementById("quoteAuthor").textContent = "";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, author } = quotes[randomIndex];
  document.getElementById("quoteText").textContent = text;
  document.getElementById("quoteAuthor").textContent = `- ${author}`;
}

// =====================
// Add Quote
// =====================
function addQuote() {
  const text = prompt("Enter the quote:");
  const author = prompt("Enter the author:");

  if (text && author) {
    const quotes = getLocalQuotes();
    quotes.push({ text, author });
    saveLocalQuotes(quotes);
    notifyUser("Quote added locally.");
  }
}

// =====================
// Notifications
// =====================
function notifyUser(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  setTimeout(() => {
    notification.textContent = "";
  }, 3000);
}

// =====================
// Server Simulation (Mock API)
// =====================
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();

    // Convert mock API posts into quotes
    return data.map(post => ({
      text: post.title,
      author: `User ${post.userId}`
    }));
  } catch (error) {
    console.error("Error fetching from server:", error);
    return [];
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(quote),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    console.log("Posted to server:", quote);
  } catch (error) {
    console.error("Error posting to server:", error);
  }
}

// =====================
// Sync Logic
// =====================
async function syncQuotes() {
  notifyUser("Syncing with server...");

  const localQuotes = getLocalQuotes();
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: Server takes precedence
  const mergedQuotes = [...serverQuotes, ...localQuotes];

  saveLocalQuotes(mergedQuotes);

  // Post only new local quotes to the server
  for (let quote of localQuotes) {
    postQuoteToServer(quote);
  }

  notifyUser("Sync complete! Server data merged with local storage.");
}

// =====================
// Periodic Sync
// =====================
setInterval(syncQuotes, 30000); // Sync every 30 seconds
