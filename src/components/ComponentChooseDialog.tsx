import { MjmlComponent, mjmlComponents } from '@/mjml/components'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { UnionToTuple } from 'type-fest'
import { z } from 'zod'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

const components = Object.values(mjmlComponents).reduce((a, b) => [...a, ...b], []) as UnionToTuple<MjmlComponent>

const formSchema = z.strictObject({
    component: z.enum(components),
})

type FormSchema = z.infer<typeof formSchema>

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    onSubmit: (values: FormSchema) => void
}

export default function ComponentChooseDialog({
    onSubmit,
    open, setOpen,
}: Props) {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            component: 'mj-text',
        },
    })

    const handleSubmit = useCallback((values: FormSchema) => {
        onSubmit(values)
        setOpen(false)
    }, [onSubmit, setOpen])

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add Component
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Choose an MJML component to insert into the tree.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="component"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        MJML Component
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an MJML component to insert" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.keys(mjmlComponents).map((group, indexGroup) => (
                                                <SelectGroup key={`${group}-${indexGroup}`}>
                                                    <SelectLabel>{group}</SelectLabel>
                                                    {mjmlComponents[group].map((c, indexComponent) => (
                                                        <SelectItem
                                                            key={`${group}-${indexComponent}-component-${indexComponent}`}
                                                            value={c}
                                                        >
                                                            {c}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        An extensive documentation on all the components can be
                                        found in the <a className='border-b border-b-muted-foreground' href="https://documentation.mjml.io/#components" target='_blank' rel="noreferrer">MJML documentation <FontAwesomeIcon className='ml-0.5' icon={faExternalLink} /></a>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button
                                    type='button'
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </AlertDialogCancel>
                            <Button
                                type='submit'
                            >
                                Add
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
