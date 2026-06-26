import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
} from "react-native";
import React from "react";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, style, placeholder, ...rest }: Props) => {
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
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#F8F9FA",
  },
  inputError: {
    borderColor: "#E03131",
  },
  errorText: {
    color: "#E03131",
    fontSize: 12,
    marginTop: 4,
  },
});
