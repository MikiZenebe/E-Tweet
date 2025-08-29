import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useClerk } from "@clerk/clerk-expo";

export const useSignOut = () => {
  const { signOut } = useClerk();
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => setVisible(true);

  const confirmSignOut = async () => {
    setVisible(false);
    await signOut();
  };

  const StylishAlert = () => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.548)",
          }}
        />
      </TouchableWithoutFeedback>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.message}>Are you sure you want to logout?</Text>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.logoutButton]}
              onPress={confirmSignOut}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  return { handleSignOut, StylishAlert };
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  centeredView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginLeft: 10,
    width: "auto",
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
  },
  cancelText: {
    color: "#374151",
    fontSize: 16,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
