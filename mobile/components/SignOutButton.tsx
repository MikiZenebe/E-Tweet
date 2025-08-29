import { useSignOut } from "@/hooks/useSignOut";
import { Feather } from "@expo/vector-icons";
import { Button, TouchableOpacity } from "react-native";
const SignOutButton = () => {
  const { handleSignOut, StylishAlert } = useSignOut();
  return (
    <>
      {" "}
      <TouchableOpacity onPress={handleSignOut}>Sign Out</TouchableOpacity>
      <StylishAlert />
    </>
  );
};
export default SignOutButton;
