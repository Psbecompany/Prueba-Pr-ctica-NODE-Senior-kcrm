//PRIMEREACT
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "react-toastify/dist/ReactToastify.css";
import "primeicons/primeicons.css";
//PRIMEREACT
import { PrimeReactProvider } from "primereact/api";

import AppRoutes from "./routes/";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <PrimeReactProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppRoutes />
    </PrimeReactProvider>
  );
};

export default App;
