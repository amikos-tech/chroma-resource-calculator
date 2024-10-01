import './App.css'
import {Dashboard} from "@/components/dashboard/Dashboard.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

function App() {

    return (
        <>
            <TooltipProvider>
                <Dashboard/>
            </TooltipProvider>
        </>
    )
}

export default App
