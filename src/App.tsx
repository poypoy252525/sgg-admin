import { Outlet } from "react-router-dom";
import AppSidebar from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

const App = () => {
  return (
    <div className="font-display overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default App;
