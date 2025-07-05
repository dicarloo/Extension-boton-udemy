function crearBotonCopiarTranscript() {
    const transcriptPanel = document.querySelector('[data-purpose="transcript-panel"]');
    if (!transcriptPanel) return;

    if (document.getElementById('copiar-transcript-btn')) return;

    const boton = document.createElement('button');
    boton.textContent = '📋 Copiar transcript';
    boton.id = 'copiar-transcript-btn';
    boton.style.marginBottom = '10px';
    boton.style.padding = '10px';
    boton.style.backgroundColor = '#1c1d1f';
    boton.style.color = 'white';
    boton.style.border = 'none';
    boton.style.borderRadius = '5px';
    boton.style.cursor = 'pointer';
    boton.style.fontWeight = 'bold';
    boton.style.width = '100%';

    boton.addEventListener('click', async () => {
        const panel = document.querySelector('[data-purpose="transcript-panel"]');
        if (!panel) return;

        const spans = panel.querySelectorAll('[data-purpose="cue-text"]');
        const texto = Array.from(spans).map(span => span.textContent.trim()).join('\n');

        try {
            await navigator.clipboard.writeText(texto);
            boton.textContent = '✅ Transcript copiado';
            setTimeout(() => {
                boton.textContent = '📋 Copiar transcript';
            }, 2000);
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err);
            boton.textContent = '❌ Error al copiar';
        }
    });

    transcriptPanel.parentNode.insertBefore(boton, transcriptPanel);
}

const observer = new MutationObserver(() => {
    crearBotonCopiarTranscript();
});
observer.observe(document.body, { childList: true, subtree: true });
