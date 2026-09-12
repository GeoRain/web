// ==========================================
// GeoRain — Google Material
// ==========================================

const root = document.documentElement;

// ========== Theme ==========
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}

function toggleTheme() {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

setTheme(getInitialTheme());
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// ========== Progress Bar ==========
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
}, { passive: true });

// ========== Copy Contact ==========
document.querySelectorAll('.contact-item[data-copy]').forEach(item => {
  item.addEventListener('click', () => {
    const val = item.dataset.copy;
    navigator.clipboard.writeText(val).then(() => {
      // Create toast
      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = '已复制: ' + val;
      document.body.appendChild(toast);

      requestAnimationFrame(() => toast.classList.add('show'));

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
      }, 1800);
    });
  });
});
