const sections = [...document.querySelectorAll('[data-section]')];
const navItems = [...document.querySelectorAll('.nav-item')];
let currentIndex = 0;

function goTo(index) {
  currentIndex = Math.max(0, Math.min(index, sections.length - 1));
  sections[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelector('#next').addEventListener('click', () => goTo(currentIndex + 1));
document.querySelector('#previous').addEventListener('click', () => goTo(currentIndex - 1));

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  currentIndex = sections.indexOf(visible.target);
  navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${visible.target.id}`));
}, { threshold: .45 });
sections.forEach(section => observer.observe(section));

const focus = document.querySelector('#focus');
focus.addEventListener('click', () => {
  const active = document.body.classList.toggle('focus-mode');
  focus.setAttribute('aria-pressed', String(active));
  focus.innerHTML = active ? '<span>◉</span> Exit focus' : '<span>◌</span> Focus';
});

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' && !event.target.matches('input')) { event.preventDefault(); goTo(currentIndex + 1); }
  if (event.key === 'ArrowUp' && !event.target.matches('input')) { event.preventDefault(); goTo(currentIndex - 1); }
});
