import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../UI/Button";
import Input from "./Input";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }

  const [inputs, setInputs] = useState({
    email: {
      value: "",
      isInvalid: false,
    },
    confirmEmail: {
      value: "",
      isInvalid: false,
    },
    password: {
      value: "",
      isInvalid: false,
    },
    confirmPassword: {
      value: "",
      isInvalid: false,
    },
  });

  function updateInputValueHandler(inputType, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputType]: {
          value: enteredValue,
          isInvalid: false,
        },
      };
    });
  }

  function submitHandler() {
    let { email, confirmEmail, password, confirmPassword } = {
      email: inputs.email.value,
      confirmEmail: inputs.confirmEmail.value,
      password: inputs.password.value,
      confirmPassword: inputs.confirmPassword.value,
    };

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");

      setInputs({
        email: {
          value: inputs.email.value,
          isInvalid: !emailIsValid,
        },
        confirmEmail: {
          value: inputs.confirmEmail.value,
          isInvalid: !emailIsValid || !emailsAreEqual,
        },
        password: {
          value: inputs.password.value,
          isInvalid: !passwordIsValid,
        },
        confirmPassword: {
          value: inputs.confirmPassword.value,
          isInvalid: !passwordIsValid || !passwordsAreEqual,
        },
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <Input
        label="Email Address"
        onUpdateValue={(val) => updateInputValueHandler("email", val)}
        value={inputs.email.value}
        isInvalid={inputs.email.isInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          onUpdateValue={(val) => updateInputValueHandler("confirmEmail", val)}
          value={inputs.confirmEmail.value}
          isInvalid={inputs.confirmEmail.isInvalid}
        />
      )}
      <Input
        label="Password"
        onUpdateValue={(val) => updateInputValueHandler("password", val)}
        secure
        value={inputs.password.value}
        isInvalid={inputs.password.isInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={(val) =>
            updateInputValueHandler("confirmPassword", val)
          }
          secure
          value={inputs.confirmPassword.value}
          isInvalid={inputs.confirmPassword.isInvalid}
        />
      )}
      <View style={styles.buttons}>
        <Button
          title={isLogin ? "Log In" : "Sign Up"}
          color="teal"
          onPress={submitHandler}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          title={isLogin ? "Create a new user" : "Log in instead"}
          color="#85adad"
          onPress={switchAuthModeHandler}
        />
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 12,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#23455c",
    elevation: 2,
  },
  buttons: {
    marginTop: 8,
  },
});
