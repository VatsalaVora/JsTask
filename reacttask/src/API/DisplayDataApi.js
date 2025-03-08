import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
function DisplayDataApi() {

    const [data,setData] = React.useState([])

    React.useEffect(()=>{
        getData()
    })

    const getData = () =>{
        axios.get("https://akashsir.in/myapi/crud/todo-list-api.php")
        .then(res=>{
            setData(res.data.todo_list)
        })
        .catch(err=>alert(err))
    }

    const deleteData = (id) =>{
        var myformdata = new FormData()
        myformdata.append("todo_id",id)
        axios.post("https://akashsir.in/myapi/crud/todo-delete-api.php",myformdata)
        .then(res=>{
            getData()
        })
        .catch(err=>alert(err))
    }

    return ( <>
        <h1>Display</h1>
        <table border={1}>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Details</th>
                <th>Actions</th>
            </tr>
            {data.map((value,index)=>{
                var id = value.todo_id
                var eid = "/edit-api/" + value.todo_id;

                return(<tr>

                    <td>{value.todo_id}</td>
                    <td>{value.todo_title}</td>
                    <td>{value.todo_details}</td>
                    <td><Link to={eid}>Edit</Link>
                    <input type='button' value="x" onClick={()=>deleteData(id)}/></td>
                </tr>)
            })}
        </table>
    </> );
}

export default DisplayDataApi;