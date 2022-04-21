import {
  Fieldset,
  Tag,
  Text,
  Tabs,
  Loading,
  Description,
} from "@geist-ui/core";
import CodeMirror from "@uiw/react-codemirror";

interface IResponseProps {
  response: any;
  resHeaders: { [key: string]: string };
  axiosTimer: string;
  size: string;
  loading: boolean;
}

export default function ResponseView({
  response,
  resHeaders,
  axiosTimer,
  size,
  loading,
}: IResponseProps) {
  return (
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
        {response && size && <Tag type="default">Size: {size}</Tag>}
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
  );
}
