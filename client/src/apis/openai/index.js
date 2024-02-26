import OpenAI from "openai";
import { useState, useRef, useEffect } from "react";
import { get_pf_data_schema } from "./getdata";
import tools from "./tools";
import instructions from "./instructions";
import "./style.css";
// require('dotenv').config();

const axios = require("axios");

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// const assistantId = process.env.ASSISTANT_ID;
// const model = "gpt-3.5-turbo";

// async function manageAssistant() {
//   try {
//     // Attempt to retrieve the assistant to check if it exists
//     const existingAssistant = await openai.retrieveAssistant({
//       assistant_id: assistantId,
//     });

//     console.log("Updating existing assistant ...");
//     // Update the assistant if it exists
//     const updatedAssistant = await openai.updateAssistant({
//       assistant_id: assistantId,
//       name: "Climate Change Assistant",
//       model,
//       // Additional properties like `instructions` and `tools` can be modified here if the API supports it
//     });
//     console.log(updatedAssistant.data);

//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.log("Creating assistant ...");
//       // Create a new assistant if it doesn't exist
//       const newAssistant = await openai.createAssistant({
//         name: "Climate Change Assistant",
//         model,
//         // The current API may not directly support `instructions` and `tools` in this manner; adjust accordingly
//       });
//       console.log(newAssistant.data);
//       console.log("Now save the ID in your .env file");
//     } else {
//       console.error("An error occurred:", error.message);
//     }
//   }
// }

// manageAssistant().catch(console.error);

const Assistant = () => {
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState();

  const [response, setResponse] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [thread, setThread] = useState([]);
  const [messages, setMessages] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions:
        "You are a personal math tutor. Write and run code to answer math questions.",
      tools: [
        // {
        //     "type": "function",
        //     "function": get_pf_data_schema,
        // },
        { type: "code_interpreter" },
      ],
      model: "gpt-4-turbo-preview",
      // messages: thread
    });
    // thrd is Thread
    const thrd = await openai.beta.threads.create();
    // msg is Message
    const msg = await openai.beta.threads.messages.create(thrd.id, {
      role: "user",
      content: input,
    });
    const run = await openai.beta.threads.runs.create(thrd.id, {
      assistant_id: assistant.id,
      instructions:
        "Please address the user as Jane Doe. The user has a premium account.",
    });
    await checkStatus(thrd.id, run.id);

    // msg is Messages
    const msgs = await openai.beta.threads.messages.list(thrd.id);


    msgs.body.data.map((element, index, array)=>{
        return setThread((thread) => [...thread, array[array.length - index - 1]]);
    })

    setInput("");
    setLoading(false);
  };

  async function checkStatus(threadId, runId) {
    let isComplete = false;
    while (!isComplete) {
      const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
      );
      if (runStatus.status === "completed") {
        isComplete = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  }
useEffect(()=>{
console.log(thread)
},[thread])
  return (
    <div id="chat">
      <div className="text-container">
        {thread &&
          thread.map((e, i) => {
            return (
              <div className="message" key={i}>
                <div className="content">
                  <h3 className="title">Assistant</h3>
                  <p className="text">{e.content[0].text.value}</p>
                </div>
              </div>
            );
          })}
        <strong>API completion:</strong>
        {response} <br />
      </div>

      <div
        className="testbox"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          whiteSpace: "wrap",
        }}
      >
        <pre
          style={{
            width: "80%",
            padding: "20px",
            whiteSpace: "wrap",
          }}
        >
          <strong>API completion:</strong>
          {response} <br />
        </pre>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <textarea
          type="text"
          value={input}
          placeholder="Please ask to openai"
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button
          disabled={loading || input.length === 0}
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {response && (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            boxSizing: "border-box",
          }}
        ></div>
      )}
    </div>
  );
};

export default Assistant;
