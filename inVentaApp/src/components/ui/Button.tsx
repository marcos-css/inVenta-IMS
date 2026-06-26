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
    backgroundColor: "#212529",
  },
  secondaryButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#989da1ff",
  },
  disabledButton: {
    backgroundColor: "#ADB5BD",
  },
  textBase: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#212529",
  },
  disabledText: {
    color: "#F8F9FA",
  },
});

// style={[
//           styles.button,
//           disabled ? styles.disabled : null,
//           variant == "secondary" ? styles.secondary : null,
//           style,
//           textStyle,
