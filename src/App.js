import { Outlet } from "react-router-dom";
import { Footer, Header, Toast } from "./components";


function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Toast />
      <div className='flex-grow text-center'>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}

export default App;
