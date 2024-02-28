import { get_pf_data_schema } from "./getdataschema"
export const tools =  [
  {
      "type": "function",
      "function": get_pf_data_schema,
  },
  {"type": "code_interpreter"},
]