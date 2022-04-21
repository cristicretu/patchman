import {
  Button,
  Divider,
  Fieldset,
  Input,
  Select,
  Tabs,
  Text,
} from "@geist-ui/core";
import type { NextPage } from "next";
import PageContent from "@geist-ui/core";

const Home: NextPage = () => {
  const methodHandler = (method: string) => {
    console.log(method);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
      }}
    >
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
          <Select.Option value="HEAD">HEAD</Select.Option>
          <Select.Option value="OPTIONS">OPTIONS</Select.Option>
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

      <Fieldset>
        <Tabs initialValue="1" paddingRight={2}>
          <Tabs.Item label="Query Params" value="1">
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <Input
                label="Key"
                placeholder="message"
                clearable
                width="100%"
                style={{ flexBasis: "60%", width: "10%" }}
              />
              <Input
                label="Value"
                placeholder="Hello, World!"
                clearable
                width="100%"
                style={{ flexBasis: "60%", width: "10%" }}
              />
              <Button
                type="error"
                ghost
                scale={0.8}
                style={{ flexBasis: "5%", width: "5%" }}
              >
                Delete
              </Button>
            </div>
            <Button
              type="success"
              ghost
              auto
              style={{ marginTop: "24px" }}
              scale={0.8}
            >
              Add
            </Button>{" "}
          </Tabs.Item>
          <Tabs.Item label="Headers" value="2">
            Between the Web browser and the server, numerous computers and
            machines relay the HTTP messages.
          </Tabs.Item>
          <Tabs.Item label="JSON" value="3">
            JSON
          </Tabs.Item>
        </Tabs>
      </Fieldset>

      <Fieldset>
        <Text h2>Response</Text>
        <Divider my={0} />
      </Fieldset>
    </div>
  );
};

export default Home;
