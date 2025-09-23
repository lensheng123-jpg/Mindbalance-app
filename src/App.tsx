// src/App.tsx
import { IonApp } from "@ionic/react";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

const App: React.FC = () => (
  <IonApp>
    <Home />
  </IonApp>
);

export default App;
