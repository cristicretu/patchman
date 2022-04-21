import { Button, Fieldset, Input, Select, Tabs, Text } from "@geist-ui/core";
import type { NextPage } from "next";
import axios, { Method } from "axios";
import { useEffect, useState } from "react";
import ResponseView from "@components/Response";

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
  const [size, setSize] = useState("");

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
    setAxiosTimer("");
    setSize("");
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
        err?.response !== undefined
          ? setResponse({
              status: err.response.status,
              data: err.response.data,
            })
          : null;
      });
  };

  useEffect(() => {
    if (response) {
      setSize(`${new TextEncoder().encode(response.data).length} B`);
    }
  }, [response]);

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

      <ResponseView
        axiosTimer={axiosTimer}
        loading={loading}
        response={response}
        resHeaders={resHeaders}
        size={size}
      />
    </div>
  );
};

export default Home;
