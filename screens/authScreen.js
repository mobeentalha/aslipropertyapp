import  React , { Component }from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Platform
} from "react-native";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";

const FIREBASE_CONFIG: any = {
  apiKey: "AIzaSyA7upPXdHw6xwpRt4VL2yymF5d48rzdCxQ",
    authDomain: "property-fire.firebaseapp.com",
    databaseURL: "https://property-fire.firebaseio.com",
    projectId: "property-fire",
    storageBucket: "property-fire.appspot.com",
    messagingSenderId: "723218292626",
    appId: "1:723218292626:web:71c04300aa3c9e4206ab4b"
 /* measurementId: "G-measurement-id",*/
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

export default class PhoneAuthScreen extends Component{
    constructor(Props) {
        super(Props);
        this.state = {
            recaptchaVerifier: null,
            verificationCodeTextInput: null,
            phoneNumber: "",
            verificationId: "",
            verifyError: "",
            verifyInProgress: "",
            verificationCode: "",
            confirmError: "",
            confirmInProgress: "",
            isConfigValid: !!FIREBASE_CONFIG.apiKey
        };
        this.setPhoneNumber = this.setPhoneNumber.bind(this)
        this.setVerifyError = this.setVerifyError.bind(this)
        this.setVerifyInProgress = this.setVerifyInProgress.bind(this)
        this.setVerificationId = this.setVerificationId.bind(this)
        this.setVerificationCode = this.setVerificationCode.bind(this)
        this.setConfirmError = this.setConfirmError.bind(this)
        this.setConfirmInProgress = this.setConfirmInProgress.bind()
    }
    setPhoneNumber(value) {
        this.setState({ phoneNumber: value})
    }
    setVerifyError(value){
        this.setState({ verifyError: value})
    }
    setVerifyInProgress(value){
        this.setState({ verifyInProgress: value})
    }
    setVerificationId(value){
        this.setState({ verificationId: value})
    }
    setVerificationCode(value){
        this.setState({ verificationCode: value})
    }
    setConfirmError(value){
        this.setState({ confirmError: value})
    }
    setConfirmInProgress(value){
        this.setState({ confirmInProgress: value})
    }
   render(){
       const recaptchaVerifier = this.state.recaptchaVerifier;
       const verificationId = this.state.verificationId;
       const phoneNumber = this.state.phoneNumber;
       const verificationCodeTextInput = this.state.verificationCodeTextInput;
       const verificationCode = this.state.verificationCode;
       const confirmError = this.state.confirmError;
       const confirmInProgress = this.state.confirmInProgress;
       return(
        <View style={styles.container}>
        <View style={styles.content}>
          <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={FIREBASE_CONFIG}
          />
          <Text style={styles.text}>Enter phone number</Text>
          <TextInput
            style={styles.textInput}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            placeholder="+1 999 999 9999"
            onChangeText={(phoneNumber: string) => this.setPhoneNumber(phoneNumber)}
          />
          <Button
            title={`${this.state.verificationId ? "Resend" : "Send"} Verification Code`}
            disabled={!phoneNumber}
            onPress={async () => {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              try {
                this.setVerifyError(undefined);
                this.setVerifyInProgress(true);
                this.setVerificationId("");
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  phoneNumber,
                  // @ts-ignore
                  recaptchaVerifier.current
                );
                this.setVerifyInProgress(false);
                this.setVerificationId(verificationId);
                verificationCodeTextInput.current?.focus();
              } catch (err) {
                this.setVerifyError(err);
                this.setVerifyInProgress(false);
              }
            }}
          />
          {/* {this.state.verifyError && (
            <Text style={styles.error}>{`Error: ${this.state.verifyError.message}`}</Text>
          )} */}
          {this.state.verifyInProgress && <ActivityIndicator style={styles.loader} />}
          {this.state.verificationId ? (
            <Text style={styles.success}>
              A verification code has been sent to your phone
            </Text>
          ) : <View />}
          <Text style={styles.text}>Enter verification code</Text>
          <TextInput
            ref={verificationCodeTextInput}
            style={styles.textInput}
            editable={!!this.state.verificationId}
            placeholder="123456"
            onChangeText={(verificationCode: string) =>
              this.setVerificationCode(verificationCode)
            }
          />
          <Button
            title="Confirm Verification Code"
            disabled={!verificationCode}
            onPress={async () => {
              try {
                this.setConfirmError(undefined);
                this.setConfirmInProgress(true);
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                const authResult = await firebase
                  .auth()
                  .signInWithCredential(credential);
                this.setConfirmInProgress(false);
                this.setVerificationId("");
                this.setVerificationCode("");
                verificationCodeTextInput.current?.clear();
                Alert.alert("Phone authentication successful!");
              } catch (err) {
                this.setConfirmError(err);
                this.setConfirmInProgress(false);
              }
            }}
          />
          {/* {confirmError && (
            <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
          )} */}
          {confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
        {!this.state.isConfigValid && (
          <View style={styles.overlay} pointerEvents="none">
            <Text style={styles.overlayText}>
              To get started, set a valid FIREBASE_CONFIG in App.tsx.
            </Text>
          </View>
        )}
      </View>
       )
   } 
//   const recaptchaVerifier = React.useRef(null);
//   const verificationCodeTextInput = React.useRef(null);
//   const [phoneNumber, setPhoneNumber] = React.useState("");
//   const [verificationId, setVerificationId] = React.useState("");
//   const [verifyError, setVerifyError] = React.useState<Error>();
//   const [verifyInProgress, setVerifyInProgress] = React.useState(false);
//   const [verificationCode, setVerificationCode] = React.useState("");
//   const [confirmError, setConfirmError] = React.useState<Error>();
//   const [confirmInProgress, setConfirmInProgress] = React.useState(false);
//   const isConfigValid = !!FIREBASE_CONFIG.apiKey;

//   return (
    
//   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginTop: 50,  
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: "bold",
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  success: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: 'center',
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
});
