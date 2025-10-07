import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from "@ionic/react";
import { useHistory } from "react-router-dom";
import AddMood from "../components/AddMood";
import MoodList from "../components/MoodList";
import MoodChart from "../components/MoodTrendChart";
import MoodPie from "../components/MoodPie";
import StressTrendChart from "../components/StressTrendChart";

interface Props {
  userId: string;
}

export default function Home({ userId }: Props) {
  const history = useHistory();

  const navigateToMindfulness = () => {
    history.push('/mindfulness');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MindBalance aid - Mood Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>

    <IonContent className="ion-padding">
        {/* Add Mindfulness Navigation Button */}
        <IonButton 
          expand="block" 
          onClick={navigateToMindfulness}
          style={{ marginBottom: '20px' }}
          color="tertiary"
        >
          🧘 Mindfulness Exercises
        </IonButton>

        <AddMood userId={userId} />
        <MoodChart userId={userId} />
        <MoodPie userId={userId} />
        <MoodList userId={userId} />
        <StressTrendChart userId={userId} />
      </IonContent>
    </IonPage>
  );
}
