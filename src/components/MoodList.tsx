// src/components/MoodList.tsx
import { useEffect, useState } from "react";
import {
  IonList, IonItem, IonLabel, IonButton
} from "@ionic/react";
import {
  collection, onSnapshot, query, orderBy,
  updateDoc, deleteDoc, doc
} from "firebase/firestore";
import { db } from "../src/firebaseConfig";
import storage from "../src/Storage";

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  createdAt: any;
}

export default function MoodList() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    // Load cached data first
    storage.get("moods").then((cached) => {
      if (cached) setMoods(cached);
    });

    // Fetch live data
    const q = query(collection(db, "mood_entries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MoodEntry));
      setMoods(data);
      storage.set("moods", data); // update cache
    });

    return () => unsub();
  }, []);

  const handleUpdate = async (id: string) => {
    const newMood = prompt("Enter new mood:");
    if (newMood) {
      const docRef = doc(db, "mood_entries", id);
      await updateDoc(docRef, { mood: newMood });
    }
  };

  const handleDelete = async (id: string) => {
    const docRef = doc(db, "mood_entries", id);
    await deleteDoc(docRef);
  };

  return (
    <IonList>
      {moods.map((m) => (
        <IonItem key={m.id}>
          <IonLabel>
            <h2>{m.mood}</h2>
            <p>{m.note}</p>
          </IonLabel>
          <IonButton color="warning" onClick={() => handleUpdate(m.id)}>Edit</IonButton>
          <IonButton color="danger" onClick={() => handleDelete(m.id)}>Delete</IonButton>
        </IonItem>
      ))}
    </IonList>
  );
}
