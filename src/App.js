import {useState, useEffect } from 'react'

const App = ()=>{
  const [message, setMessage] = useState(null)
  const [value, setValue] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = ()=>{
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle)=>{
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const getMessages = async ()=>{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'message': value
      })
    }
    try{
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
      // console.log(data)
    }catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: 'user',
            content: value
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
    }
  }, [message, currentTitle])

    console.log(previousChats)

    const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
    
    return (
      <div className="app">
        
        <section className="sidebar">
          <button onClick={createNewChat}>+ New Chat</button>
          <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) =><li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
          </ul>
          <nav>
            <p>Made by Varun</p>
          </nav>
        </section>
        
        <section className="main">
          {!currentTitle && <h1>My_GPT</h1>}
          <ul className="feed">
            {currentChat?.map((chatMessage, index)=><li key={index}>
              <p className='role'>{chatMessage.role}</p>  
              <p>{chatMessage.content}</p>  
            </li>)}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <textarea className="input" rows={1} cols={20} wrap='soft' value={value} onChange={(e)=>setValue(e.target.value)}></textarea>
              <div id="submit" onClick={getMessages}>&#10146;</div>
            </div>
            <p className="info">Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 3 Version</p>
          </div>
        </section>
      </div>
    );
  }
  
  

export default App;