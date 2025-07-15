(function () {
    'use strict';

    // Функция для добавления кнопки ассистента в шапку LAMPA
    function addAssistantButton() {
        // Используем точный контейнер для иконок справа
        var header = document.querySelector('.head__actions');
        if (!header) return;

        // Проверить, не добавлена ли уже кнопка
        if (header.querySelector('.lampa-ai-assistant-btn')) return;

        // Создаём кнопку
        const btn = document.createElement('button');
        btn.className = 'button button--icon ai-assistant-btn';
        btn.type = 'button';
        btn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
          </svg>
        `;
        btn.title = 'AI Assistant';

        // Добавляем обработчик
        btn.addEventListener('click', () => {
          // Ваш код для вызова ассистента
        });

        // Вставляем в .head__actions
        const actions = document.querySelector('.head__actions');
        if (actions) actions.appendChild(btn);

        // ОБНОВИТЬ КОНТРОЛЛЕР HEAD, чтобы он узнал о кнопке и сфокусировать на ней
        if (window.Lampa && Lampa.Controller) {
            setTimeout(() => {
                Lampa.Controller.toggle('head');
            }, 300);
        }
    }

    // Добавлять кнопку при загрузке приложения и при смене страниц
    function init() {
        setTimeout(addAssistantButton, 500); // чуть позже, чтобы DOM точно был готов
    }

    if (window.Lampa && Lampa.Listener && typeof Lampa.Listener.follow === 'function') {
        // При полной загрузке приложения
        Lampa.Listener.follow('app', init);
        // При смене страниц/разделов
        Lampa.Listener.follow('activity', init);
    } else {
        // fallback: если Lampa не определена, пробуем по DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addAssistantButton);
        } else {
            addAssistantButton();
        }
    }
})(); 
