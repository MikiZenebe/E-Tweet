import { useSignOut } from "@/hooks/useSignOut";
import { Feather } from "@expo/vector-icons";
import { Button, Text, TouchableOpacity } from "react-native";
const SignOutButton = () => {
  const { handleSignOut, StylishAlert } = useSignOut();
  return (
    <>
      {" "}
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <StylishAlert />
    </>
  );
};
export default SignOutButton;
