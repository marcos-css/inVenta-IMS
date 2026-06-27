import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
  text,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonBase,
        variant === "secondary" && styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      <Text
        style={[
          styles.textBase,
          variant === "secondary" && styles.secondaryText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  disabledButton: {
    backgroundColor: Colors.gray300,
  },
  textBase: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: Colors.text,
  },
  disabledText: {
    color: Colors.secondary,
  },
});

// style={[
//           styles.button,
//           disabled ? styles.disabled : null,
//           variant == "secondary" ? styles.secondary : null,
//           style,
//           textStyle,
