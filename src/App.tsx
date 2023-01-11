import axios from "axios";
import React, { useState } from "react";
import { Button,Form, Card, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App:React.FC<{}> = ()=>{

  const [memeResponse, setmemeResponse] = useState({
    url:'',
    name:''
  })

  const handleSubmit = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://api.imgflip.com/get_memes",
    })
    .then((response) => {
      
      const position = Math.floor(Math.random() * 100) + 1;
      setmemeResponse(response.data.data.memes[position])
      console.log(memeResponse)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [memeResponse])

  React.useEffect(()=>{
    handleSubmit();
  },[])

  return(
    <div className="app">
      <div className="container">
      <h1 className="text-center mb-4">Meme Generator</h1>
       {memeResponse.url !== '' &&
       <div>
      
      <Card>
        <Card.Body>
        <Image className="img-fluid" style={{padding:'20px', marginLeft:'30%'}} src={memeResponse.url} height='500px' width='500px'></Image>
          <div style={{padding:'20px', marginLeft:'40%'}}>{memeResponse.name}</div> 
        </Card.Body>
      </Card>
      
      </div>}
      <Form>
       <Button className="btn btn-primary" type='button' onClick={handleSubmit}>Click for Data</Button>
      </Form>
      </div>
    </div>
  )
}

export default App