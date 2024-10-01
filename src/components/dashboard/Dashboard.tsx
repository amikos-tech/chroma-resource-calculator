import {Calendar, CircleDollarSign, Cpu, HardDrive, Info, MemoryStick, Percent, Share,} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

import {ModelSelector} from "@/components/models/ModelSelector.tsx";
import {ChangeEvent, useState} from "react";
import {
    calculateCPU,
    calculateMemoryUsage,
    CalculationMetrics,
    CalculationMode,
    EmbeddingModel,
    GrowthPeriod
} from "@/types/types.ts";
import {Badge} from "../ui/badge";
import {Slider} from "@/components/ui/slider.tsx";
import {cn} from "@/lib/utils.ts";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function Dashboard() {
    const [model, setModel] = useState<EmbeddingModel | undefined>(undefined)
    const [modelComboOpen, setModelComboOpen] = useState(false)
    const [calculationMetrics, setCalculationMetrics] = useState({
        vectorCount: 1000,
        dimensionality: 384,
        systemMemoryOverhead: 25,
        vectorSize: 4,
        hnsw_m: 16,
        hnsw_ef: 10,
        hnsw_ef_construction: 100,
        documentCount: 1,
        pagesPerDocument: 1,
        wordsPerPage: 400,
        chunkOverlap: 10,
        calculationMode: CalculationMode.DOCUMENT,
        metadataFieldCount: 1,
        growthFactor: 20,
        growthPeriod: GrowthPeriod.MONTHLY,
    } as CalculationMetrics);
    return (
        <div
            className="grid h-screen w-full pl-[53px] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
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
                    <ModeToggle/>
                </header>
                <main
                    className="grid gap-4 overflow-auto lg:grid-cols-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                    <div
                        className="relative hidden flex-col items-start gap-8 md:flex"
                    >
                        <form className="grid w-full gap-6 lg:grid-cols-2 items-start md-2 pt-4">
                            <fieldset
                                className="grid gap-6 rounded-lg border p-4 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    General Settings
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Model</Label>
                                    <ModelSelector isOpen={modelComboOpen} onChange={(v) => {
                                        setModel(v)
                                        setCalculationMetrics({
                                            ...calculationMetrics,
                                            dimensionality: v.dimensionality
                                        })
                                    }} initialValue={model?.name} setIsOpen={setModelComboOpen}/>
                                </div>
                                <Tabs defaultValue="documents" className="w-[100%]" onValueChange={(value) => {
                                    setCalculationMetrics({
                                        ...calculationMetrics,
                                        calculationMode: value as CalculationMode
                                    })
                                }}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="documents">Documents</TabsTrigger>
                                        <TabsTrigger value="vectors">Vectors</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="documents">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Documents</CardTitle>
                                                <CardDescription>
                                                    Make your estimates based on documents you'd like to store in
                                                    Chroma.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="space-y-1">
                                                    <Label htmlFor="numDocs">Number of documents</Label>
                                                    <Input id="numDocs" type="number"
                                                           defaultValue={calculationMetrics.documentCount}
                                                           onChange={(e) => {
                                                               setCalculationMetrics({
                                                                   ...calculationMetrics,
                                                                   documentCount: parseInt(e.target.value)
                                                               })
                                                           }}/>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="pagesPerDocument">Pages per document</Label>
                                                    <Input id="pagesPerDocument" type="number"
                                                           defaultValue={calculationMetrics.pagesPerDocument}
                                                           onChange={(e) => {
                                                               setCalculationMetrics({
                                                                   ...calculationMetrics,
                                                                   pagesPerDocument: parseInt(e.target.value)
                                                               })
                                                           }}/>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="chunkOverlap" className="flex items-center">Chunk
                                                        overlap (<Percent className="w-4 h-4"
                                                                          absoluteStrokeWidth/>) <Info
                                                            className="h-3.5 w-3.5 ml-1"/></Label>
                                                    <Input id="chunkOverlap" type="number"
                                                           defaultValue={calculationMetrics.chunkOverlap}
                                                           onChange={(e) => {
                                                               setCalculationMetrics({
                                                                   ...calculationMetrics,
                                                                   chunkOverlap: parseInt(e.target.value)
                                                               })
                                                           }}/>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="wordsPerPage" className="flex items-center">Words
                                                        Per Page <Info className="h-3.5 w-3.5 ml-1"/></Label>
                                                    <Input id="wordsPerPage" type="number"
                                                           defaultValue={calculationMetrics.wordsPerPage}
                                                           onChange={(e) => {
                                                               setCalculationMetrics({
                                                                   ...calculationMetrics,
                                                                   wordsPerPage: parseInt(e.target.value)
                                                               })
                                                           }}/>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="vectors">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Number of vectors</CardTitle>
                                                <CardDescription>
                                                    Provide the number of vectors you expect to store in Chroma.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="grid gap-3">
                                                    <Input id="numVectors" type="number"
                                                           value={calculationMetrics.vectorCount}
                                                           onChange={(v) => {
                                                               setCalculationMetrics({
                                                                   ...calculationMetrics,
                                                                   vectorCount: parseInt(v.target.value)
                                                               })
                                                           }}/>
                                                    <Slider
                                                        onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                                            setCalculationMetrics({
                                                                ...calculationMetrics,
                                                                vectorCount: parseInt(v.target.value)
                                                            })
                                                        }}
                                                        defaultValue={[calculationMetrics.vectorCount]}
                                                        max={1000000}
                                                        step={10000}
                                                        min={0}
                                                        className={cn("w-[100%]")}
                                                    />
                                                </div>
                                            </CardContent>

                                        </Card>
                                    </TabsContent>
                                </Tabs>

                                <div className="grid gap-3">
                                    <Label htmlFor="dimensionality" className="items-center flex">Dimensionality <Info
                                        className="h-3.5 w-3.5 ml-1"/></Label>
                                    <Input id="dimensionality" type="number" value={calculationMetrics.dimensionality}
                                           disabled={true}/>
                                </div>
                                <div className={"grid gap-3"}>
                                    <Label htmlFor="memoryoverhead" className="items-center flex">System Memory
                                        Overhead (<Percent className="w-4 h-4"
                                                           absoluteStrokeWidth/>)
                                        <Info className="h-3.5 w-3.5 ml-1"/></Label>
                                    <Input id="memoryoverhead" type="number"
                                           value={calculationMetrics.systemMemoryOverhead}
                                           onChange={(v) => {
                                               setCalculationMetrics({
                                                   ...calculationMetrics,
                                                   systemMemoryOverhead: parseInt(v.target.value)
                                               })
                                           }}
                                    />
                                    <Slider
                                        onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                            setCalculationMetrics({
                                                ...calculationMetrics,
                                                systemMemoryOverhead: parseInt(v.target.value)
                                            })
                                        }}
                                        defaultValue={[calculationMetrics.systemMemoryOverhead]}
                                        max={100}
                                        step={25}
                                        min={25}
                                        className={cn("w-[100%]")}
                                    />
                                    <div></div>
                                </div>
                            </fieldset>

                            <div>
                                <fieldset
                                    className="grid gap-6 rounded-lg border p-4 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Metadata Settings
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="m" className="items-center flex">Number of Metadata Fields <Info
                                            className="h-3.5 w-3.5 ml-1"/></Label>
                                        <Input id="m" type="number" value={calculationMetrics.metadataFieldCount}
                                               onChange={(v) => {
                                                   setCalculationMetrics({
                                                       ...calculationMetrics,
                                                       metadataFieldCount: parseInt(v.target.value)
                                                   })
                                               }}
                                        />
                                        <Slider
                                            onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                                setCalculationMetrics({
                                                    ...calculationMetrics,
                                                    metadataFieldCount: parseInt(v.target.value)
                                                })
                                            }}
                                            // 16,32,64,128,256,512,1024
                                            defaultValue={[calculationMetrics.metadataFieldCount]}
                                            max={20}
                                            step={1}
                                            min={1}
                                            className={cn("w-[100%]")}
                                        />
                                    </div>
                                </fieldset>
                                <fieldset
                                    className="grid gap-6 rounded-lg border p-4 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        HNSW Settings
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="m" className="items-center flex">M <Info
                                            className="h-3.5 w-3.5 ml-1"/></Label>
                                        <Input id="m" type="number" value={calculationMetrics.hnsw_m}
                                               onChange={(v) => {
                                                   setCalculationMetrics({
                                                       ...calculationMetrics,
                                                       hnsw_m: parseInt(v.target.value)
                                                   })
                                               }}
                                        />
                                        <Slider
                                            onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                                setCalculationMetrics({
                                                    ...calculationMetrics,
                                                    hnsw_m: parseInt(v.target.value)
                                                })
                                            }}
                                            // 16,32,64,128,256,512,1024
                                            defaultValue={[calculationMetrics.hnsw_m]}
                                            max={1024}
                                            step={32}
                                            min={16}
                                            className={cn("w-[100%]")}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="ef_construction" className="items-center flex">EF
                                            Construction <Info
                                                className="h-3.5 w-3.5 ml-1"/></Label>
                                        <Input id="ef_construction" type="number"
                                               value={calculationMetrics.hnsw_ef_construction}
                                               onChange={(v) => {
                                                   setCalculationMetrics({
                                                       ...calculationMetrics,
                                                       hnsw_ef_construction: parseInt(v.target.value)
                                                   })
                                               }}
                                        />
                                        <Slider
                                            onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                                setCalculationMetrics({
                                                    ...calculationMetrics,
                                                    hnsw_ef_construction: parseInt(v.target.value)
                                                })
                                            }}
                                            // 16,32,64,128,256,512,1024
                                            defaultValue={[calculationMetrics.hnsw_ef_construction]}
                                            max={1000}
                                            step={100}
                                            min={100}
                                            className={cn("w-[100%]")}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="ef_search" className="items-center flex">EF Search <Info
                                            className="h-3.5 w-3.5 ml-1"/></Label>
                                        <Input id="ef_search" type="number" value={calculationMetrics.hnsw_ef}
                                               onChange={(v) => {
                                                   setCalculationMetrics({
                                                       ...calculationMetrics,
                                                       hnsw_ef: parseInt(v.target.value)
                                                   })
                                               }}
                                        />
                                        <Slider
                                            onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                                setCalculationMetrics({
                                                    ...calculationMetrics,
                                                    hnsw_ef: parseInt(v.target.value)
                                                })
                                            }}
                                            // 16,32,64,128,256,512,1024
                                            defaultValue={[calculationMetrics.hnsw_ef]}
                                            max={500}
                                            step={10}
                                            min={10}
                                            className={cn("w-[100%]")}
                                        />
                                    </div>
                                </fieldset>
                                <fieldset
                                    className="grid gap-6 rounded-lg border p-4 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        System Growth
                                    </legend>
                                    <div className={"grid gap-3"}>
                                        <Label htmlFor="systemGrowthFactor" className="items-center flex">Growth
                                            Factor (<Percent className="w-4 h-4"
                                                             absoluteStrokeWidth/>)
                                            <Info className="h-3.5 w-3.5 ml-1"/></Label>
                                        <Input id="systemGrowthFactor" type="number"
                                               value={calculationMetrics.growthFactor}
                                               onChange={(v) => {
                                                   setCalculationMetrics({
                                                       ...calculationMetrics,
                                                       growthFactor: parseInt(v.target.value)
                                                   })
                                               }}
                                        />
                                        <Slider
                                            onChange={(v: ChangeEvent<HTMLInputElement>) => {
                                                setCalculationMetrics({
                                                    ...calculationMetrics,
                                                    growthFactor: parseInt(v.target.value)
                                                })
                                            }}
                                            defaultValue={[calculationMetrics.growthFactor]}
                                            max={100}
                                            step={25}
                                            min={25}
                                            className={cn("w-[100%]")}
                                        />
                                    </div>

                                    <div className={"grid gap-3"}>
                                        <Label className="items-center flex">Growth
                                            Period (<Calendar className="w-4 h-4"
                                                              absoluteStrokeWidth/>)
                                            <Info className="h-3.5 w-3.5 ml-1"/></Label>
                                        <Select onValueChange={(value) => {
                                            setCalculationMetrics({
                                                ...calculationMetrics,
                                                growthPeriod: value as GrowthPeriod
                                            })
                                        }}
                                        defaultValue={calculationMetrics.growthPeriod}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a growth period"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Growth Period</SelectLabel>
                                                    {Object.values(GrowthPeriod).map((value) => (
                                                        <SelectItem key={value} value={value}>
                                                            {value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                    <div
                        className="flex h-full flex-col rounded-xl bg-muted/50 p-1">
                        <Card className="w-[100%]">
                            <CardHeader>Baseline Hardware Estimate</CardHeader>
                            <CardDescription className="md-3">These are the your baseline hardware
                                requirements.</CardDescription>
                            <CardContent>
                                <div className="grid grid-cols-2 items-center md-2">
                                    <Label className="flex mr-2"><MemoryStick absoluteStrokeWidth
                                                                              className="w-4 h-4 mr-1"/> Memory</Label>
                                    <div><Badge
                                        variant={"outline"}>{calculateMemoryUsage(calculationMetrics).toFixed(2)} GB</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center md-2">
                                    <Label className="flex mr-2"><Cpu absoluteStrokeWidth
                                                                      className="w-4 h-4 mr-1"/>CPU <Info
                                        className="h-3.5 w-3.5 ml-1"/></Label>
                                    <div><Badge variant={"outline"}>{calculateCPU(calculationMetrics)} vCPU</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <Label className="flex mr-2"><HardDrive absoluteStrokeWidth
                                                                            className="w-4 h-4 mr-1"/>Storage</Label>
                                    <div><Badge variant={"outline"}>200 GB</Badge></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-[100%]">
                            <CardHeader>AWS Estimate</CardHeader>
                            <CardDescription className="md-3">AWS instance type and cost estimates.</CardDescription>
                            <CardContent>
                                <div className="grid grid-cols-2 items-center md-2">
                                    <Label className="flex mr-2"><MemoryStick absoluteStrokeWidth
                                                                              className="w-4 h-4 mr-1"/>Instance
                                        Type</Label>
                                    <div><Badge
                                        variant={"outline"}>t4g.nano</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center md-2">
                                    <Label className="flex mr-2"><MemoryStick absoluteStrokeWidth
                                                                              className="w-4 h-4 mr-1"/> Memory</Label>
                                    <div><Badge
                                        variant={"outline"}>{calculateMemoryUsage(calculationMetrics).toFixed(2)} GB</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center md-2">
                                    <Label className="flex mr-2"><Cpu absoluteStrokeWidth
                                                                      className="w-4 h-4 mr-1"/>CPU <Info
                                        className="h-3.5 w-3.5 ml-1"/></Label>
                                    <div><Badge variant={"outline"}>{calculateCPU(calculationMetrics)} vCPU</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <Label className="flex mr-2"><HardDrive absoluteStrokeWidth
                                                                            className="w-4 h-4 mr-1"/>Storage</Label>
                                    <div><Badge variant={"outline"}>200 GB</Badge></div>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <Label className="flex mr-2"><CircleDollarSign absoluteStrokeWidth
                                                                            className="w-4 h-4 mr-1"/>Month Cost</Label>
                                    <div><Badge variant={"outline"}>20 USD</Badge></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
