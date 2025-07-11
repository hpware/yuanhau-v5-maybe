const jsonData = {
  version: "v5 Beta (rev 3)",
  copyright_owner: "Yuan-Hau Wu",
};

type JsonDataKey = keyof typeof jsonData;

export default function jsonObject(requestedObject: JsonDataKey) {
  return jsonData[requestedObject];
}
