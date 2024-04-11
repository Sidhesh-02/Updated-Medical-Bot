import React from 'react'
import {useState ,useEffect } from 'react';
import {useRecoilState} from 'recoil'
import { blockdatastate } from './store/atom/atom';
import { isactive } from './store/atom/atom';

function Response({res, que}) {
  const [arr,setArr] = useState([]);
  
  const [blockdata, setblockdata] =  useRecoilState(blockdatastate)
  const [isstateactive,setIsActive] = useRecoilState(isactive)
  useEffect(()=>{
    if (que !== "" && res !== "") {
      setArr(prevArr => [...prevArr, { que, res }]);
    }
    setIsActive(true);

  },[que,res])

  return (
    <div className=" bg-white opacity-80 font-semibold rounded-lg p-10 w-full" >

      {isstateactive? 
          arr && arr.map((e, index)=>{
              return <div key={index}>
                {e.que && <p>{e.que}</p>} <br/>
                {e.res && <p>{e.res}</p>}<br/>
              </div>  
         })
     
      :
           blockdata.map((e , index) =>{
                return<div key={index}>
                  {console.log(e)}
                  <h3>{e.finalque}</h3><br></br>
                  <h5>{e.response} </h5><br></br>
              </div>
            })
     
      }
 
    </div>
  )
}

export default Response;
