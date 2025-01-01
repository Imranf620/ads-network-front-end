import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Domains = lazy(() => import("./pages/domains/Domains"));
const ButtonDomain = lazy(() => import("./pages/advertisers/ButtonDomain"));
const Auth = lazy(() => import("./pages/auth/Auth"));


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>      
        <Route path="/domains" element={<Domains />} /> //only admin accessible routes
        <Route path="/monitizers" element={<ButtonDomain />} />   //only monitizers accessible routes      
        <Route path="/auth" element={<Auth/>}/> //only auth accessible routes
      </Routes>

    </>
  );
};

export default App;
