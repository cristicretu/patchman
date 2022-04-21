import { Input, Button } from "@geist-ui/core";

interface IParamsProps {
  paramKey: string;
  paramValue: string;
}

export default function ParamsView({ paramKey, paramValue }: IParamsProps) {
  return (
    <>
      <Input
        label="Key"
        placeholder={paramKey}
        width="100%"
        readOnly
        style={{ flexBasis: "60%", width: "10%" }}
      />
      <Input
        label="Value"
        placeholder={paramValue}
        width="100%"
        readOnly
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
    </>
  );
}
