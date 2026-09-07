'use strict';

// This starter has no analytics, cookies, storage, backend, or network integrations.
document.documentElement.classList.add('js-ready');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
}

const themeRoot = document.querySelector('#component-preview');
document.querySelectorAll('[data-theme-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!themeRoot) return;
    themeRoot.setAttribute('data-cc-theme', button.dataset.themeChoice);
    document.querySelectorAll('[data-theme-choice]').forEach((candidate) => {
      candidate.setAttribute('aria-pressed', String(candidate === button));
    });
    document.querySelector('#theme-status').textContent = `${button.textContent.trim()} component preview selected.`;
  });
});

document.querySelectorAll('[data-demo-message]').forEach((button) => {
  button.addEventListener('click', () => {
    const status = document.querySelector('#demo-status');
    if (status) status.textContent = button.dataset.demoMessage;
  });
});

const filter = document.querySelector('#record-filter');
if (filter) {
  const rows = [...document.querySelectorAll('[data-sample-record]')];
  filter.addEventListener('input', () => {
    const query = filter.value.toLocaleLowerCase().trim();
    let visible = 0;
    rows.forEach((row) => {
      const matches = row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) visible++;
    });
    document.querySelector('#no-results').hidden = visible > 0;
    document.querySelector('#filter-status').textContent = `${visible} sample ${visible === 1 ? 'record' : 'records'} shown.`;
  });
}
