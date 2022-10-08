import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useQuery, gql } from '@apollo/client';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const GET_ME = gql`
  query me {
    me
  }
`;

const Home: React.FC = () => {
  const session = useSessionContext();
  const { loading, error, data,refetch } = useQuery(GET_ME);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
       <h1 style={{textAlign:"center",marginTop:"20vh"}}> Hi {data?.me}</h1>
       <IonButton onClick={refetch}>refetch</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
