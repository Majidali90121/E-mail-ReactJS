import { useState } from 'react'
import Data from './Data'
import './App.css'
function App(){
//===========React js==================    
  const [emails,setEmails]=useState(Data)
  const [search,setSearch]=useState("")
  const [compose,setCompose]=useState({sender : "",subject : "", message : ""})

  const filterEmails= emails.filter((email)=> email.subject.toLowerCase().includes(search.toLowerCase()))

  function toogleImportant(id){
    setEmails((prev)=>prev.map((email)=> email.id === id ? {...email,important:!email.important}:email))
  }

 function DeleteEmail(id){
  setEmails((prev)=>prev.filter((email)=>email.id!==id))
 }

 function handlecompose(){
  if(!compose.sender || !compose.subject || !compose.message){
    return
  }
  const newEmail = {
    id: Date.now(),
    ...compose,
    important : false,
  }
  setEmails([newEmail,...emails])
  setCompose({sender:"",subject:"",message:""})
 }
 // ======Html documents========
 return (
  <>
  <div className="app">
<aside className="sidebar">
  <h2>Email App</h2>
  <div>
    <input type="text"
    placeholder='search Emails'
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    />
  </div>
  <div className="compose">
    <h3>Compose</h3>
    <input type="text"
    placeholder='sender'
    value={compose.sender}
    onChange={(e)=>setCompose({...compose,sender:e.target.value})}
    />
    <input type="text" placeholder='Subject' value={compose.subject} onChange={(e)=>setCompose({...compose,subject:e.target.value})}/>
    <textarea placeholder='Message' style={{height:"200px"}} value={compose.message} onChange={(e)=>{setCompose({...compose,message:e.target.value})}}></textarea>
    <button onClick={handlecompose}>Send</button>
  </div>
</aside>
<main className='inbox'>
  <h2>Inbox</h2>
  {filterEmails.length ===0 ?
    (<p>
      No Email found.
    </p>):(
      filterEmails.map((email)=>(
        <div className="email-card" key={email.id}>
        <h4>{email.subject}{"  "}
          <span className="star" onClick={()=>toogleImportant(email.id)} title="Mark Important">
            {email.important ? "⭐":"☆"}
          </span>
        </h4>
        <p><strong>Form : </strong>{email.sender}</p>
        <p>{email.message}</p>
        <button onClick={()=>DeleteEmail(email.id)}>Delete mail</button>
        </div>
      ))
    )
}
</main>
  </div>
  </>
 )
}
export default App