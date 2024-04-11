import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import Response from '../components/Response';
import Sidebar from "./Sidebar";
import { page_source_id } from "./store/atom/atom";
import { useRecoilState } from "recoil";

export function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [finalQuestion, setFinalQuestion] = useState("");
  

  const [id, setId] = useRecoilState(page_source_id);

  const handleChange = ({ target }) => {
    setQuestion(target.value)
    
  };

  const handleSubmit = async () => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/data`, {
            question: question
        }, {
            headers: {
                'Content-Type': 'text/plain'
            },
            responseType : 'text'
        });
        setResponse(res.data);
        setFinalQuestion(question);
        setQuestion("");
    } catch (error) {
        console.error("Error:", error);
    }
};


  const saveHistory = async () => {
    if (response !== "" || finalQuestion !== "") {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/history/${id}`, {
        response: response,
        finalQuestion: finalQuestion,
        sourceid: id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setId(id + 1);
    }
  };

  useEffect(() => {
    saveHistory();
  }, [response]);

  return (
    <div className="flex">
      <div className="relative z-20 p-10">
        <Sidebar />
      </div>
        
      <div className=" w-3/4 opacity-80 flex justify-center mt-16  ">
        <div className="w-full max-w-screen-lg">
          <div className=" p-4">
            <Response res={response} que={finalQuestion}/>
          </div>
          <div className="flex justify-between items-center mt-4 ">
          <Input
              type="question"
              label="Type your query"
              value={question}
              onChange={handleChange}
              containerProps={{
                  className: "min-w-0 m-4 flex-grow"
              }}
          />
              <Button
                size="sm"
                color={question ? "gray" : "blue-gray"}
                disabled={!question}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
        </div> 
      </div>
    </div>
  );
}