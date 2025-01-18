
"use client"
import {useState , useEffect} from 'react' ;
import axios from "axios";
import Link from 'next/link';
import '../globals.css';
function Posts(){
  const[posts , setPosts] = useState([]) ;
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('http://localhost:3000/api/delete-user', {
        data: { id }, // Correctly pass the payload
      });
  
      if (response.data.success) {
        setPosts(posts.filter((post) => post.id !== id));
        alert('Record deleted successfully');
      } else {
        alert(response.data.message || 'Failed to delete record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('An error occurred while deleting');
    }
  };
  
  
  const fetchRecords = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/api/fetch");
      setPosts(response?.data?.result); 
      console.log(response?.data?.result)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(()=>{
    fetchRecords() 
  }, []) 

  return(
    <div>
      <div className='fixed-header'>
        <h1>STUDENT DETAILS CRUD APPLICATION</h1>
      <Link className='CreatePage' href = "posts/create">Create the Post</Link>
      </div>
      <div  className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>STANDARD</th>
            <th>AGE</th>
            <th>STATUS</th>
            <th>FEES</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          
          {
            posts?.map((post) =>{
              return(
                <tr key = {post.id}>
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.standard}</td>
                <td>{post.age}</td>
                <td>{post.status}</td>
                <td>{post.fees}</td>
                <td className='button-block'>
                  <Link href={`/posts/update/id=${post.id}`} className="update">Update</Link>
                  <button onClick={() => handleDelete(post.id)} className="delete">Delete</button>
                </td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>
      
      
    </div>
  )
}

export default Posts ;