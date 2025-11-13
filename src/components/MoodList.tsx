import { useEffect, useState } from "react";
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonSearchbar, IonSegment, IonSegmentButton, IonLabel} from "@ionic/react";
import { collection, onSnapshot, query, orderBy, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import storage from "../Storage";

interface MoodEntry {
id: string;
mood: string;
note: string;
createdAt: any;
stress: number;
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
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [loading, setLoading] = useState(true);

useEffect(() => {
const cacheKey = `moods_${userId}`;

// Load cached data first
storage.get(cacheKey).then((cached) => {
if (cached) setMoods(cached);
}).catch(console.error);

// Set up real-time listener
const q = query(
collection(db, "users", userId, "mood_entries"),
orderBy("createdAt", "desc")
);

const unsub = onSnapshot(q,
(snapshot) => {
const data = snapshot.docs.map(
(doc) => ({ id: doc.id, ...doc.data() } as MoodEntry)
);
setMoods(data);
setLoading(false);

// Update cache
storage.set(cacheKey, data).catch(console.error);
},
(error) => {
console.error("Error fetching moods:", error);
setLoading(false);
}
);

return () => unsub();
}, [userId]);

// Add this function to check for pending sync
const checkPendingSync = async () => {
const cacheKey = `moods_${userId}`;
const cached = await storage.get(cacheKey);
if (cached) {
const pendingEntries = cached.filter((entry: any) => entry._pending && !entry._synced);
if (pendingEntries.length > 0 && navigator.onLine) {
console.log(`${pendingEntries.length} entries pending sync`);
}
}
};

// Call this when component mounts and when online status changes
useEffect(() => {
checkPendingSync();

const handleOnline = () => {
checkPendingSync();
console.log("Back online - checking for pending sync");
};

window.addEventListener('online', handleOnline);
return () => window.removeEventListener('online', handleOnline);
}, [userId]);

const handleUpdate = async (id: string, currentNote: string) => {
const newNote = prompt("Update your note:", currentNote);
if (newNote !== null && newNote !== currentNote) {
try {
const docRef = doc(db, "users", userId, "mood_entries", id);
await updateDoc(docRef, { note: newNote });
} catch (error) {
console.error("Failed to update note:", error);
alert("Failed to update note. Please try again.");
}
}
};

const handleUpdateMood = async (id: string, currentMood: string) => {
const moodKeys = Object.keys(moodEmojis);

for (const mood of moodKeys) {
if (window.confirm(`Change mood to ${moodEmojis[mood].emoji} ${mood}?`)) {
if (mood !== currentMood) {
try {
const docRef = doc(db, "users", userId, "mood_entries", id);
await updateDoc(docRef, { mood: mood });
} catch (error) {
console.error("Failed to update mood:", error);
alert("Failed to update mood. Please try again.");
}
}
break;
}
}
};

const handleUpdateStress = async (id: string, currentStress: number) => {
const newStressStr = prompt("Update your stress level (1-10):", String(currentStress));

if (newStressStr === null) return;

const newStress = Number(newStressStr);

if (!isNaN(newStress) && newStress >= 1 && newStress <= 10) {
if (newStress !== currentStress) {
try {
const docRef = doc(db, "users", userId, "mood_entries", id);
await updateDoc(docRef, { stress: newStress });
} catch (error) {
console.error("Failed to update stress level:", error);
alert("Failed to update stress level. Please try again.");
}
}
} else {
alert("Please enter a valid number between 1 and 10.");
}
};

const handleDelete = async (id: string) => {
if (!window.confirm("Are you sure you want to delete this mood entry?")) {
return;
}

// Store original moods for potential rollback
const originalMoods = moods;

// Optimistically update UI
setMoods(prev => prev.filter(m => m.id !== id));

try {
// Update cache
const cacheKey = `moods_${userId}`;
const updatedMoods = originalMoods.filter(m => m.id !== id);
await storage.set(cacheKey, updatedMoods);

// Delete from Firestore
const docRef = doc(db, "users", userId, "mood_entries", id);
await deleteDoc(docRef);

} catch (error) {
console.error("Failed to delete mood entry:", error);

// Rollback on error
setMoods(originalMoods);
alert("Failed to delete mood entry. Please check your connection and try again.");
}
};

// Filter moods
const filteredMoods = moods.filter((mood) => {
const matchesSearch = !search ||
mood.note?.toLowerCase().includes(search.toLowerCase()) ||
mood.mood.toLowerCase().includes(search.toLowerCase());

const matchesFilter = filter === "All" ||
mood.mood.toLowerCase() === filter.toLowerCase();

return matchesSearch && matchesFilter;
});

const formatDate = (timestamp: any) => {
if (!timestamp?.seconds) return "Unknown date";
return new Date(timestamp.seconds * 1000).toLocaleString();
};

if (loading) {
return <div style={{ textAlign: "center", padding: "2rem" }}>Loading moods...</div>;
}

return (
<div>
<IonSearchbar
placeholder="Search moods or notes..."
value={search}
onIonInput={(e) => setSearch(e.detail.value!)}
/>

<IonSegment
value={filter}
onIonChange={(e) => setFilter(e.detail.value as string)}
scrollable
>
<IonSegmentButton value="All">
<IonLabel>All</IonLabel>
</IonSegmentButton>
{Object.keys(moodEmojis).map((mood) => (
<IonSegmentButton key={mood} value={mood}>
<IonLabel>{moodEmojis[mood].emoji} {mood}</IonLabel>
</IonSegmentButton>
))}
</IonSegment>

{filteredMoods.length > 0 ? (
filteredMoods.map((mood) => {
const moodMeta = moodEmojis[mood.mood] || { emoji: "❓", color: "light" };

return (
<IonCard key={mood.id} color={moodMeta.color}>
<IonCardHeader>
<IonCardTitle>
{moodMeta.emoji} {mood.mood}
</IonCardTitle>
</IonCardHeader>
<IonCardContent>
<p><strong>Note:</strong> {mood.note || "No note added"}</p>
<p><strong>Stress Level:</strong> {mood.stress}/10</p>
<p style={{ fontSize: "12px", opacity: 0.8 }}>
Logged at: {formatDate(mood.createdAt)}
</p>

<div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "1rem" }}>
<IonButton  color="light" size="small"
onClick={() => handleUpdate(mood.id, mood.note)}>
Edit Note
</IonButton>
<IonButton color="light" size="small"
onClick={() => handleUpdateStress(mood.id, mood.stress)}>
Update Stress
</IonButton>
<IonButton  color="light" size="small"
onClick={() => handleUpdateMood(mood.id, mood.mood)}>
Edit Mood
</IonButton>
<IonButton color="light" size="small"
onClick={() => handleDelete(mood.id)}>
Delete
</IonButton>
</div>
</IonCardContent>
</IonCard>
);
})
) : (
<p style={{ textAlign: "center", marginTop: "2rem", opacity: 0.7 }}>
{moods.length === 0 ? "No mood entries yet." : "No moods match your search."}
</p>
)}
</div>
);
}
