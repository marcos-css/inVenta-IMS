import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, style, ...rest }: Props) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.gray700,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.gray50,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
