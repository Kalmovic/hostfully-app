import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Flex,
} from "@radix-ui/themes";
import styled from "styled-components";
import { theme } from "../providers/theme";

type Tabs = {
  value: string;
  name: string;
  children: React.ReactNode;
};

type TabsProps = {
  tabs: Tabs[];
};

export function Tabs(props: TabsProps) {
  return (
    <StyledTabsRoot defaultValue="explore">
      <StyledTabsList>
        {props.tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} aria-label={tab.value}>
            <Flex direction="row" gap="4">
              {tab.name}
            </Flex>
          </TabsTrigger>
        ))}
      </StyledTabsList>

      {props.tabs.map((tab) => (
        <StyledTabContent key={tab.value} value={tab.value}>
          {tab.children}
        </StyledTabContent>
      ))}
    </StyledTabsRoot>
  );
}

const StyledTabContent = styled(TabsContent)({
  padding: 16,
  height: "100%",
  width: "100%",
});

const StyledTabsRoot = styled(TabsRoot)({
  width: "100%",
  height: "100%",
});

const StyledTabsList = styled(TabsList)({
  backgroundColor: theme.colors.white,
  "@media (max-width: 768px)": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
});
