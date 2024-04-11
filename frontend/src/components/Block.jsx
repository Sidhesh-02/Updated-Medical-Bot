import {useRecoilState} from 'recoil'
import { blockdatastate } from './store/atom/atom';

function Block() {
   const [blockdata, setblockdata] =  useRecoilState(blockdatastate)
 
  return (
        <>
          {Array.isArray(blockdata) ? blockdata.map((e, index) =>{
            return <div  key={index} role="button" tabIndex="0" className="hover:bg-blue-200 p-4 font-semibold rounded-lg">        
                  {console.log("History",e)}
                  <h5>{e.finalque} </h5>
                </div>      
          }
          ): null
          }
      </>
  )
}

export default Block
