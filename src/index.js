import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import store from "./redux/store/index"
import App from "./App"

console.log("%c\n   _____    ___ ___     .__________________   \n  /     \\  /   |   \\  __| _/\\_____  \\   _  \\  \n /  \\ /  \\/    ~    \\/ __ |  /  ____/  /_\\  \\ \n/    Y    \\    Y    / /_/ | /       \\  \\_/   \\\n\\____|__  /\\___|_  /\\____ | \\_______ \\_____  /\n        \\/       \\/      \\/         \\/     \\/ \n", 'background: #03181f; color: #bc0f53')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)