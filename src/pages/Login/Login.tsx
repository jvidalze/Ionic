import {
  IonAlert,
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonPage,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { SignIn } from "../../services/AuthenticationService";
import { User } from "../../models/user.model";
import "./Login.css";
import { Result } from "../../models/resultAuthenticated.model";
import { Storage } from "@capacitor/storage";
import ApplicationContext from "../../context/ApplicationContext";
const Login: React.FC = () => {
  const applicationContext = useContext(ApplicationContext);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);
  const [showAlertError, setShowAlertError] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [toastEmail, setToastEmail] = useState<boolean>(false);
  const [valor, setValor] = useState<String>("");
  const handleOnChangeEmail = () => {
    setValor(refEmail.current?.value as string)
    let patron = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    if (!patron.test(refEmail.current?.value as string)) {
      setToastEmail(true);
    } else {
      setToastEmail(false);
    }
  };
  const handleClickSignIn = async () => {
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;
    const userSignIn: User = {
      email: email,
      password: password,
    };
    const resultSignIn: Result = await SignIn(userSignIn);
    if (resultSignIn.isAuthenticated) {
      Storage.set({ key: "IS_AUTHENTICATED", value: "true" });
      Storage.set({ key: "USUARIO", value: JSON.stringify(resultSignIn.data) });
      applicationContext.refreshAuthenticated();
    } else {
      if (toastEmail === true) {
        setShowAlert(true);
      } else {
        console.log(resultSignIn.message);
        setShowAlertError(true);
      }
    }
  };
  useIonViewWillEnter(()=>
  setValor("rdelarosa@gmail.com")
  );
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
            value={`${valor}`}
           /*  value="rdelarosa@gmail.com" */
            onIonChange={handleOnChangeEmail}
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
        <IonToast
          isOpen={toastEmail}
          color="danger"
          position="top"
          onDidDismiss={() => setToastEmail(false)}
          message={`Escribe una direccion de correo valida`}
        />
        <IonAlert
          isOpen={showAlertError}
          header="Error"
          message="Usuario y/o contraseña incorrecta."
          buttons={[
            {
              text: "OK",
              handler: () => {
                setShowAlertError(false);
              },
            },
          ]}
        />
        <IonAlert
          isOpen={showAlert}
          header="Error"
          message="Ingresa una dirección de correo valida."
          buttons={[
            {
              text: "OK",
              handler: () => {
                setShowAlertError(false);
              },
            },
          ]}
        />
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
