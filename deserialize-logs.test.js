import { test, expect } from "vitest";
const AElf = require("aelf-sdk");
const { deserializeLogs } = require("./deserialize-logs");
const NODE_URL = "https://tdvw-test-node.aelf.io";

const aelf = new AElf(new AElf.providers.HttpProvider(NODE_URL));

test("deserialise logs - empty array", async () => {
  const res = await deserializeLogs(aelf, []);
  expect(res).toBeNull();
});

test("deserialise logs - missing proto", async () => {
  const Logs = [
    {
      Address: "238X6iw1j8YKcHvkDYVtYVbuYk2gJnK8UoNpVCtssynSpVC8hb",
      Name: "VirtualTransactionCreated",
      Indexed: [
        "CiIKIA8J04pLJGNHl4y2KWuBJipdXjtJ2ForrSRRuRx9w2LY",
        "EiIKIAR/b9iJa/+kT2+h9XAdQE0UX9wFZogfPtn9YvtlCnB2",
        "GiIKICeR6ZKlfyjnWhHxOvLArsiw6zXS8EjULrqJAckuA3jc",
        "IghUcmFuc2Zlcg==",
        "MiIKICWmXUMWhKDuXFdYz8/uF7ze4kC5r3i7boxM5Dj+RE4G",
      ],
      NonIndexed:
        "KjAKIgogIKCTibOwFJNFp0zUNEXymkyazYKz8LLwLqOZxEqKRF0SA09NSRiA0NvD9AI=",
    },
    {
      Address: "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx",
      Name: "Transferred",
      Indexed: [
        "CiIKIDzE45k4cc5SlJWq9JcVkWLSv3Vn3RFxQygv94Av5rz+",
        "EiIKIIiIHUNQqMd8WaQvyGu815axKeCG2n5h0k+4amy7ay87",
        "GgNFTEY=",
      ],
      NonIndexed: "IICEr18=",
    },
  ];
  const res = await deserializeLogs(aelf, Logs);

  expect(res[0].message).toBe("This log is not supported.");
});
