import type { Merge, Simplify } from 'type-fest'
import { z } from 'zod'

export const ZMJMLJsonSelfClosingTag = z.strictObject({
    tagName: z.string(),
    attributes: z.record(z.string(), z.unknown()).optional(),
})

export const ZMJMLJsonWithContent = ZMJMLJsonSelfClosingTag.extend({
    content: z.string(),
})

export type MJMLJsonWithContent = Simplify<z.infer<typeof ZMJMLJsonWithContent>>

// Recursive types as defined by https://zod.dev/?id=recursive-types
export type MJMLJsonWithChildren = Merge<
    z.infer<typeof ZMJMLJsonSelfClosingTag>,
    {
        children: MJMLJsonObject[]
    }
>

export const ZMJMLJsonWithChildren: z.ZodType<MJMLJsonWithChildren> = ZMJMLJsonSelfClosingTag.extend({
    children: z.lazy(() => ZMJMLJsonObject.array()),
})

export const ZMJMLJsonObject = z.union([
    ZMJMLJsonWithChildren,
    ZMJMLJsonWithContent,
    ZMJMLJsonSelfClosingTag,
])

export type MJMLJsonObject = Simplify<z.infer<typeof ZMJMLJsonObject>>
