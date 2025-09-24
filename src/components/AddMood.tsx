// src/components/AddMood.tsx
import { useState } from "react";
import {
  IonButton, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol
} from "@ionic/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


interface Props {
  userId: string;
}

const moodOptions = [
  { emoji: "😄", color: "success", label: "Happy" },
  { emoji: "😢", color: "medium", label: "Sad" },
  { emoji: "😡", color: "danger", label: "Angry" },
  { emoji: "😌", color: "tertiary", label: "Calm" },
  { emoji: "😴", color: "warning", label: "Tired" }
];

export default function AddMood({ userId }: Props) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const handleSubmit = async () => {
    if (!selectedMood) {
      alert("Please select a mood!");
      return;
    }
    await addDoc(collection(db, "users", userId, "mood_entries"), {
      mood: selectedMood,
      note,
      createdAt: new Date()
    });
    setSelectedMood(null);
    setNote("");
  };

  return (
    <div>
      <IonLabel>Select Your Mood</IonLabel>
      <IonGrid>
        <IonRow>
          {moodOptions.map((m) => (
            <IonCol key={m.label} size="2">
              <IonButton
                expand="block"
                color={selectedMood === m.label ? m.color : "light"}
                onClick={() => setSelectedMood(m.label)}
              >
                {m.emoji}
              </IonButton>
              <p style={{ textAlign: "center", fontSize: "12px" }}>{m.label}</p>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonItem>
        <IonLabel position="floating">Note</IonLabel>
        <IonInput
          value={note}
          onIonChange={(e) => setNote(e.detail.value!)}
        />
      </IonItem>

      <IonButton expand="block" color="primary" onClick={handleSubmit}>
        Save Mood
      </IonButton>
    </div>
  );
}
