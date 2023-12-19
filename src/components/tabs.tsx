import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Flex,
} from "@radix-ui/themes";
import styled from "styled-components";

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
    <StyledTabsRoot defaultValue="account">
      <TabsList>
        {props.tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            autoFocus={tab.name === "Explore"}
          >
            <Flex direction="row" gap="4">
              {tab.name}
            </Flex>
          </TabsTrigger>
        ))}
      </TabsList>

      {props.tabs.map((tab) => (
        <StyledTabContent key={tab.value} value={tab.value}>
          {tab.children}
        </StyledTabContent>
      ))}
    </StyledTabsRoot>
  );
}

const StyledTabContent = styled(TabsContent)(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.colors.surface,
  height: "100%",
  width: "100%",
}));

const StyledTabsRoot = styled(TabsRoot)({
  width: "100%",
  height: "100%",
});
