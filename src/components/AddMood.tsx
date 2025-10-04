import { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from "@ionic/react";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import storage from "../Storage";

interface Props {
  userId: string;
}

const moodOptions = [
  { emoji: "😄", color: "success", label: "Happy" },
  { emoji: "😢", color: "medium", label: "Sad" },
  { emoji: "😡", color: "danger", label: "Angry" },
  { emoji: "😌", color: "tertiary", label: "Calm" },
  { emoji: "😴", color: "warning", label: "Tired" },
];

export default function AddMood({ userId }: Props) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [stress, setStress] = useState<number | undefined>();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedMood) {
      setAlertMessage("Please select a mood!");
      return;
    }

    if (!note || note.trim() === "") {
      setAlertMessage("Please enter a note before saving.");
      return;
    }

    if (stress === undefined || isNaN(stress)) {
      setAlertMessage("Please enter your stress level (1–10).");
      return;
    }

    if (stress < 1 || stress > 10) {
      setAlertMessage("Stress level must be between 1 and 10.");
      return;
    }

    // Create entry with proper timestamp
    const tempId = "temp_" + Date.now();
    const newEntry = {
      id: tempId,
      mood: selectedMood,
      note: note.trim(),
      stress,
      createdAt: new Date(),
      // Add sync status
      _synced: false,
      _pending: true
    };

    try {
      // 1️⃣ Save to local cache first (always)
      const cacheKey = `moods_${userId}`;
      const cached = (await storage.get(cacheKey)) || [];
      await storage.set(cacheKey, [newEntry, ...cached]);

      // ✅ Reset form immediately
      setSelectedMood(null);
      setNote("");
      setStress(undefined);

      // 2️⃣ Check online status explicitly
      if (!navigator.onLine) {
        setAlertMessage("Mood saved locally. It will sync when you're back online.");
        return;
      }

      // 3️⃣ Try to save to Firestore with timeout
      const firestorePromise = addDoc(collection(db, "users", userId, "mood_entries"), {
        mood: selectedMood,
        note: note.trim(),
        stress,
        createdAt: serverTimestamp(),
      });

      // Set a timeout to detect slow/unresponsive network
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 5000); // 5 second timeout
      });

      await Promise.race([firestorePromise, timeoutPromise]);
      
      // If we get here, Firestore save was successful
      setAlertMessage("Mood saved successfully to the cloud!");

    } catch (err) {
      console.warn("Save operation result:", err);
      
      // If we're here, either:
      // - We were offline from the start
      // - Firestore failed due to network issues
      // - The timeout was triggered
      
      // Final online status check
      if (!navigator.onLine) {
        setAlertMessage("Mood saved locally. It will sync when you're back online.");
      } else {
        // We're online but Firestore failed - still show offline message
        setAlertMessage("Mood saved locally. It will sync when you're back online.");
      }
    }
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
        <IonLabel position="stacked">Note:</IonLabel>
        <IonInput 
          value={note} 
          onIonChange={(e) => setNote(e.detail.value!)} 
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Stress Level (1–10)</IonLabel>
        <IonInput
          type="number"
          min="1"
          max="10"
          value={stress}
          onIonChange={(e) => setStress(parseInt(e.detail.value!, 10))}
        />
      </IonItem>

      <IonButton expand="block" color="primary" onClick={handleSubmit}>
        Save Mood
      </IonButton>

      <IonAlert
        isOpen={alertMessage !== null}
        onDidDismiss={() => setAlertMessage(null)}
        header="Info"
        message={alertMessage || ""}
        buttons={["OK"]}
      />
    </div>
  );
}
