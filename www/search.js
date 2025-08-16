document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const button = document.querySelector("button[onclick='performSearch()']");
  const resultsContainer = document.getElementById("results");

  if (button) {
    button.removeAttribute("onclick");
    button.addEventListener("click", performSearch);
  }

  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  async function performSearch() {
    if (!input || !resultsContainer) return;

    const rawQuery = input.value.trim();
    const isValid = /^\d{1,4}\.\d{1,5}$/.test(rawQuery); // allows 1–5 digits after decimal
    if (!isValid) {
      resultsContainer.textContent = "Enter a valid frequency like 155.4 or 154.445";
      return;
    }

    resultsContainer.innerHTML = "";

    try {
      const response = await fetch("search-index.json");
      const index = await response.json();
      const seen = new Set();
      let found = false;

      for (const [page, matches] of Object.entries(index)) {
        let count = 0;
        for (const freq of matches) {
          if (freq.startsWith(rawQuery)) {
            count++;
          }
        }

        if (count > 0 && !seen.has(page)) {
          seen.add(page);
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = `${page}?highlight=${encodeURIComponent(rawQuery)}`;
          a.textContent = `${count} – ${page.replace(".html", "").replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`;
          li.appendChild(a);
          resultsContainer.appendChild(li);
          found = true;
        }
      }

      if (!found) {
        resultsContainer.textContent = "No results found.";
      }
    } catch (err) {
      resultsContainer.textContent = "Error loading search index.";
    }
  }
});
