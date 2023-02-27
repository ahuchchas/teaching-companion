import { useContext, useState } from "react";
import { Alert, View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <ScrollView>
      <View style={styles.textBox}>
        <FontAwesome5 name="chalkboard-teacher" size={48} color="#152a37" />
        <Text style={styles.welcome}>Welcome to "Teaching Companion"</Text>
        <Text>Manage your teaching activities easily</Text>
        <Text>Please Login to continue using the app.</Text>
      </View>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  textBox: {
    paddingTop: 28,
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#152a37",
    marginVertical: 24,
  },
});
