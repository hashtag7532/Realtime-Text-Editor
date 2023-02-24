import React, { useState } from 'react'
import logo from "../SyncText-1 (1).png"
import Client from "../components/Client"
import Editor from '../components/Editor'

function EditorPage() {
  const [client, setClients] = useState([
    {socketId : 1, username : 'Parth D'},
    {socketId : 2, username : 'Shrey D'},
    {socketId : 3, username : 'Pushpendra'},
    {socketId : 4, username : 'Shruti D'},
])

  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img 
              className="logoImage" 
              src={logo} 
              alt='logo' 
              height={180}
            />
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
            {
              client.map((client) => ( 
                <Client 
                  key={client.socketId}
                  username={client.username}
                />  
            ))}
          </div>
        </div>
        <button className='btn copyBtn'>COPY ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage