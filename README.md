# 🧠 Rephrase with Groq – Chrome Extension

A Chrome extension that rephrases selected text using Groq’s LLaMA 3.1 (70B) model via a right-click context menu. The API key is kept secure through a local proxy server.

---

## 🚀 Features

- 🔄 Rephrase any selected text instantly
- 🤖 Powered by Groq LLaMA 3.1 (70B)
- 🖱️ Right-click context menu integration
- 🔒 API key remains hidden (handled via proxy)
- ⚡ Fast, local, and lightweight

---

## Run locally

- npm install
- node proxy-server.js
- npm run build

This creates a dist/ folder with all build files.


## Load Extension in Chrome
- Go to chrome://extensions/
- Enable Developer Mode
- Click Load Unpacked
- Select the dist/ directory

## 🧠 How to Use the Extension

- Highlight any text on a webpage
- Right-click and choose "Rephrase with ChatGPT"
- You'll see a rephrased version of the text in an alert popup


