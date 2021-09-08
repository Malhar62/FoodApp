import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, TouchableOpacity, TextInput, StatusBar, ImageBackground, Dimensions, Keyboard, KeyboardAvoidingView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { HEIGHT, WIDTH } from "../../theme/scale"
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//SHA 1 //gradelw signinReport
/**
 * ./gradlew signinReport
 */
GoogleSignin.configure({
  webClientId: '722399197989-jihp9g0rgjsapj0uqushdl4q8ol5fp7v.apps.googleusercontent.com',
  offlineAccess: true
})
const ROOT: ViewStyle = {
  backgroundColor: '#40299b',
  flex: 1
}
const TOP: ViewStyle = {
  backgroundColor: '#40299b',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center', opacity: 0.9
}
const BOTTOMS: ViewStyle = {
  width: '100%', backgroundColor: "#fff", borderTopEndRadius: 30, borderTopStartRadius: 30,
  justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
}
//722399197989-jihp9g0rgjsapj0uqushdl4q8ol5fp7v.apps.googleusercontent.com
/**
 ./gradlew signinReport
 */
//5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [mail1, setMail1] = useState('');
  const [pass1, setPass1] = useState('');
  const [show, setShow] = useState(true)


  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    if (authStore.isLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'main' }]
      });
    }
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
  const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     //navigation.navigate('Login')
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'DashBoard' }]
      // });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cant1')
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('cant2')

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('cant3')

        // play services not available or outdated
      } else {
        // some other error happened
        console.log('cant4')

      }
    }
  }
  const getInfoFromToken = (token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,birthday,email,gender',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error: string, user: { name: any; email: any }) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          let user_Info = {
            name: user.name,
            email: user.email,
            dateOfBirth: "",
            url: ""
          }
          console.log('result:', user);
          authStore.onLoginWithFb(user.email, user.name)
          navigation.reset({
            index: 0,
            routes: [{ name: 'main' }]
          });
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  function initUser() {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result: { isCancelled: any; grantedPermissions: { toString: () => string } }) {
        if (result.isCancelled) {
          console.log("==> Login cancelled");
        } else {
          console.log(
            "==> Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then((data: { accessToken: { toString: () => any } }) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken)
          });
        }
      },
      function (error: string) {
        console.log("==> Login fail with error: " + error);
      }
    );
  }
  const validate = (text: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setMail1('Email is Not Correct');
      setMail(text);
    } else {
      setMail(text);
      setMail1('Email is Correct');
    }
  };
  function validatePassword(text: any) {
    setPass(text)
    var p = text,
      errors = [];
    if (p.length < 8) {
      errors.push('Your password must be at least 8 characters');
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one letter.');
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.');
    }
    if (p.search(/(?=.*[!#$%&? "])/) < 0) {
      errors.push('Your password must contain at least one character.');
    }
    if (errors.length > 0) {
      setPass1(errors.join('\n'));
      return false;
    } else {
      setPass1('Password is OK!')
    }
    return true;
  }
  function LoginButton() {
    return (
      <TouchableOpacity onPress={() => {
        validatePassword(pass)
        if (pass1 == 'Password is OK!' && mail1 == 'Email is Correct') {
          authStore.onLogin(mail, pass)
          navigation.reset({
            index: 0,
            routes: [{ name: 'main' }]
          });
        }
      }}>
        <View elevation={5} style={{ width: WIDTH(200), height: HEIGHT(40), borderRadius: 30, marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#40299b' }}>
          <Text style={{ fontSize: 18, color: '#fff' }}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    )
  }
  function OtherMode() {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ fontSize: 18 }}>Login with</Text>
        </View>
        <View style={{ flexDirection: 'row', width: WIDTH(200), justifyContent: 'space-between' }}>
          <View elevation={5} style={{ width: WIDTH(60), height: HEIGHT(30), backgroundColor: '#40299b', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome name={'facebook'} size={20} color='#fff' onPress={() => initUser()} />
          </View>
          <View elevation={5} style={{ width: WIDTH(60), height: HEIGHT(30), backgroundColor: '#40299b', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome name={'google'} size={20} color='#fff' onPress={() => signInGoogle()} />
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={ROOT}>

      <ImageBackground source={{ uri: 'https://as2.ftcdn.net/jpg/01/85/12/83/500_F_185128326_NzhHG8iawn15nNxiEDcoAkwPHSBUMjIZ.jpg' }} style={{
        height: keyboardStatus != 'Keyboard Shown' ? HEIGHT(250) : HEIGHT(150),
        width: '100%'
      }}>
        <StatusBar hidden />
        <View style={[TOP, {
          height: keyboardStatus != 'Keyboard Shown' ? HEIGHT(250) : HEIGHT(150),
        }]}>
          <Ionicons name='md-fast-food-sharp' size={HEIGHT(80)} color='#fff' onPress={() => { console.log('hello') }} />
          <Text style={{ fontSize: 20, color: '#fff', marginTop: HEIGHT(7) }}>LETS COOK</Text>
        </View>
      </ImageBackground>

      <View style={[BOTTOMS, {
        height: keyboardStatus != 'Keyboard Shown' ? Dimensions.get('window').height - HEIGHT(250) : Dimensions.get('window').height - HEIGHT(150)
      }]}>
        <View style={{ width: WIDTH(300), alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontSize: 20 }}>Login to your account</Text>
          </View>
          <View style={{ alignSelf: 'center', marginTop: 20 }}>
            <View style={{ width: WIDTH(300), height: HEIGHT(65), justifyContent: 'center' }}>

              <View style={{ width: WIDTH(300), height: HEIGHT(55), borderWidth: 2, borderRadius: 7, position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  value={mail}
                  placeholder='enter email'
                  onChangeText={data => validate(data)}
                  style={{ height: 50, width: WIDTH(250) }}
                />
                <View style={{ position: 'absolute', right: 10 }}>
                </View>
              </View>
              <View style={{ position: 'absolute', left: 10, top: 0, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 18, marginHorizontal: 4 }}>{'email address'}</Text>
              </View>
            </View>

            <View style={{ height: HEIGHT(20) }}>
              <Text style={{ color: mail1 == 'Email is Correct' ? 'green' : 'red' }}>{mail1}</Text>
            </View>
            <View style={{ width: WIDTH(300), height: HEIGHT(65), justifyContent: 'center', marginTop: 30 }}>

              <View style={{ width: WIDTH(300), height: HEIGHT(55), borderWidth: 2, borderRadius: 7, position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  secureTextEntry={show}
                  value={pass}
                  placeholder='enter password'
                  onChangeText={data => validatePassword(data)}
                  style={{ height: 50, width: WIDTH(250) }}
                />
                <View style={{ position: 'absolute', right: 10 }}>
                  <AntDesign name={show ? 'eyeo' : 'eye'} size={25} onPress={() => setShow(!show)} />
                </View>
              </View>
              <View style={{ position: 'absolute', left: 10, top: 0, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 18, marginHorizontal: 4 }}>{'password'}</Text>
              </View>
            </View>
            <View style={{ height: HEIGHT(70) }}>
              <Text style={{ color: pass1 == 'Password is OK!' ? 'green' : 'red' }}>{pass1}</Text>
            </View>

          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoginButton />
        <OtherMode />
      </View>

    </View>
  )
})

//keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore | "C:\OpenSSL\bin\openssl" sha1 -binary | "C:\OpenSSL\bin\openssl" base64