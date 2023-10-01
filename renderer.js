const btn = document.getElementById('btn')
const tituloInput = document.getElementById('titulo')
const corpoInput = document.getElementById('corpo')

btn.addEventListener('click', () => {
  const titulo = tituloInput.value
  const corpo = corpoInput.value
  window.electronAPI.enviarNotificacao(titulo, corpo)
})

const { ipcRenderer } = require('electron');

document.getElementById('btn').addEventListener('click', () => {
  const titulo = document.getElementById('titulo').value;
  const corpo = document.getElementById('corpo').value;

  ipcRenderer.send('enviar-notificacao', titulo, corpo);
});
