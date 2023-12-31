import { Text } from "@radix-ui/themes";
import logo from "../assets/hostfully-logo.svg";

export function Header() {
  return (
    <Text
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        fontSize: 28,
        paddingBottom: 16,
        paddingTop: 16,
        paddingLeft: 16,
        alignItems: "baseline",
        backgroundColor: "#fff",
      }}
    >
      Welcome to{" "}
      <img
        src={logo}
        alt="logo"
        style={{ width: 150, position: "relative", top: 8, left: 8 }}
      />
    </Text>
  );
}
