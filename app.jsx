import React,  { memo, useMemo, useState } from 'react';
import ReactDom from 'react-dom/client';
import "./css.css";
import SPLoader from './spinnerLoader';


const API_KEY= import.meta.env.VITE_OPENAI_API_KEY;
console.log("Loaded key:", import.meta.env.VITE_OPENAI_API_KEY );


function Search () {
    const [question, setQuestion] = useState("");///question for api
    const [info,setInfo]=useState("");///info from api
    const [error,setError]=useState(null);
    const {pros,cons}=useMemo(() => {
      
      const pros = [];
      const cons = [];

      if(!info)return {pros,cons};
      const lowerInfo = info.toLowerCase();
      const prosIndex=lowerInfo.indexOf("pros:");
      const consIndex=lowerInfo.indexOf("cons:");
  
     if (prosIndex !== -1 && consIndex !==-1){
      const prosText=info.slice(prosIndex+5,consIndex).trim();
      const consText=info.slice(consIndex+5).trim();

      pros.push(...prosText.split(/(?=\d+\.)/));
      cons.push(...consText.split(/(?=\d+\.)/));

     }
      
    return {pros,cons};
    },[info]);




async function callOpenAIAPI(){
  console.log("calling open AI");

  //-H "Content-Type: application/json" \
  //-H "Authorization: Bearer $OPENAI_API_KEY" \


  if(!question.trim()) {
    setError("Please  enter a fighter name. ");
    return;
  }

  setError(null);


          const APIBody = {
              "model": "gpt-3.5-turbo",
              "messages": [
                  {
                  "role": "user",
                  "content": "Analyze the pros and cons"+ 
                  question

              }
           ],
                  "temperature": 0.8,
                  "max_tokens": 1024
                 };


    await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
        body: JSON.stringify(APIBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
             console.log(data);
             setInfo(data.choices[0].message.content.trim());
            });

          }
          
      console.log(question);
        return (
            <div className='App'>
                <div>
                  <textarea className='searchBox'
                    placeholder='Search'
                    cols={100}
                    rows={10}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />

              {error &&(
                <div style={{color:"red",fontWeight:"bolder",marginTop:"10px"}}>
                {error}
                </div>
              )}

            </div>
                 <div style={{textAlign:"center",marginTop:"80px",color:"red"}}>
                    <button className="searchButton" onClick={callOpenAIAPI}>
                      SEARCH!
                  </button>
                 </div>

                        <div className="Heading">Fighter Info </div>
                          <div className="info-text">
                          
                            <h3 style={{fonrWeight:"bold", textDecoration:"underline"}}>Pros</h3>
                              <ul>
                                  {pros.map((p,i)=>(
                                  <li key={i}>{p.trim()}</li>
                                  ))}
                              </ul>

                            <h3 style={{fontWeight:"bold",textDecoration:"underline"}}>Cons</h3>
                                <ul>
                                    {cons.map((c,i)=>(
                                      <li key={i}>{c.trim()}</li>
                                    ))}
                                </ul>


                          </div>
                        </div>

           
        );

      }
      

export default Search;