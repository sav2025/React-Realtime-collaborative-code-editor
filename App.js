
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCode, setUsers } from './store';

const socket = new WebSocket('wss://your-api.com/collaboration');  // Replace with your WebSocket server URL

function App() {
  const dispatch = useDispatch();
  const { code, users } = useSelector((state) => state);
  
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'codeUpdate') {
        dispatch(setCode(data.code));
      } else if (data.type === 'userUpdate') {
        dispatch(setUsers(data.users));
      }
    };

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'joinRoom', userName }));
    };

    return () => {
      socket.close();
    };
  }, [dispatch, userName]);

  const handleCodeChange = (newCode) => {
    dispatch(setCode(newCode));
    socket.send(JSON.stringify({ type: 'codeUpdate', code: newCode }));
  };

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        placeholder="Start coding..."
      />
      <div>
        <h3>Users in this session:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
