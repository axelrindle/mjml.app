import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useAppSettings } from '@/hooks/use-app-settings'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppSettings, appSettingsSchema } from './context/settings/context'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

export default function AppSettingsDialog() {
    const { settings, overwriteSettings } = useAppSettings()

    const [open, setOpen] = useState(false)

    const form = useForm<AppSettings>({
        resolver: zodResolver(appSettingsSchema),
        defaultValues: settings,
    })

    const onSubmit = useCallback((values: AppSettings) => {
        overwriteSettings(values)
        setOpen(false)
    }, [overwriteSettings, setOpen])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className='text-black'
                >
                    <FontAwesomeIcon icon={faCog} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Settings
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Customize the application to your likings.
                            </AlertDialogDescription>

                            <FormField
                                control={form.control}
                                name="editor.fontSize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Editor Font Size</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type='submit'>Save</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
