import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditDataApi() {
    const [title, setTitle] = React.useState("")
    const [details, setDetails] = React.useState("")
    var { id } = useParams()
    var myNavigate = useNavigate()

    const getData = () => {
        axios.get(`https://akashsir.in/myapi/crud/todo-detail-api.php?todo_id=${id}`)
            .then(res => {
                setTitle(res.data.todo_title)
                setDetails(res.data.todo_details)
            })
            .catch(err => alert(err))
    }

    const updateData = () => {
        var myformdata = new FormData()
        myformdata.append("todo_id", id)
        myformdata.append("todo_title", title)
        myformdata.append("todo_details", details)
        
        axios.post("https://akashsir.in/myapi/crud/todo-update-api.php", myformdata)
            .then(res => {
                console.log("Update Response:", res.data);
                if (res.data.flag === '1') {
                    myNavigate('/display-api')
                } else {
                    alert("Technical Issue")
                }
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (<>
        <h1>Edit</h1>
        Title : <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        Details : <input type='text'value={details} onChange={(e)=>setDetails(e.target.value)}/>
        <input type='button' value="edit" onClick={()=>updateData()}/>
    </>);
}

export default EditDataApi;