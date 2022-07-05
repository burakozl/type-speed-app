import './App.css';
import Words from './components/Words';
import Input from './components/Input';

function App() {
  return (
    <>
    <h1>Type Speed App</h1>
    <h2>Show them how fast you write!</h2>
      <div className="App-Container">
        <Words />
        <Input />
      </div>
    </>      
  );
}

export default App;
