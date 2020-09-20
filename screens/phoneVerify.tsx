import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  Image,
  Platform
} from "react-native";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import MyBtn from '../components/MyBtn'
import Colors from '../constants/Colors';

// PROVIDE VALID FIREBASE CONFIG HERE
// https://firebase.google.com/docs/web/setup
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

export default function PhoneAuthScreen(navigation) {
  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [verifyError, setVerifyError] = React.useState<Error>();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmError, setConfirmError] = React.useState<Error>();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;

  return (
    <View style={styles.container}>
       <ImageBackground source={require("../assets/images/bg.png")} style={styles.bg}>
       <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
       <View style={styles.logo}>
            <View style={styles.logoImg}>
              <Image source={require("../assets/images/logo.png")} />
            </View>
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 5, fontSize: 20, fontWeight: 'bold' }}>
              Asli Property
            </Text>
          </View>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
        <View style={styles.inputCon}>
        <TextInput
          style={styles.inputStyles}
          autoFocus={isConfigValid}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder='Phone Number'
          editable={!verificationId}
          onChangeText={(phoneNumber: string) => setPhoneNumber(phoneNumber)}
        />
        <MyBtn 
            title={`${verificationId ? "Resend" : "Send"} Verification Code`}
            disabled={!phoneNumber}
            onPress={async () => {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                try {
                  setVerifyError(undefined);
                  setVerifyInProgress(true);
                  setVerificationId("");
                  const verificationId = await phoneProvider.verifyPhoneNumber(
                    phoneNumber,
                    // @ts-ignore
                    recaptchaVerifier.current
                  );
                  setVerifyInProgress(false);
                  setVerificationId(verificationId);
                  verificationCodeTextInput.current?.focus();
                } catch (err) {
                  setVerifyError(err);
                  setVerifyInProgress(false);
                }
              }}
            textStyle={{ color: "#fff", fontSize: 17 }} 
            containerStyle={styles.buttonLogin} 
            colors={[Colors.mainColor, Colors.mainLightColor]} 
        />
        {verifyError && (
          <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
        )}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
        {verificationId ? (
          <Text style={styles.success}>
            A verification code has been sent to your phone
          </Text>
        ) : undefined}
        <TextInput
          ref={verificationCodeTextInput}
          style={styles.inputStyles}
          editable={!!verificationId}
          placeholder="Enter Verification Code"
          onChangeText={(verificationCode: string) =>
            setVerificationCode(verificationCode)
          }
        />
        <MyBtn 
            title="Confirm Verification Code"
            disabled={!verificationCode}
            onPress={async () => {
                try {
                  setConfirmError(undefined);
                  setConfirmInProgress(true);
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                  );
                  const authResult = await firebase
                    .auth()
                    .signInWithCredential(credential);

                  setConfirmInProgress(false);
                  setVerificationId("");
                  setVerificationCode("");
                  verificationCodeTextInput.current?.clear();
                  Alert.alert("Phone authentication successful!");
                  navigation.navigation.navigate('Home')
                } catch (err) {
                  console.log('errs', err)
                  setConfirmError(err);
                  setConfirmInProgress(false);
                }
              }}
            textStyle={{ color: "#fff", fontSize: 17 }} 
            containerStyle={styles.buttonLogin} 
            colors={[Colors.mainColor, Colors.mainLightColor]} 
        />
        {confirmError && (
          <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
        )}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    bg: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: "center",
    },
    logo: {
        margin: 5,
    },
    logoImg: {
        flexDirection: "row",
        justifyContent: "center",
    },
    inputCon: {
        marginTop: 100,
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
  inputStyles: {
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 10
  },
  buttonLogin: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "transparent",
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 10
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
