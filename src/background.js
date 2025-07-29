chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rephrase",
    title: "Rephrase with Groq",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "rephrase" && info.selectionText) {
    const selectedText = info.selectionText;

    try {
      const response = await fetch("http://localhost:3001/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selectedText })
      });

      const data = await response.json();
      console.log("Got response from proxy:", data);
console.log("Extracted rephrasedText:", data?.rephrased);

      const rephrasedText = data?.rephrased || "No response from Groq.";

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text) => alert("Rephrased:\n\n" + text),
        args: [rephrasedText]
      });

    } catch (err) {
      console.error("Error:", err);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => alert("Failed to contact proxy server.")
      });
    }
  }
});
