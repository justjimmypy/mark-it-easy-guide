// background.js

// Example: Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Mark-It-Easy extension installed');
});

// Example: Listener for messages from content or popup scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'greeting') {
    console.log('Received message:', message.content);
    sendResponse({ reply: 'Hello from background script!' });
  }
});
