const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  enviarNotificacao: (titulo, corpo) => ipcRenderer.send('enviar-notificacao', titulo, corpo)
})