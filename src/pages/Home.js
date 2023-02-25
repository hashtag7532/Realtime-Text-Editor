import React, { useState } from 'react'
import logo from "../SyncText-1 (1).png"
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4(); 
    setRoomId(id)
    toast.success('Created a new room')
  }

  const joinRoom =() => {
    if (!roomId || !username){
      toast.error('ROOM ID and Username is required!')
      return;
    }

    //Redirect
    navigate(`/editor/${roomId}`,{
      state : {
        username,
      },
    }
    )
  }

  const handleInputEnter = (e) => {
    if (e.code === 'Enter'){
      joinRoom()
    }
  }

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img src={logo} className='homePageLogo' />
        <h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
        <div className='inputGroup'>
          <input 
            type="text" 
            className='inputBox' 
            placeholder='ROOM ID'
            onChange={(e)=> setRoomId(e.target.value)} 
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input 
            type="text" 
            className='inputBox' 
            placeholder='USERNAME' 
            onChange={(e)=> setUsername(e.target.value)} 
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className='btn joinBtn' onClick={joinRoom}>Join</button>
          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a href='' onClick={createNewRoom} className='createNewBtn'>
              NEW ROOM
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 🧡 by &nbsp;
          <a href='https://github.com/hashtag7532' >Parth Dodia</a> 
        </h4>
      </footer>
    </div>
  )
}

export default Home