import { Outlet } from "react-router-dom";
import AppSidebar from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import "./assets/fonts/Inter.ttf";

const App = () => {
  return (
    <div className="font-display">
      <SidebarProvider>
        <AppSidebar />
        <div className="h-dvh w-full flex flex-col">
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default App;
