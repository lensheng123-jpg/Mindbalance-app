// src/components/MoodList.tsx
import { useEffect, useState } from "react";
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from "@ionic/react";
import {
  collection, onSnapshot, query, orderBy,
  updateDoc, deleteDoc, doc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import storage from "../Storage";

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  createdAt: any;
}

interface Props {
  userId: string;
}

const moodEmojis: Record<string, { emoji: string; color: string }> = {
  Happy: { emoji: "😄", color: "success" },
  Sad: { emoji: "😢", color: "medium" },
  Angry: { emoji: "😡", color: "danger" },
  Calm: { emoji: "😌", color: "tertiary" },
  Tired: { emoji: "😴", color: "warning" }
};

export default function MoodList({ userId }: Props) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [filter] = useState("All");

  useEffect(() => {
  const cacheKey = `moods_${userId}`;

  // Load cached data first
  storage.get(cacheKey).then((cached) => {
    if (cached) setMoods(cached);
  });

  const q = query(
    collection(db, "users", userId, "mood_entries"),
    orderBy("createdAt", "desc")
  );

  const unsub = onSnapshot(q, (snapshot) => {
    // If snapshot has data, update cache
   
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as MoodEntry)
      );
      setMoods(data);
      storage.set(cacheKey, data);
    
  });

  return () => unsub();
}, [userId]);

  const handleUpdate = async (id: string) => {
    const newNote = prompt("Update your note:");
    if (newNote) {
      const docRef = doc(db, "users", userId, "mood_entries", id);
      await updateDoc(docRef, { note: newNote });
    }
  };

 const handleDelete = async (id: string) => {
  // Optimistically update UI
  setMoods((prev) => prev.filter((m) => m.id !== id));

  // Update cache
  const cacheKey = `moods_${userId}`;
  const cached = (await storage.get(cacheKey)) || [];
  await storage.set(cacheKey, cached.filter((m: MoodEntry) => m.id !== id));

  // Delete in Firestore (syncs if offline later)
  try {
    const docRef = doc(db, "users", userId, "mood_entries", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Delete failed (will retry when online):", err);
  }
};

  const filteredMoods = moods.filter((m) =>
    filter === "All" ? true : m.mood === filter
  );

  return (
    <div>
      {filteredMoods.length > 0 ? (
        filteredMoods.map((m) => {
          const moodMeta = moodEmojis[m.mood] || { emoji: "❓", color: "light" };

          const date =
            m.createdAt?.seconds
              ? new Date(m.createdAt.seconds * 1000).toLocaleString()
              : new Date(m.createdAt).toLocaleString();

          return (
            <IonCard key={m.id} color={moodMeta.color}>
              <IonCardHeader>
                <IonCardTitle>
                  {moodMeta.emoji} {m.mood}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Note:</strong> {m.note || "No note added"}</p>
                <p style={{ fontSize: "12px", opacity: 0.8 }}>
                  Logged at: {date}
                </p>
                <IonButton fill="outline" color="dark" onClick={() => handleUpdate(m.id)}>
                  Edit
                </IonButton>
                <IonButton color="danger" onClick={() => handleDelete(m.id)}>
                  Delete
                </IonButton>
              </IonCardContent>
            </IonCard>
          );
        })
      ) : (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>No moods found.</p>
      )}
    </div>
  );
}
