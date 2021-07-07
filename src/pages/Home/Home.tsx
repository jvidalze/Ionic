import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { useContext, useRef, useState } from "react";
import ApplicationContext from "../../context/ApplicationContext";
import { Character } from "../../models/character.model";
import "./Home.css";

const Home: React.FC = () => {
  const applicationContext = useContext(ApplicationContext);
  const [count, setCount] = useState<number>(1);
  const [disable, setDisable] = useState<boolean>(true);
  const countRef = useRef(0);
  const disableRef = useRef<boolean>();
  countRef.current = count;
  disableRef.current = disable;

  const handleClickNext = () => {
    setCount(count + 1);
    applicationContext.refreshCharacters([]);
    setTimeout(async () => {
      if (countRef.current === 1) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      const result = await fetch(
        `https://rickandmortyapi.com/api/character?page=${countRef.current}`
      );
      console.log(countRef.current);
      const data = await result.json();
      const resultCharacters: Character[] = data.results;
      applicationContext.refreshCharacters(resultCharacters);
    }, 3000);
  };
  const handleClickPrevious = () => {
    setCount(count - 1);
    applicationContext.refreshCharacters([]);
    setTimeout(async () => {
      if (countRef.current === 1) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      const result = await fetch(
        `https://rickandmortyapi.com/api/character?page=${countRef.current}`
      );
      console.log(countRef.current);
      const data = await result.json();
      const resultCharacters: Character[] = data.results;
      applicationContext.refreshCharacters(resultCharacters);
    }, 3000);
  };
  useIonViewDidEnter(() => {
    setTimeout(async () => {
      if (countRef.current === 1) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      const result = await fetch(`https://rickandmortyapi.com/api/character`);
      const data = await result.json();
      const resultCharacters: Character[] = data.results;
      applicationContext.refreshCharacters(resultCharacters);
    }, 3000);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ionic App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {applicationContext.characters.length === 0 ? (
          <IonGrid>
            <IonProgressBar
              class="bar"
              type="indeterminate"
              color="dark"
            ></IonProgressBar>
            <IonHeader>
              <IonItem>
                <IonButton class="ion-button" fill="outline" color="light">
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonButton>
                <IonButton class="ion-button" fill="outline" color="light">
                  <IonSkeletonText animated style={{ width: "100%" }} />
                </IonButton>
              </IonItem>
            </IonHeader>

            <IonRow>
              <IonCol className="ion-text-center">
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: "100%", height: "300px" }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: "100%" }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: "100%" }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "100%" }} />
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: "100%", height: "300px" }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: "100%" }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: "100%" }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "100%" }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid>
            <IonHeader
              style={{ position: "fixed", top: "55px", width: "100%" }}
            >
              <IonItem>
                <IonButton
                  class="ion-button"
                  fill="outline"
                  color="dark"
                  disabled={disableRef.current}
                  onClick={handleClickPrevious}
                >
                  Atrás
                </IonButton>
                <IonButton
                  class="ion-button"
                  fill="outline"
                  color="dark"
                  onClick={handleClickNext}
                >
                  Siguiente
                </IonButton>
              </IonItem>
            </IonHeader>
            <IonThumbnail style={{ paddingTop: "85px" }}></IonThumbnail>
            {applicationContext.characters.map((item) => (
              <IonRow key={item.id}>
                <IonCol className="ion-text-center">
                  <IonCard>
                    <img src={item.image} alt="content-rym" />
                    <IonCardHeader>
                      <IonCardSubtitle>{item.species}</IonCardSubtitle>
                      <IonCardTitle>{item.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{item.status}</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
