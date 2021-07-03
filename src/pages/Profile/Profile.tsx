import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonFabButton,
  IonIcon,
  IonFab,
  useIonViewWillEnter,
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import './Profile.css';
import { Storage } from '@capacitor/storage';

const Profile: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  useIonViewWillEnter(async () => {
    const { value } = await Storage.get({ key: 'LOOK_SLIDES' });
    console.log(value);
  });

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (cameraPhoto) {
      setPhotoUrl(cameraPhoto.dataUrl);
    }
  };
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
      <IonContent className="ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAvatar>
                <img
                  alt="avatar"
                  src={
                    !photoUrl
                      ? 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                      : photoUrl
                  }
                />
              </IonAvatar>
              <h1>Rick Sanchez</h1>
              <h2>ricksanchez@gmail.com</h2>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
