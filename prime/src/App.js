import RoutesApp from "./routes";
import { ToastContainer } from 'react-toastify';//alerta
import 'react-toastify/dist/ReactToastify.css';//alerta

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>
    </div>
  );
}

export default App;
