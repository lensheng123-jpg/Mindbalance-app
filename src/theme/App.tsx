import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Home from "../pages/Home";
import Mindfulness from '../pages/Mindfulness';
import "@ionic/react/css/core.css";
import React from "react";

setupIonicReact();

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

const userId = "your-user-id"; // Replace with actual user ID or logic

const App: React.FC = () => (
 <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home userId={userId} />
        </Route>
        <Route exact path="/mindfulness">
          <Mindfulness />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);  
export default App;
