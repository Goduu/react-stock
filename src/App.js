import React from 'react';
import './App.css';
import ShowRoom from './components/ShowRoom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)


function App() {



  return (
    <div className="App">
          <ShowRoom active={false}></ShowRoom>
    </div>
  );
}

export default App;