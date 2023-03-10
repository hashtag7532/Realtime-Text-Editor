import React, { useRef, useState, useEffect } from 'react'
import ACTIONS from '../Actions'
import logo from "../SyncText-1 (1).png"
import Client from "../components/Client"
import Editor from '../components/Editor'
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();

  const [client, setClients] = useState([])
  
  const reactNavigator = useNavigate();

  useEffect(()=>{
    const init = async () => {
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', (err)=>handleErrors(err))
      socketRef.current.on('connect_failed', (err)=>handleErrors(err))

      function handleErrors(e) {
        console.log('socket error', e)
        toast.error('Socket connection failed, try again later');
        reactNavigator('/')
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username : location.state?.username,
      })

      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId })=>{
        if (username !== location.state?.username){
          toast.success(`${username} joined the room`)
          console.log(`${username} joined`)
        }
        setClients(clients)
      })
    }
    init();
  }, [])

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