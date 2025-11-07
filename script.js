// Simple front-end login + dashboard behavior
// Demo credentials: admin / 1234
document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('login-section');
  const dashboard = document.getElementById('dashboard');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const guestBtn = document.getElementById('guest-btn');
  const welcomeText = document.getElementById('welcome-text');
  const logoutBtn = document.getElementById('logout-btn');

  const iconButtons = document.querySelectorAll('.icon-btn');
  const panels = document.querySelectorAll('.content-panel');
  const contentArea = document.getElementById('content-area');

  // Helper to show panel by id
  function showPanel(id){
    panels.forEach(p => p.id === id ? p.classList.remove('hidden') : p.classList.add('hidden'));
    iconButtons.forEach(btn => btn.dataset.section === id ? btn.classList.add('active') : btn.classList.remove('active'));
    // focus for accessibility
    const active = document.getElementById(id);
    if(active) active.focus();
  }

  // Default show about when dashboard appears
  function openDashboard(username){
    loginSection.classList.add('hidden');
    dashboard.classList.remove('hidden');
    welcomeText.textContent = `Halo, ${username}`;
    showPanel('about');
  }

  // Login form submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Simple validation & demo credential check
    if(!username || !password){
      loginError.textContent = 'Isi username dan password terlebih dahulu.';
      return;
    }
    // demo credentials: admin / 1234
    if(username === 'admin' && password === '1234'){
      // success
      openDashboard(username);
    } else {
      // allow non-admin as guest but ask for confirmation
      const proceed = confirm('Kredensial tidak sesuai demo. Masuk sebagai tamu? (OK = iya, Cancel = batal)');
      if(proceed){
        openDashboard(username || 'Tamu');
      } else {
        loginError.textContent = 'Login dibatalkan. Gunakan kredensial demo atau masuk sebagai tamu.';
      }
    }
  });

  guestBtn.addEventListener('click', () => {
    if(confirm('Masuk sebagai tamu? Anda akan memiliki akses terbatas.')) {
      openDashboard('Tamu');
    }
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    dashboard.classList.add('hidden');
    loginSection.classList.remove('hidden');
    loginForm.reset();
    loginError.textContent = '';
    document.getElementById('username').focus();
  });

  // Menu icon clicks
  iconButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.section;
      showPanel(sec);
    });
  });

  // Keyboard shortcuts for accessibility (1-4)
  document.addEventListener('keydown', (e) => {
    if(dashboard.classList.contains('hidden')) return;
    if(e.key === '1') showPanel('about');
    if(e.key === '2') showPanel('photos');
    if(e.key === '3') showPanel('music');
    if(e.key === '4') showPanel('video');
  });
});