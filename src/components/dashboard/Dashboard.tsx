import {
    CornerDownLeft,
    Mic,
    Paperclip,
    Share,
} from "lucide-react"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {ModelSelector} from "@/components/models/ModelSelector.tsx";
import {useState} from "react";
import {EmbeddingModel} from "@/types/types.ts";

export function Dashboard() {
    const [model, setModel] = useState<EmbeddingModel|undefined>(undefined)
    const [modelComboOpen, setModelComboOpen] = useState(false)
    return (
        <div className="grid h-screen w-full pl-[53px]">
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                    <h1 className="text-xl font-semibold">Chroma Resource Calculator</h1>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                    >
                        <Share className="size-3.5"/>
                        Share
                    </Button>
                </header>
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className="relative hidden flex-col items-start gap-8 md:flex"
                    >
                        <form className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Settings
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Model</Label>


                                    <ModelSelector isOpen={modelComboOpen} onChange={(v) => {
                                        setModel(v)
                                    }} initialValue={model?.name} setIsOpen={setModelComboOpen}/>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="temperature">Number of vectors</Label>
                                    <Input id="temperature" type="number" placeholder="0.4"/>
                                </div>
                                <div className="grid gap-3">
                                        <Label htmlFor="top-p">Dimensionality</Label>
                                        <Input id="top-p" type="number" value={model?.dimensionality} disabled={true}/>
                                </div>
                            </fieldset>
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Messages
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <Select defaultValue="system">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="system">System</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="assistant">Assistant</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="You are a..."
                                        className="min-h-[9.5rem]"
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div
                        className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        <Badge variant="outline" className="absolute right-3 top-3">
                            Output
                        </Badge>
                        <div className="flex-1"/>
                        <form
                            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                            x-chunk="dashboard-03-chunk-1"
                        >
                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                            />
                            <div className="flex items-center p-3 pt-0">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Paperclip className="size-4"/>
                                            <span className="sr-only">Attach file</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Attach File</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Mic className="size-4"/>
                                            <span className="sr-only">Use Microphone</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Use Microphone</TooltipContent>
                                </Tooltip>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                    Send Message
                                    <CornerDownLeft className="size-3.5"/>
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}
