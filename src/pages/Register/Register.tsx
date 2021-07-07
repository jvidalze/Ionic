import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { User } from "../../models/user.model";
import { SignUp } from "../../services/AuthenticationService";

import "./Register.css";
const Register: React.FC = () => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlertError, setShowAlertError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [toastFirstName, setToastFirstName] = useState<boolean>(false);
  const [toastLastName, setToastLastName] = useState<boolean>(false);
  const [toastEmail, setToastEmail] = useState<boolean>(false);
  const [toastPassword, setToastPassword] = useState<boolean>(false);
  const refFirstName = useRef<HTMLIonInputElement>(null);
  const refLastName = useRef<HTMLIonInputElement>(null);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);

  const handleOnChangeFirstName = () => {
    if ((refFirstName.current?.value as string).length < 7) {
      setToastFirstName(true);
    } else {
      setToastFirstName(false);
    }
  };
  const handleOnChangeLastName = () => {
    if ((refLastName.current?.value as string).length < 7) {
      setToastLastName(true);
    } else {
      setToastLastName(false);
    }
  };
  const handleOnChangeEmail = () => {
    let patron = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
    if (!patron.test(refEmail.current?.value as string)) {
      setToastEmail(true);
    } else {
      setToastEmail(false);
    }
  };

  const handleOnChangePassword = () => {
    if ((refPassword.current?.value as string).length < 7) {
      setToastPassword(true);
    } else {
      setToastPassword(false);
    }
  };

  const handleClickSignUp = async () => {
    const firstName = refFirstName.current?.value as string;
    const lastName = refLastName.current?.value as string;
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      toastFirstName === false &&
      toastLastName === false &&
      toastEmail === false &&
      toastPassword === false
    ) {
      const userToRegister: User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const resultSignUp = await SignUp(userToRegister);
      if (resultSignUp.userExists) {
        setMessage(resultSignUp.message);
      } else {
        if (resultSignUp.data) {
          setShowAlert(true);
        }
      }
    } else {
      setShowAlertError(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton routerLink="/login" routerDirection="back">
              <IonIcon icon={chevronBackSharp} />
              Regresar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            onIonFocus={handleOnChangeFirstName}
            onIonChange={handleOnChangeFirstName}
            type="text"
            placeholder="Nombres"
            ref={refFirstName}
            minlength={6}
            required
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            onIonChange={handleOnChangeLastName}
            type="text"
            placeholder="Apellidos"
            ref={refLastName}
            required
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            onIonChange={handleOnChangeEmail}
            type="email"
            placeholder="Correo Electronico"
            ref={refEmail}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            onIonChange={handleOnChangePassword}
            type="password"
            placeholder="Contraseña"
            ref={refPassword}
            required
          />
        </IonItem>
        <IonToast
          isOpen={toastFirstName}
          color="danger"
          position="top"
          onDidDismiss={() => setToastFirstName(false)}
          message={`El nombre debe ser mayor a 6 caracteres`}
        />
        <IonToast
          isOpen={toastLastName}
          color="danger"
          position="top"
          onDidDismiss={() => setToastLastName(false)}
          message={`Los apellidos deben ser mayor a 6 caracteres`}
        />
        <IonToast
          isOpen={toastEmail}
          color="danger"
          position="top"
          onDidDismiss={() => setToastEmail(false)}
          message={`Escribe una direccion de correo valida`}
        />
        <IonToast
          isOpen={toastPassword}
          color="danger"
          position="top"
          onDidDismiss={() => setToastPassword(false)}
          message={`La contraseña debe ser mayor a 6 caracteres`}
        />
        <IonAlert
          isOpen={showAlert}
          header="Felicidades"
          message="La cuenta se registro correctamente."
          buttons={[
            {
              text: "OK",
              handler: () => {
                history.push("/login");
              },
            },
          ]}
        />
        <IonAlert
          isOpen={showAlertError}
          header="Error"
          message="Complete todos los campos correctamente."
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
          fill="solid"
          onClick={handleClickSignUp}
        >
          Registrar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
