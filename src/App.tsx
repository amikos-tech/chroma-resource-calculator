import './App.css'
import {Dashboard} from "@/components/dashboard/Dashboard.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import { ThemeProvider } from './components/theme-provider';

function App() {

    return (
        <>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <TooltipProvider>
                <Dashboard/>
            </TooltipProvider>
            </ThemeProvider>
        </>
    )
}

export default App
