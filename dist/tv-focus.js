// Manager simple de navigation au clavier/télécommande (Arrow keys + Enter + Back)
(function(){
  const getList = () => Array.from(document.querySelectorAll('[data-focusable]'));
  let currentIndex = 0;
  const COLS = 2; // adapter si layout diffère

  function focusAt(index) {
    const list = getList();
    if(list.length === 0) return;
    currentIndex = Math.max(0, Math.min(index, list.length - 1));
    const el = list[currentIndex];
    el.focus();
    if(typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({block: 'nearest', inline: 'nearest'});
    }
  }

  function handleKey(e) {
    const list = getList();
    if(list.length === 0) return;
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        focusAt(currentIndex + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusAt(currentIndex - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusAt(currentIndex + COLS);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusAt(currentIndex - COLS);
        break;
      case 'Enter':
      case 'OK':
        e.preventDefault();
        list[currentIndex].dispatchEvent(new MouseEvent('click'));
        break;
      case 'Backspace':
      case 'Escape':
      case 'Back':
        e.preventDefault();
        if(window.history.length > 1) window.history.back();
        break;
    }
  }

  window.addEventListener('keydown', handleKey);
  window.addEventListener('load', () => {
    const list = getList();
    if(list.length) list[0].focus();
  });

  // Expose helper for tests
  window.__tvFocus = {
    focusAt,
    getList
  };
})();
