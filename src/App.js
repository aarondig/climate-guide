
import { useState } from "react"
import './App.css';
import OpenAI from 'openai';

// PROBABLE FUTURES API KEY = FQCzxCCBAh0wih1Yx0DFqheeldF0T6FD
// PROBABLE FUTURES API PASSWORD = v6mbHDocvyWPM9pNYNBxvdZda1_yFq4DY_1QS5kVNWuGZGlDg4Lri89szt1KIe8W


const ChatbotApp = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
    const [response, setResponse] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);


 

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "you are a helpful assistant"}, 
    { role: 'user', content: input }],

    stream: true,
  });
  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || "");
    setResponse(response => [...response, chunk.choices[0]?.delta?.content || ""])
}


  // console.log(stream.choices[0].message.content);
  // setResponse(stream.choices[0].message.content);
  setInput('');


  setLoading(false);
}







  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={input}
            placeholder="Please ask to openai"
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            disabled={loading || input.length === 0}
            type="submit"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {response && (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            boxSizing: "border-box",
            // height:'20vh',
            // background: "black",
          }}
        >
          <pre>
            <strong>API completion:</strong>
            {response}
          </pre>
        </div>
      )}
    </>
  );
};


export default ChatbotApp;
  