import { useAppEditor } from '@/hooks/use-app-editor'
import { useAppStorage } from '@/hooks/use-app-storage'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { faFileCode, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'

import imageEmpty from '@/assets/undraw_no_data_re_kwbl.svg'
import { MJMLJsonObject } from '@/mjml/types'

const formSchema = z.strictObject({
    search: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export default function AppTemplatesDialog() {
    const { toast } = useToast()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        },
    })

    const onSubmit = useCallback((values: FormSchema) => {
        console.log(values)
    }, [])

    const { templates, removeTemplate } = useAppStorage()
    const amount = useMemo(() => Object.keys(templates).length, [templates])

    const { search } = form.watch()
    const filteredTemplates = useMemo(() => {
        const entries = Object.entries(templates)
        if (search.length === 0) {
            return entries
        }

        return entries.filter(([e]) => e.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }, [search, templates])

    const editor = useAppEditor()
    const onSelect = useCallback((name: string, data: MJMLJsonObject) => {
        editor.filename[1](name)
        editor.data[1](data)

        toast({
            title: 'Template geladen',
        })
    }, [editor.data, editor.filename, toast])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className='text-black'
                >
                    <FontAwesomeIcon icon={faFileCode} />
                </Button>
            </DialogTrigger>
            <DialogContent className='flex h-3/4 flex-col'>
                <DialogHeader>
                    <DialogTitle>
                        Templates
                    </DialogTitle>
                    <DialogDescription>
                        Choose a template to load or create a blank template.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Search</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <ScrollArea className='-mx-6 flex-1 bg-stone-100 px-6 shadow-inner'>

                    <div className='flex flex-col gap-y-4 py-6'>
                        {filteredTemplates.length === 0 ?
                            (
                                <div className='space-y-8'>
                                    <img src={imageEmpty} className='mx-auto size-48' />
                                    <p className="text-center">
                                        Noch nichts gespeichert.
                                    </p>
                                </div>
                            ) :
                            filteredTemplates.map(([name, data], i) => (
                                <div
                                    className="flex flex-row items-center gap-x-4"
                                    key={i}
                                >
                                    <Card
                                        className={cn('flex-1 cursor-pointer transition-colors bg-mjml-50 hover:bg-mjml-100')}
                                        onClick={() => onSelect(name, data)}
                                    >
                                        <CardHeader>
                                            <CardTitle>
                                                {name}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => removeTemplate(name)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>

                </ScrollArea>

                <DialogFooter>
                    <p className='text-sm'>
                        {search.length === 0
                            ? (
                                <span>{amount} templates available</span>
                            )
                            : (
                                <span>{filteredTemplates.length} / {amount} templates available</span>
                            )
                        }
                    </p>
                    <div className="grow"></div>
                    <DialogClose>
                        Close
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
