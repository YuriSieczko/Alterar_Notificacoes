const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  carregarNotificacoes();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

async function carregarNotificacoes() {
  try {
    const response = await axios.get("http://localhost:3000/mostrarNotificacao");
    const notificacoes = response.data.notificacao;
    novaNotification(notificacoes);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function novaNotification(notificacoes) {
  if (!Notification.isSupported()) {
    console.log("Notificações não são suportadas neste ambiente.");
    return;
  }

  notificacoes.forEach(({ titulo, corpo }) => {
    const novaNotification = new Notification({
      title: titulo,
      subtitle: "Subtítulo",
      body: corpo,
      silent: true,
      timeoutType: "default",
    });

    novaNotification.show();
  });
}

ipcMain.on("enviar-notificacao", async (event, titulo, corpo) => {
  try {
    const response = await axios.patch("http://localhost:3000/atualizarNotificacao", {
      titulo,
      corpo,
      mostrar: 1,
    });
    const notification = new Notification({
      title: titulo,
      body: corpo,
    });

    notification.show();

    console.log(response);
  } catch (error) {
    console.error(error);
  }
});


