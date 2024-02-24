
import { useState } from "react"
import './App.css';
import OpenAI from 'openai';

// PROBABLE FUTURES API KEY = FQCzxCCBAh0wih1Yx0DFqheeldF0T6FD
// PROBABLE FUTURES API PASSWORD = v6mbHDocvyWPM9pNYNBxvdZda1_yFq4DY_1QS5kVNWuGZGlDg4Lri89szt1KIe8W


const ChatbotApp = () => {
  
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true });
    const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

 

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // stream: true,
    messages: [{"role": "system", "content": "you are a helpful assistant"}, 
    { role: 'user', content: input }],
 
    
  // },{completionType: 'stream'});
  });


  // setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: completion.choices[0].message.content }]);
  console.log(completion.choices[0].message.content);
  setResponse(completion.choices[0].message.content);
  setInput('');
  // const completion = await openai.chat.completions.create({
  //   messages: [{"role": "system", "content": "You are a helpful assistant."},
  //       {"role": "user", "content": "Who won the world series in 2020?"},
  //       {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
  //       {"role": "user", "content": "Where was it played?"}],
  //   model: "gpt-3.5-turbo",
  // });



  // console.log(completion.choices[0]);


// const APIBody = {
//   messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
// }





//   await fetch("https://api.openai.com/v1/completions", {
//     method: 'POST',
//     headers: {
//       "Content-Type": 'application/json',
//       "authorization": 'Bearer ' + API_KEY
//     },
//     body: JSON.stringify(APIBody)
//   }).then((data)=> {
//     return data.json();
//   }).then((result)=> {
//     console.log(result);
//     // setApicompletion(result);
//   })

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
  



// API KEY OPEN AI - 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
// function App() {





//   return (
//     <div className="App">
//       <header className="App-header">
   
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
