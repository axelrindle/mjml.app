import { useAppEditor } from '@/hooks/use-app-editor'
import { useAppStorage } from '@/hooks/use-app-storage'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

export default function TemplateSaveDialog({ children }: PropsWithChildren) {
    const {
        data: [data],
        filename: [filename, setFilename],
    } = useAppEditor()

    const { hasTemplate, saveTemplate } = useAppStorage()

    const [open, setOpen] = useState(false)

    const formSchema = useMemo(() => z.strictObject({
        filename: z.string().min(1),
    }), [])

    type FormSchema = z.infer<typeof formSchema>

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            filename,
        },
    })

    const onSubmit = useCallback((values: FormSchema) => {
        saveTemplate(values.filename, data)

        setFilename(values.filename)
        form.reset(values)

        setOpen(false)
    }, [data, form, saveTemplate, setFilename])

    const values = form.watch()
    const exists = useMemo(() => hasTemplate(values.filename), [hasTemplate, values.filename])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {children}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Speichern
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="filename"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Filename</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Abbrechen
                            </AlertDialogCancel>
                            {exists ? (
                                <Button type='submit' variant="destructive">
                                    Überschreiben
                                </Button>
                            ) : (
                                <Button type='submit'>
                                    Speichern
                                </Button>
                            )}
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
