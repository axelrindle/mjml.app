import iconJson from '@/assets/fileJson.svg'
import iconXml from '@/assets/fileXml.svg'
import ActionTooltip from '@/components/ActionTooltip'
import ComponentChooseDialog from '@/components/ComponentChooseDialog'
import TemplateSaveDialog from '@/components/TemplateSaveDialog'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useAppEditor } from '@/hooks/use-app-editor'
import { useAppSettings } from '@/hooks/use-app-settings'
import { useToast } from '@/hooks/use-toast'
import { join } from '@/lib/dot-prop'
import { getComponentTemplate, MjmlComponent } from '@/mjml/components'
import { mjmlJsonToXml } from '@/mjml/convert'
import { MJMLJsonObject, ZMJMLJsonObject } from '@/mjml/types'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { setProperty } from 'dot-prop'
import { JsonEditor } from 'json-edit-react'
import mjml2html from 'mjml-browser'
import { MJMLParseResults } from 'mjml-core'
import { useCallback, useEffect, useState } from 'react'
import type { MJMLJsonObject as OriginalMJMLJsonObject } from 'mjml-core'

export default function PageJsonEditor() {
    const [error, setError] = useState<Error>()
    const [result, setResult] = useState<MJMLParseResults>()

    const { toast } = useToast()
    const { settings } = useAppSettings()
    const {
        persist,
        data: [data, setData],
        filename: [filename],
    } = useAppEditor()

    const copyToClipboard = useCallback(async () => {
        const stringified = JSON.stringify(data, null, 4)
        await navigator.clipboard.writeText(stringified)
        toast({
            title: 'Daten wurden kopiert',
            description: 'Das Template wurde als JSON Objekt in deine Zwischenablage kopiert.',
        })
    }, [data, toast])

    const convertToXml = useCallback(async () => {
        const xml = mjmlJsonToXml(data)
        await navigator.clipboard.writeText(xml)
        toast({
            title: 'XML wurde kopiert',
            description: 'Das Template wurde in XML konvertiert und in deine Zwischenablage kopiert.',
        })
    }, [data, toast])

    // TODO: extract to helper
    const [showChoose, setShowChoose] = useState(false)
    const [choosePath, setChoosePath] = useState<string>()
    const [chooseData, setChooseData] = useState<object>()
    const [chosenComponent, setChosenComponent] = useState<MjmlComponent>()

    useEffect(() => {
        if (choosePath === undefined || chooseData === undefined || chosenComponent === undefined) {
            return
        }

        setShowChoose(false)

        const modified = setProperty(
            chooseData,
            choosePath,
            getComponentTemplate(chosenComponent),
        )

        setData(modified as MJMLJsonObject)
        setChooseData(undefined)
        setChoosePath(undefined)
        setChosenComponent(undefined)
    }, [chooseData, choosePath, chosenComponent, setData])

    useEffect(() => {
        if (!data) {
            setError(undefined)
            setResult(undefined)
            return
        }

        try {
            const result = mjml2html(data as OriginalMJMLJsonObject, {
                validationLevel: 'strict',
            })

            setResult(result)
            setError(undefined)

            persist()
        } catch (error) {
            setError(error as Error)
            setResult(undefined)
        }
    }, [data, persist])

    return (<>
        <div className="relative flex-1">
            <div className="h-full overflow-y-scroll">
                <JsonEditor
                    data={data}
                    setData={async (newData) => {
                        const { data, success, error } = await ZMJMLJsonObject.safeParseAsync(newData)
                        if (!success) {
                            // TODO: toast / validate function
                            console.log(error)
                            return
                        }

                        setData(data)
                    }}
                    maxWidth="unset"
                    indent={4}
                    stringTruncate={50}
                    onAdd={async ({ newData, path }) => {
                        if (typeof newData !== 'object' || Array.isArray(newData)) {
                            return
                        }

                        // only trigger when adding a new child somewhere
                        if (path[path.length - 2] !== 'children') {
                            return
                        }

                        setChoosePath(join(path))
                        setChooseData(newData)
                        setShowChoose(true)

                        return ''
                    }}
                    onUpdate={async ({ newData }) => {
                        const { success, error } = await ZMJMLJsonObject.safeParseAsync(newData)
                        if (!success) {
                            console.log(error)
                            return error.issues[0].message
                        }
                    }}
                    rootName={filename}
                    showArrayIndices={false}
                    showStringQuotes={false}
                    restrictDrag={false}
                    theme={{
                        container: {
                            backgroundColor: 'white',
                            fontSize: `${settings.editor.fontSize}px`,
                        },
                        bracket: {
                            backgroundColor: 'hsl(var(--background))',
                        },
                    }}
                />
            </div>

            <div className="absolute bottom-4 right-8 flex flex-col gap-y-4">
                <ActionTooltip
                    label='In XML konvertieren'
                    icon={iconXml}
                    action={convertToXml}
                />

                <ActionTooltip
                    label='JSON kopieren'
                    icon={iconJson}
                    action={copyToClipboard}
                />

                <TemplateSaveDialog>
                    <ActionTooltip
                        label='Speichern'
                        icon={faSave}
                    >
                        {(children) => (
                            <AlertDialogTrigger asChild>
                                {children}
                            </AlertDialogTrigger>
                        )}
                    </ActionTooltip>
                </TemplateSaveDialog>

                <ComponentChooseDialog
                    open={showChoose}
                    setOpen={setShowChoose}
                    onSubmit={({ component }) => setChosenComponent(component)}
                />
            </div>
        </div>

        <div className="w-1 cursor-ew-resize bg-mjml-500"></div>

        <div className='flex-1'>
            {error === undefined ?
                (result === undefined ?
                    <p></p> :
                    <iframe
                        className='size-full'
                        src={`data:text/html,${encodeURIComponent(result.html)}`}
                        loading='lazy'
                        referrerPolicy='no-referrer'
                    />
                ) :
                (
                    <p className='text-red-500'>{error.message}</p>
                )
            }
        </div>
    </>)
}
