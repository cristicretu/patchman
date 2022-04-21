import {
  Button,
  Fieldset,
  Input,
  Loading,
  Select,
  Tabs,
  Tag,
  Text,
  Description,
} from "@geist-ui/core";
import type { NextPage } from "next";
import axios, { Method } from "axios";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

const Home: NextPage = () => {
  const [method, setMethod] = useState<Method>("GET");
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [axiosTimer, setAxiosTimer] = useState("");

  const [reqJSON, setReqJSON] = useState();
  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({});
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});

  const [response, setResponse] = useState<any>();
  const [resHeaders, setResHeaders] = useState<{ [key: string]: string }>({});

  const methodHandler = (val: any) => setMethod(val as Method);
  const inputHandler = (e: any, func: (value: any) => void) => {
    func(e.target.value);
  };

  const axiosTimerFunc = (startTime: number) => {
    const now = Date.now();
    let milliseconds = Math.floor((now - startTime) % 1000);
    setAxiosTimer(`${milliseconds}ms`);
  };

  const submitHandler = () => {
    setLoading(true);
    setResponse(undefined);
    setResHeaders({});
    const startTime = Date.now();
    axios({
      method: method,
      url: url,
    })
      .then((res) => {
        setLoading(false);
        setResponse(res);
        setResHeaders(res.headers);
        axiosTimerFunc(startTime);
      })
      .catch((err) => {
        setLoading(false);
        setResponse({
          status: err.response.status,
          data: err.response.data,
        });
      });
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

      <form
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
        onSubmit={submitHandler}
      >
        <Select placeholder="GET" onChange={methodHandler}>
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
          onChange={(e) => inputHandler(e, setUrl)}
        />
        <Button type="success" ghost auto onClick={submitHandler}>
          Send
        </Button>{" "}
      </form>

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
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {response && (
            <Tag
              type={
                response.status < 200
                  ? "default"
                  : response.status < 300
                  ? "success"
                  : response.status < 400
                  ? "warning"
                  : response.status < 600
                  ? "error"
                  : "default"
              }
            >
              Status: {response.status}
            </Tag>
          )}

          {axiosTimer && <Tag type="default">Time: {axiosTimer}</Tag>}
          {response && (
            <Tag type="default">
              Size: {new TextEncoder().encode(response).length} B
            </Tag>
          )}
        </div>

        <Tabs initialValue="1" paddingRight={2}>
          <Tabs.Item label="Body" value="1">
            {loading && <Loading>Loading...</Loading>}
            {!loading && response && (
              <CodeMirror
                value={JSON.stringify(response.data, null, 2)}
                height="600px"
                // extensions={[jsonLang()]}
              />
            )}
          </Tabs.Item>
          <Tabs.Item label="Headers" value="2">
            {Object.keys(resHeaders).map((key) => (
              <Description
                key={key}
                title={key}
                content={resHeaders[key]}
                style={{ marginTop: "16px" }}
              />
            ))}
          </Tabs.Item>
        </Tabs>
      </Fieldset>
    </div>
  );
};

export default Home;
