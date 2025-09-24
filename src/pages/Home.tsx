// src/pages/Home.tsx
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import AddMood from "../components/AddMood";
import MoodList from "../components/MoodList";

export default function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MindBalance - Mood Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <AddMood userId="userId" />
        <MoodList userId="userId" />
      </IonContent>
    </IonPage>
  );
}
