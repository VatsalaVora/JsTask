import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
function AddDataApi() {
    const [title,setTitle] = React.useState("")
    const [details,setDetails] = React.useState("")
    var myNavigate = useNavigate()

    const addData = ()=> {
        var myformdata = new FormData()
        myformdata.append("todo_title",title)
        myformdata.append("todo_details",details)
        axios.post("https://akashsir.in/myapi/crud/todo-add-api.php",myformdata)
        .then(res => {
            if(res.data.flag==="1"){
                alert(res.data.message)
                myNavigate('/display-api')
            }else{
                alert("Technical Issue")
            }
        })
        .catch(err=>console.log(err))
    }
    return ( <>
        <br/>
        Title : <input type='text' onChange={(e)=>setTitle(e.target.value)}/>
        Details : <input type='text' onChange={(e)=>setDetails(e.target.value)}/>
        <input type='button' value="ADD" onClick={addData}/>
    </> );
}

export default AddDataApi;