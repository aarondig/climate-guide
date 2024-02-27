import { useState, useEffect } from "react";
import "./App.css";
import OpenAI from "openai";
// import {getPFData} from './apis/probablefutures';

// PROBABLE FUTURES API KEY = FQCzxCCBAh0wih1Yx0DFqheeldF0T6FD
// PROBABLE FUTURES API PASSWORD = v6mbHDocvyWPM9pNYNBxvdZda1_yFq4DY_1QS5kVNWuGZGlDg4Lri89szt1KIe8W

import API from "../src/utils/API";
import Assistant from "./apis/openai";

const ChatbotApp = () => {
  // const [address, setAddress] = useState("");
  // const [country, setCountry] = useState();

  // const handleclick = () => {
  //   // console.log(API.getData())

  //   API.getData({ address, country }).then((res) => {
  //     // console.log(res.data.getDataStatistics.getDataStatistics);
  //     // console.log(res.data.data.getDatasetStatistics.datasetStatisticsResponses);
  //   });
  // };

  // const openai = new OpenAI({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  //   dangerouslyAllowBrowser: true,
  // });

  // const [response, setResponse] = useState([]);
  // const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false);

  // // const handleSubmit = async (e) => {
  // //   e.preventDefault();
  // //   setLoading(true);

  // //   const stream = await openai.chat.completions.create({
  // //     model: "gpt-3.5-turbo",
  // //     messages: [
  // //       { role: "system", content: "you are a helpful assistant" },
  // //       { role: "user", content: input },
  // //     ],

  // //     stream: true,
  // //   });
  // //   for await (const chunk of stream) {
  // //     console.log(chunk.choices[0]?.delta?.content || "");
  // //     setResponse((response) => [
  // //       ...response,
  // //       chunk.choices[0]?.delta?.content || "",
  // //     ]);
  // //   }

  // //   setInput("");
  // //   setLoading(false);
  // // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const stream = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "system", content: "you are a helpful assistant" },
  //       { role: "user", content: input },
  //     ],

  //     stream: true,
  //   });
  //   for await (const chunk of stream) {
  //     console.log(chunk.choices[0]?.delta?.content || "");
  //     setResponse((response) => [
  //       ...response,
  //       chunk.choices[0]?.delta?.content || "",
  //     ]);
  //   }

  //   setInput("");
  //   setLoading(false);
  // };



  return (
    <main id="app">
    <Assistant/>
    </main>
    // <>
    //  <div className="testbox"
    //  style={{
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   width: "100%",
    //   whiteSpace: "wrap",

    // }}>
    //     <pre style={{
    //   width: "80%",
    //   padding: "20px",
    //   whiteSpace: "wrap",
      
    // }}>
    //         <strong>API completion:</strong>
    //         {response} <br/>
    //       </pre>
    //       </div>
    //   <div
    //     style={{
    //       position: "absolute",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       height: "100%",
    //       width: "100%",
    //     }}
    //   >
       
    //     {/* <button onClick={()=>getPFData()}>HIT ME</button> */}
    //     <textarea
    //       type="text"
    //       value={country}
    //       placeholder="Country"
    //       onChange={(e) => setCountry(e.target.value)}
    //     ></textarea>
    //     <button onClick={() => handleclick()}>HIT ME</button>

    //     <form onSubmit={handleSubmit}>
    //       {/* <form onSubmit={getPfData()}> */}
    //       <textarea
    //         type="text"
    //         value={input}
    //         placeholder="Please ask to openai"
    //         onChange={(e) => setInput(e.target.value)}
    //       ></textarea>
    //       <button disabled={loading || input.length === 0} type="submit">
    //         {loading ? "Generating..." : "Generate"}
    //       </button>
    //     </form>
    //   </div>
    //   {response && (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "left",
    //         boxSizing: "border-box",
    //         // height:'20vh',
    //         // background: "black",
    //       }}
    //     >
          
    //     </div>
    //   )}
    // </>
  );
};

export default ChatbotApp;
