import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import * as FileSaver from "file-saver";

export const Prompt = () => {
  const [prompt, setPrompt] = useState();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState(null);

  // open ai config
  const configuration = new Configuration({
    apiKey: "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", // Replace with your API key
  });

  // open ai instance
  const openai = new OpenAIApi(configuration);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const generateTemp = async () => {
    try {
      setIsLoading(true);
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `This is an xml file, i want to ${input} on this xml file. Do it and return the complete updated xml file. Do not return any other message other than the xml file. \n${fileContent}`,
          },
        ],
      });
      setPrompt(response.data.choices[0].message.content);

      // Save response to a file
      const blob = new Blob([response.data.choices[0].message.content], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, "AIxml.tdf");
    } catch (error) {
      setError("Error generating response. Please try again.");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 style={{fontFamily:"inter"}} >Gen-AI XML</h1>
        <h1 style={{fontStyle:"italic", color:"#505251"}} >Your TDF generating Partner!</h1>
      </div>
      <div className="container">
        <div className="input-container">
          <input
            className="file-field"
            type="file"
            onChange={handleFileChange}
            accept=".tdf"
          />
          <input
            className="input-field"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter your prompt..."
          />
          <button
            className="generate-button"
            onClick={generateTemp}
            disabled={!fileContent}
          >
            Generate
          </button>
        </div>
        {isLoading && <><h2>Generating Response, AI is tired today, please don't mind!</h2><div className="loader"></div></>}
        {error && <div className="error">{error}</div>}
        
        {prompt && (
          <div className="output-container">
            <h2 className="output-header">Gen-AI Output</h2>
            <h2 style={{ color: 'orangered' }}>Please open the downloaded file named AIxml.tdf to view the response!</h2>
          </div>
        )}
      </div>
    </>
  );
};
