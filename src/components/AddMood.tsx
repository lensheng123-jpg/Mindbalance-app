// src/components/AddMood.tsx
import { useState } from "react";
import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/firebaseConfig";

export default function AddMood() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (!mood) return;
    await addDoc(collection(db, "mood_entries"), {
      mood,
      note,
      createdAt: new Date()
    });
    setMood("");
    setNote("");
  };

  return (
    <div>
      <IonItem>
        <IonLabel position="floating">Mood</IonLabel>
        <IonInput
          value={mood}
          onIonChange={(e) => setMood(e.detail.value!)}
          required
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Note</IonLabel>
        <IonInput
          value={note}
          onIonChange={(e) => setNote(e.detail.value!)}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit}>
        Add Mood
      </IonButton>
    </div>
  );
}
