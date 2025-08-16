document.addEventListener("DOMContentLoaded", () => {
  console.log("Loading footer from tails.html...");
  fetch("tails.html")
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(html => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.innerHTML = html;
        console.log("Footer loaded successfully.");
      } else {
        console.warn("No <footer id='footer'> found in page.");
      }
    })
    .catch(err => {
      console.error("Footer failed to load:", err);
    });
});