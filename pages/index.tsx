import { Button, Input, Select, Tabs, Text } from "@geist-ui/core";
import Page from "@geist-ui/core";
import type { NextPage } from "next";
import PageContent from "@geist-ui/core/esm/page/page-content";

const Home: NextPage = () => {
  const methodHandler = (method: string) => {
    console.log(method);
  };

  return (
    <PageContent>
      <Text h1>Patchman</Text>

      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Select placeholder="GET">
          <Select.Option value="GET">GET</Select.Option>
          <Select.Option value="POST">POST</Select.Option>
          <Select.Option value="PUT">PUT</Select.Option>
          <Select.Option value="DELETE">DELETE</Select.Option>
          <Select.Option value="PATCH">PATCH</Select.Option>
        </Select>
        <Input
          placeholder="https://jsonplaceholder.typicode.com/comments"
          width="100%"
          scale={1.13}
        />
        <Button type="success" ghost auto>
          Send
        </Button>{" "}
      </div>

      <Tabs initialValue="1">
        <Tabs.Item label="Query Params" value="1">
          conteeeeeent query params{" "}
        </Tabs.Item>
        <Tabs.Item label="Headers" value="2">
          Between the Web browser and the server, numerous computers and
          machines relay the HTTP messages.
        </Tabs.Item>
        <Tabs.Item label="JSON" value="3">
          JSON
        </Tabs.Item>
      </Tabs>
    </PageContent>
  );
};

export default Home;
