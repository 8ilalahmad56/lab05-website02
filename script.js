/**
 * Bilal Ahmad - Computer Science Portfolio & CV (Zero-Scroll Edition)
 * Zero-Scroll Stage Engine, Keyboard Hotkeys & Interactive Demos
 * Qureshi University, Lahore (2024 - Expected 2028)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Tab Elements
  const navTabBtns = document.querySelectorAll('.nav-tab-btn');
  const stagePanels = document.querySelectorAll('.stage-panel');
  const activeTabLabel = document.getElementById('dock-active-tab');
  const toastEl = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  const lahoreTimeEl = document.getElementById('lahore-time');
  const downloadCvBtns = document.querySelectorAll('[data-action="download-cv"]');

  // Interactive Demo Elements
  const flashcardEl = document.getElementById('demo-flashcard');
  const flashcardNextBtn = document.getElementById('flashcard-next-btn');
  const flashcardQEl = document.getElementById('flashcard-question');
  const flashcardAEl = document.getElementById('flashcard-answer');
  const flashcardIndexEl = document.getElementById('flashcard-counter');
  const flashcardTagEl = document.getElementById('flashcard-tag');

  // Cafe Project Demo Elements
  const cafeOrderTotalEl = document.getElementById('cafe-order-total');
  const cafeItemBtns = document.querySelectorAll('.cafe-item-add');
  const cafeCheckoutBtn = document.getElementById('cafe-checkout-btn');

  // Club Project Demo Elements
  const clubSelect = document.getElementById('club-select');
  const clubBadgeRole = document.getElementById('club-badge-role');
  const clubBadgeSoc = document.getElementById('club-badge-society');

  // Project Stage Tab Switcher
  const projectNavItems = document.querySelectorAll('.project-selector-item');
  const projectDetailPanes = document.querySelectorAll('.project-detail-pane');

  /**
   * 1. Tab Switching Engine (Zero-Scroll Navigation)
   */
  const tabsList = ['overview', 'projects', 'skills', 'education', 'contact'];
  let currentTabIndex = 0;

  function switchTab(tabId) {
    const targetBtn = document.querySelector(`.nav-tab-btn[data-tab="${tabId}"]`);
    const targetPanel = document.getElementById(`panel-${tabId}`);

    if (!targetPanel) return;

    // Update active nav buttons
    navTabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    // Update active panels
    stagePanels.forEach(panel => {
      panel.classList.remove('active');
    });
    targetPanel.classList.add('active');

    // Update current index
    const newIdx = tabsList.indexOf(tabId);
    if (newIdx !== -1) currentTabIndex = newIdx;

    // Update dock status text
    if (activeTabLabel) {
      const tabName = tabId.charAt(0).toUpperCase() + tabId.slice(1);
      activeTabLabel.textContent = `Active View: ${tabName} [Tab ${currentTabIndex + 1}/5]`;
    }
  }

  // Attach click listeners to all tab buttons (including internal quick links)
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  /**
   * 2. Keyboard Hotkey Navigation (1-5 & Arrows)
   * Allows effortless switching between screens without any mouse scrolling
   */
  window.addEventListener('keydown', (e) => {
    // Ignore hotkeys if user is currently typing in an input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key >= '1' && e.key <= '5') {
      const idx = parseInt(e.key, 10) - 1;
      if (idx >= 0 && idx < tabsList.length) {
        switchTab(tabsList[idx]);
        showToast(`Jumped to ${tabsList[idx].toUpperCase()} (Key ${e.key})`);
      }
    } else if (e.key === 'ArrowRight') {
      currentTabIndex = (currentTabIndex + 1) % tabsList.length;
      switchTab(tabsList[currentTabIndex]);
    } else if (e.key === 'ArrowLeft') {
      currentTabIndex = (currentTabIndex - 1 + tabsList.length) % tabsList.length;
      switchTab(tabsList[currentTabIndex]);
    }
  });

  /**
   * 3. Interactive Project Deep-Dive Selector (In Projects Tab)
   */
  projectNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetProj = item.getAttribute('data-project');

      projectNavItems.forEach(btn => btn.classList.remove('active', 'border-indigo-500', 'bg-indigo-500/10'));
      item.classList.add('active', 'border-indigo-500', 'bg-indigo-500/10');

      projectDetailPanes.forEach(pane => {
        pane.classList.toggle('hidden', pane.getAttribute('data-project-pane') !== targetProj);
      });
    });
  });

  /**
   * 4. Flashcard Generator Live Interactive 3D Simulator
   */
  const flashcardsData = [
    {
      q: 'What is the role of Virtual Functions in C++?',
      a: 'They enable runtime polymorphism by allowing derived classes to override base implementations via vtables.',
      tag: 'C++ OOP'
    },
    {
      q: 'How does SQL ensure ACID transaction guarantees?',
      a: 'Via Atomicity, Consistency, Isolation (Locks/MVCC), and Durability (Write-Ahead Logging / WAL).',
      tag: 'SQL & DBMS'
    },
    {
      q: 'Explain Java Garbage Collection root concept.',
      a: 'GC roots are objects accessible outside the heap (local stack variables, active threads, static fields) preventing memory leaks.',
      tag: 'Java Architecture'
    },
    {
      q: 'What is Event Delegation in Modern JavaScript?',
      a: 'Attaching a single event listener to a parent element leveraging event bubbling to efficiently handle child events.',
      tag: 'JavaScript DOM'
    }
  ];

  let currentCardIndex = 0;

  function updateFlashcardUI() {
    if (!flashcardQEl || !flashcardAEl) return;
    const card = flashcardsData[currentCardIndex];
    flashcardQEl.textContent = card.q;
    flashcardAEl.textContent = card.a;
    if (flashcardTagEl) flashcardTagEl.textContent = card.tag;
    if (flashcardIndexEl) flashcardIndexEl.textContent = `${currentCardIndex + 1}/${flashcardsData.length}`;

    // Flip back to front when switching cards
    if (flashcardEl) flashcardEl.classList.remove('flipped');
  }

  if (flashcardEl) {
    flashcardEl.addEventListener('click', () => {
      flashcardEl.classList.toggle('flipped');
    });
  }

  if (flashcardNextBtn) {
    flashcardNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
      updateFlashcardUI();
    });
  }

  // Also support clicking any overview mini-flashcard
  const overviewFlashcard = document.getElementById('overview-mini-flashcard');
  if (overviewFlashcard) {
    overviewFlashcard.addEventListener('click', () => {
      overviewFlashcard.classList.toggle('flipped');
    });
  }

  /**
   * 5. University Cafe Kiosk Order Simulator
   */
  let cafeTotalPKR = 0;
  if (cafeItemBtns.length > 0) {
    cafeItemBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const price = parseInt(btn.getAttribute('data-price') || '0', 10);
        const itemName = btn.getAttribute('data-item') || 'Item';
        cafeTotalPKR += price;
        if (cafeOrderTotalEl) {
          cafeOrderTotalEl.textContent = `PKR ${cafeTotalPKR}`;
        }
        showToast(`Added ${itemName} (+PKR ${price})`);
      });
    });
  }

  if (cafeCheckoutBtn) {
    cafeCheckoutBtn.addEventListener('click', () => {
      if (cafeTotalPKR === 0) {
        showToast('Please add items to your cafeteria tray first!');
        return;
      }
      showToast(`Order Placed! Total: PKR ${cafeTotalPKR}. Token #042 generated.`);
      cafeTotalPKR = 0;
      if (cafeOrderTotalEl) cafeOrderTotalEl.textContent = `PKR 0`;
    });
  }

  /**
   * 6. University Club Registration Simulator
   */
  if (clubSelect && clubBadgeSoc) {
    clubSelect.addEventListener('change', () => {
      clubBadgeSoc.textContent = clubSelect.value;
      showToast(`Switched active society to: ${clubSelect.value}`);
    });
  }

  /**
   * 7. Real-Time Lahore Time Clock
   */
  function updateLahoreTime() {
    if (!lahoreTimeEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      lahoreTimeEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    } catch {
      lahoreTimeEl.textContent = 'Lahore, PK';
    }
  }
  updateLahoreTime();
  setInterval(updateLahoreTime, 1000);

  /**
   * 8. Toast Notification Utility
   */
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // Expose toast globally for quick triggers
  window.showToast = showToast;

  /**
   * 9. Download / Print CV Handler
   */
  downloadCvBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening print preview for Bilal Ahmad CV...');
      setTimeout(() => {
        window.print();
      }, 300);
    });
  });

  /**
   * 10. Copy Contact Details Helper
   */
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard!`);
        });
      }
    });
  });

  /**
   * 11. Contact Form Handler (Zero-Scroll Friendly)
   */
  const contactForm = document.getElementById('cockpit-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill out all fields before sending.');
        return;
      }

      showToast(`Thank you ${name}! Opening mail client...`);
      const subject = encodeURIComponent(`CS Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent to: Bilal Ahmad (Qureshi University, Lahore)`);
      
      window.location.href = `mailto:bilalahmad.cs@qureshi.edu.pk?subject=${subject}&body=${body}`;
      contactForm.reset();
    });
  }

  // Initialize first flashcard state
  updateFlashcardUI();
});
