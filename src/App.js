import { Navigate, Route, Routes } from 'react-router';

import ItemsSelected from './pages/ItemsSelected';
import Items from './pages/Items';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path='items' element={<Items/>}/>
            <Route path='selected' element={<ItemsSelected/>}/>
            <Route path='*' element={<Navigate to={"items"}/>}/>
        </Routes>
    </div>
  );
}

export default App;
