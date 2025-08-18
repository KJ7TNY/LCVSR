
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const highlightTerm = params.get("highlight");

  if (!highlightTerm) {
    console.log("No highlight term found.");
    return;
  }

  const regex = new RegExp(`\\b${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\d*`, "gi");

  console.log("Highlighting prefix matches for:", highlightTerm);

  highlightMatches(document.body, regex);

  function highlightMatches(element, regex) {
    if (element.nodeType === 3) {
      const match = element.nodeValue.match(regex);
      if (match) {
        const span = document.createElement("span");
        span.className = "highlight";
        const highlightedHTML = element.nodeValue.replace(regex, m => `<mark>${m}</mark>`);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = highlightedHTML;
        while (tempDiv.firstChild) {
          element.parentNode.insertBefore(tempDiv.firstChild, element);
        }
        element.parentNode.removeChild(element);
      }
    } else if (
      element.nodeType === 1 &&
      element.childNodes &&
      !/(script|style)/i.test(element.tagName)
    ) {
      for (let i = 0; i < element.childNodes.length; i++) {
        highlightMatches(element.childNodes[i], regex);
      }
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const term = urlParams.get("highlight");

  if (term) {
    // Wait for highlights to render
    setTimeout(() => {
      const firstMatch = document.querySelector("mark");
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100); // give time for highlights to be inserted
  }
});
