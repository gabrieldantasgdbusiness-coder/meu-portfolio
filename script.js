// Obtém o botão e o corpo da página
const toggleButton = document.getElementById('mode-toggle');
const body = document.body;

// Adiciona um "ouvinte de evento" ao botão
toggleButton.addEventListener('click', () => {
    // Alterna a classe 'dark-mode' no corpo da página
    body.classList.toggle('dark-mode');

    // Mudar o emoji do botão para mostrar o modo atual
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙';
    } else {
        toggleButton.textContent = '☀️';
    }
});
