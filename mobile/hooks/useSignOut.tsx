import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { useClerk } from "@clerk/clerk-expo";

export const useSignOut = () => {
  const { signOut } = useClerk();
  const [showAlert, setShowAlert] = useState(false);

  const handleSignOut = () => setShowAlert(true);

  const confirmSignOut = async () => {
    setShowAlert(false);
    await signOut();
  };

  const StylishAlert = () => (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title="Logout"
      message="Are you sure you want to logout?"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Cancel"
      confirmText="Logout"
      confirmButtonColor="#ef4444"
      cancelButtonColor="#6b7280"
      onCancelPressed={() => setShowAlert(false)}
      onConfirmPressed={confirmSignOut}
    />
  );

  return { handleSignOut, StylishAlert };
};
