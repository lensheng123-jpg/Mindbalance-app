import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton } from "@ionic/react";
import { useState, useRef, useEffect } from "react";

export default function Mindfulness() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (minutes: number) => {
    // Clear any existing timer before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeLeft(minutes * 60);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 1) return prev - 1;

        // stop timer when finished
        if (intervalRef.current) clearInterval(intervalRef.current);
        return 0;
      });
    }, 1000);
  };

  // cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Mindfulness</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Breathing Exercise 🌬️</h2>
        <IonButton onClick={() => startTimer(1)}>1-Min Breathing</IonButton>
        <IonButton onClick={() => startTimer(5)}>5-Min Meditation</IonButton>

        {timeLeft !== null && (
          <h3>Time Left: {formatTime(timeLeft)}</h3>
        )}
      </IonContent>
    </IonPage>
  );
}
