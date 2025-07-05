import { useState } from "react";
import { db as dbTypes } from "./types";

export default function Client({ db }: { db: dbTypes }) {
  const [isArchived, SetIsArchived] = useState<boolean>(false);
  return (
    <div>
      <div></div>
    </div>
  );
}
