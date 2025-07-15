(function () {
    'use strict';

    // Функция для добавления кнопки ассистента в шапку LAMPA
    function addAssistantButton() {
        // Найти шапку LAMPA (обычно .header или .head)
        var header = document.querySelector('.head, .header, .top, .app-header, header');
        if (!header) return;

        // Проверить, не добавлена ли уже кнопка
        if (header.querySelector('.lampa-ai-assistant-btn')) return;

        // Создать кнопку с классами LAMPA
        var btn = document.createElement('div');
        btn.className = 'button selector lampa-ai-assistant-btn';
        btn.style.cssText = 'margin-left:12px;display:flex;align-items:center;gap:6px;user-select:none;';
        btn.innerHTML = '<span style="font-size:18px;">🤖</span><span style="font-size:14px;">AI</span>';
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('data-title', 'AI ассистент (голосовой поиск)');

        // Обработчик для пульта
        btn.addEventListener('hover:enter', function() {
            if (window.AndroidJS && typeof window.AndroidJS.voiceStart === 'function') {
                window.AndroidJS.voiceStart();
            } else {
                Lampa.Noty && Lampa.Noty.show ? Lampa.Noty.show('AI ассистент недоступен') : alert('AI ассистент недоступен');
            }
        });
        // Для клика мышкой
        btn.onclick = function() {
            if (window.AndroidJS && typeof window.AndroidJS.voiceStart === 'function') {
                window.AndroidJS.voiceStart();
            } else {
                Lampa.Noty && Lampa.Noty.show ? Lampa.Noty.show('AI ассистент недоступен') : alert('AI ассистент недоступен');
            }
        };

        // Вставить кнопку в конец шапки
        header.appendChild(btn);

        // Явно обновить контроллер шапки для поддержки пульта
        if (window.Lampa && Lampa.Controller && typeof Lampa.Controller.enable === 'function') {
            Lampa.Controller.enable('head');
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
