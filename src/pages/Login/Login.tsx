import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonPage,
} from '@ionic/react';
import React, { useContext, useRef } from 'react';
import { SignIn } from '../../services/AuthenticationService';
import { User } from '../../models/user.model';

import './Login.css';
import { Result } from '../../models/resultAuthenticated.model';
import { Storage } from '@capacitor/storage';
import ApplicationContext from '../../context/ApplicationContext';

const Login: React.FC = () => {
  const applicationContext = useContext(ApplicationContext);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);
  const handleClickSignIn = async () => {
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;

    const userSignIn: User = {
      email: email,
      password: password,
    };
    const resultSignIn: Result = await SignIn(userSignIn);
    if (resultSignIn.isAuthenticated) {
      Storage.set({ key: 'IS_AUTHENTICATED', value: 'true' });
      applicationContext.refreshAuthenticated();
    } else {
      console.log(resultSignIn.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <br />
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <br />
        <IonItem lines="none" className="ion-item-login">
          <IonInput
            type="email"
            placeholder="Correo Electronico"
            ref={refEmail}
            value="rdelarosa@gmail.com"
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-login">
          <IonInput
            type="password"
            placeholder="Contraseña"
            ref={refPassword}
            value="NewHorizons2021"
          />
        </IonItem>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          size="large"
          expand="block"
          type="button"
          fill="solid"
          onClick={handleClickSignIn}
        >
          Ingresar
        </IonButton>
        <IonButton
          size="large"
          expand="block"
          fill="outline"
          routerLink="/register"
          routerDirection="forward"
        >
          Registrar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
