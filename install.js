// Реєстрація Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

let deferredPrompt;
const installButton = document.getElementById('installButton');

// Показуємо кнопку, якщо можна встановити
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.classList.remove('hidden');
});

// Обробник кліку
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('Користувач вибрав:', outcome);
    deferredPrompt = null;
  }
});

// Ховаємо кнопку, якщо вже встановлено
window.addEventListener('appinstalled', () => {
  installButton.classList.add('hidden');
});