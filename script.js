// App State
let state = {
  heartCount: 0,
  coinCount: 100,
  copyCount: 2,
  likedCards: {}
};

// DOM Elements
const cardContainer = document.getElementById('cardContainer');
const historyList = document.getElementById('historyList');
const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Event Delegation for All Card Interactions
cardContainer.addEventListener('click', (e) => {
  
  // 1. Heart Toggle Action
  const heartBtn = e.target.closest('.heart-btn');
  if (heartBtn) {
    const id = heartBtn.dataset.id;
    if (state.likedCards[id]) {
      delete state.likedCards[id];
      state.heartCount--;
      heartBtn.textContent = '🤍';
    } else {
      state.likedCards[id] = true;
      state.heartCount++;
      heartBtn.textContent = '❤️';
    }
    heartCountEl.textContent = state.heartCount;
    return;
  }

  // 2. Copy Number Action
  const copyBtn = e.target.closest('.copy-btn');
  if (copyBtn) {
    const number = copyBtn.dataset.number;
    navigator.clipboard.writeText(number).then(() => {
      alert(`Hotline number ${number} copied to clipboard!`);
      state.copyCount++;
      copyCountEl.textContent = `${state.copyCount} Copy`;
    });
    return;
  }

  // 3. Call Action & Coin Deduction
  const callBtn = e.target.closest('.call-btn');
  if (callBtn) {
    if (state.coinCount < 20) {
      alert("Insufficient coins! You need at least 20 coins to make a call.");
      return;
    }

    const name = callBtn.dataset.name;
    const number = callBtn.dataset.number;

    state.coinCount -= 20;
    coinCountEl.textContent = state.coinCount;

    alert(`Calling ${name} at ${number}...`);
    addToHistory(name, number);
  }
});

// Add Call Log to History with Local Time
function addToHistory(name, number) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const historyItem = document.createElement('div');
  historyItem.className = "flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-xs";
  historyItem.innerHTML = `
    <div>
      <div class="font-bold text-gray-800">${name}</div>
      <div class="text-gray-500">${number}</div>
    </div>
    <div class="text-gray-400 font-mono text-[10px]">${timeString}</div>
  `;

  historyList.prepend(historyItem);
}

// Clear History Action
clearHistoryBtn.addEventListener('click', () => {
  historyList.innerHTML = '';
});