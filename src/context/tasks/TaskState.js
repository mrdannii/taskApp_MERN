//import { useState } from 'react';
import taskContext from './taskContext';

const TaskState=(props)=>{
   
    
    return(
        <taskContext.Provider value={{}}>
            {props.children}

        </taskContext.Provider>
    )

}

export default TaskState;