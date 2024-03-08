import OpenAI from "openai";
import { useState, useRef, useEffect } from "react";
import { tools } from "./tools";
import { instructions } from "./instructions";
import UseAnimations from "react-useanimations";
import load from "react-useanimations/lib/loading";
import FeatherIcon from "feather-icons-react";
import API from "../../utils/API";
import Markdown from "react-markdown"

import "./style.css";

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
  const threads = useRef();
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState();
  const [see, setSee] = useState();
  const [response, setResponse] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
const textarea = useRef();
  const [thread, setThread] = useState([]);
  const [thrdId, setThrdId] = useState(null);
  const [assistantID, setAssistantID] = useState(undefined);

  let name = "Climate-Guide";
  let model = "gpt-4-1106-preview";

// Startup
  useEffect(() => {
    async function createAssistant() {
      if (assistantID !== undefined) {
        const myAssistant = await openai.beta.assistants.retrieve(assistantID);
        const assistant = await openai.beta.assistants.update(assistantID, {
          name,
          instructions,
          tools,
          model,
        });
      } else {
        const assistant = await openai.beta.assistants.create({
          name,
          instructions,
          tools,
          model,
        });
        await setAssistantID(assistant.id);
      }
       
      // thrd is Thread
    const thrd = await openai.beta.threads.create();
    await setThrdId(thrd.id);

    }
    createAssistant();
  }, []);

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    setLoading(true);

    
    // msg is Message
    const msg = await openai.beta.threads.messages.create(thrdId, {
      role: "user",
      content: input,
    });

    setInput("");

    setThread((thread) => [
      ...thread,
      msg,
    ]);

    const run = await openai.beta.threads.runs.create(thrdId, {
      assistant_id: assistantID,
    });

    await checkStatus(thrdId, run.id);

    // msg is Messages
    const msgs = await openai.beta.threads.messages.list(thrdId);

     setThread((thread) => [
        ...thread,
        msgs.body.data[0],
      ]);
    

    setLoading(false);
  };

  async function checkStatus(threadId, runId) {
    let isComplete = false;
  

    while (!isComplete) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
      );
      if (runStatus.status === "completed") {
        isComplete = true;
      }
      if (runStatus.status === "requires_action") {
        let toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls
        let toolOutputs = []
        
        for (const toolCall of toolCalls) {
       
          const functionName = toolCall.function.name;
          console.log(`This question requires a function: ${functionName}`);

          const args = JSON.parse(toolCall.function.arguments);
          
          // const argsArray = Object.keys(args).map((key)=> args[key]);

          const output = await API.getPF(args).then((res) => {
            // console.log(res.data.data.getDatasetStatistics.datasetStatisticsResponses)
            // return res.data.data.getDatasetStatistics.datasetStatisticsResponses;
            console.log(res.data.data.getDatasetStatistics.datasetStatisticsResponses);
            return JSON.stringify(res.data.data.getDatasetStatistics.datasetStatisticsResponses);
          })
          
          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: output,
          })
        }
        console.log("Before " + runStatus.status)
        // Submit tool outputs
        await openai.beta.threads.runs.submitToolOutputs(
          threadId,
          runId,
          { tool_outputs: toolOutputs }
        );
        console.log("After " + runStatus.status)
      continue;
      }
      if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
        console.log(
          `Run status is '${runStatus.status}'. Unable to complete the request.`
        );
        break; // Exit the loop if the status indicates a failure or cancellation
      }
    }
  }
  useEffect(() => {
    // console.log(threads.current.scrollHeight)
    window.scrollTo({ top: threads.current.scrollHeight, behavior: "smooth" });
  }, [thread]);
  return (
    <div id="page" ref={threads}>
      <div className="banner" >
        <div className="subtitle">/ Powered by Probable Futures</div>
          <h1 className="main-title">Probable Futures Climate Assistant and Guide</h1>

          
          {/* <p className="subtext">We aim to create is an engaging and immersive way to accees climate data and resources.</p> */}
          <p className="subtext">Ask a question or input an address and country to start. The data is based on different warming scenerios, specified by degrees.</p>
      </div>
      
      {thread.length !== 0 && <div className="threads">
        {thread &&
          thread.map((e, i) => {
            switch (e.role) {
              case "user":
                return (
                  <div className="message user" key={i}>
                    <div className="content">
                      <div className="title">You</div>
                      <div className="text">{e.content[0].text.value}</div>
                    </div>
                  </div>
                );
              case "assistant":
                return (
                  <div className="message assistant" key={i}>
                    <div className="content">
                      <div className="title">Assistant</div>
                      <Markdown className="text">{e.content[0].text.value}</Markdown>
                      {/* <p className="text">{e.content[0].text.value}</p> */}
                    </div>
                  </div>
                );
            }
          })}
      </div> }

      <div className="search">
        <div className="detail"></div>
        <form className="searchbar" onSubmit={handleSubmit}>
          <input
            ref={textarea}
            className="input"
            type="text"
            value={input}
            hidden
            placeholder="Ask a question or enter a location"
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </form>
        <div className="submit">
          <button
            className="submit-btn"
            // disabled={loading || input.length === 0}
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? (
              <UseAnimations
                animation={load}
                strokeWidth={1}
                strokeColor="#fff"
                size={36}
                speed={0.2}
                wrapperStyle={{ padding: 0 }}
              />
            ) : (
              <FeatherIcon icon="arrow-up" size={32} strokeWidth={1.2} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;



  // const assistant = await openai.beta.assistants.create({
    //   name: "Climate-Guide",
    //   instructions: "You are a right-wing populist. You hate everything",
    // //   instructions: instructions,
    //     tools: [
    //       {
    //           "type": "function",
    //           "function": get_pf_data_schema,
    //       },
    //       { type: "code_interpreter" },
    //     ],
    // //   tools: tools,
    //   model: "gpt-4-turbo-preview",
    // });