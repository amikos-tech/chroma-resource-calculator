"use client"

import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {EmbeddingModel} from "@/types/types.ts";

const models: EmbeddingModel[] = [
    {
        name:"bert-base-uncased",
        vendor:"huggingface",
        dimensionality: 384,
        contextSize: 256,
        id: "hf-bert-base-uncased-384",
        description: "A BERT model pre-trained on English text.",
        architecture: "Transformer",
    },
    {
        name: "Embed-english-v3.0",
        vendor: "Cohere",
        dimensionality: 1024,
        contextSize: 512,
        id: "embed-english-v3.0",
        version: "3.0",
        tokenizer: "Cohere tokenizer",
        description: "General purpose English language embedding model",
        variableDimensionality: false,
        architecture: "Transformer"
    },
    {
        name: "Embed-english-light-v3.0",
        vendor: "Cohere",
        dimensionality: 384,
        contextSize: 512,
        id: "embed-english-light-v3.0",
        version: "3.0",
        tokenizer: "Cohere tokenizer",
        description: "Lighter version of the English language embedding model",
        variableDimensionality: false,
        architecture: "Transformer"
    },
    {
        name: "Embed-multilingual-v3.0",
        vendor: "Cohere",
        dimensionality: 1024,
        contextSize: 512,
        id: "embed-multilingual-v3.0",
        version: "3.0",
        tokenizer: "Cohere multilingual tokenizer",
        description: "Multilingual embedding model supporting 100+ languages",
        variableDimensionality: false,
        architecture: "Transformer"
    },
    {
        name: "text-embedding-ada-002",
        vendor: "OpenAI",
        dimensionality: 1536,
        contextSize: 8191,
        id: "text-embedding-ada-002",
        version: "002",
        tokenizer: "GPT-3 tokenizer",
        description: "General purpose embedding model for text",
        variableDimensionality: false,
        architecture: "Transformer"
    },
]

interface ModelSelectorProps {
    initialValue?: string
    onChange: (model: EmbeddingModel) => void
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

export function ModelSelector({ initialValue="", onChange, isOpen, setIsOpen }: ModelSelectorProps) {
    const [value,setValue] = useState(initialValue)
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className="w-[200px] justify-between"
                    onClick={() => setIsOpen(true)}
                >
                    {value ? value : "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Select model..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No model selected.</CommandEmpty>
                        <CommandGroup>
                            {models.map((model) => (
                                <CommandItem
                                    key={model.id}
                                    value={model.name}
                                    onSelect={() => {
                                        onChange(model)
                                        setValue(model.name)
                                        setIsOpen(false)
                                    }}
                                >
                                    {model.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === model.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
