import React, {useState} from 'react';
import Amplify, {Auth, Storage} from 'aws-amplify';
import './App.css';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(awsconfig);

function uploadFile(e) {
  const file = e.target.files[0];
  Storage.put(file.name, file, {
      level: 'private',
      contentType: 'image/png'
  })
  .then (result => console.log(result))
  .catch(err => console.log(err));
}

function App() {
  const [userid, setUserId] = useState();
  const [username, setUsername] = useState();

  Auth.currentAuthenticatedUser()
    .then(user => {
      console.log(user);
      setUsername(user.username);
      setUserId(user.pool.storage['aws.cognito.identity-id.eu-west-1:ec89a3de-cddc-4396-8557-79e4b84ffeb2']);
    })
    .catch(err => console.log(err))

  return (
    <div className="App">
      <header className="App-header">
        <p>UserID: {userid}<br />Username: {username}</p>
        <input type="file" accept="image/png" onChange={uploadFile} />
      </header>
    </div>
  );
}

export default withAuthenticator(App, false);