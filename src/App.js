import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <ToastContainer position="bottom-right"
                      autoClose={2000}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover={false}
                      theme={"colored"} />
      <RoutesApp />
    </div>
  );
}

export default App;
