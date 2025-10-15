// Реєструємо Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker зареєстровано:', reg))
    .catch(err => console.log('Помилка реєстрації SW:', err));
}

let deferredPrompt;
const installButton = document.getElementById('installButton');

// Слухаємо подію перед інсталяцією
window.addEventListener('beforeinstallprompt', (e) => {
    // Браузер не показує стандартний банер, відклали його
    e.preventDefault();
    deferredPrompt = e;

    // Робимо кнопку видимою
    installButton.classList.remove('hidden');
});

// Клік на кнопку "Встановити на пристрій"
installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Показуємо стандартне вікно встановлення
        deferredPrompt.prompt();

        // Чекаємо вибору користувача
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Користувач встановив додаток');
        } else {
            console.log('Користувач відмовився від встановлення');
        }

        // Очищаємо подію
        deferredPrompt = null;

        // Ховаємо кнопку після натискання
        installButton.classList.add('hidden');
    }
});

// Ховаємо кнопку, якщо додаток вже встановлено
window.addEventListener('appinstalled', () => {
    console.log('Додаток вже встановлено');
    installButton.classList.add('hidden');
});