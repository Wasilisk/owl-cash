import React from 'react';
import 'normalize.css';
import AppRouter from "./routes";
import { ModalProvider } from 'styled-react-modal'

function App() {
  return (
    <div className="App">
        <ModalProvider>
            <AppRouter/>
        </ModalProvider>
    </div>
  );
}

export default App;
