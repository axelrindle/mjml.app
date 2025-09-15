import { writeFile } from 'fs/promises'
import { ElementContent, RootContent } from 'hast'
import { fromHtml } from 'hast-util-from-html'
import { minifyWhitespace } from 'hast-util-minify-whitespace'
import { MJMLJsonObject } from 'mjml-core'

const xml = `
<mjml>
    <mj-head>
        <mj-attributes>
            <mj-all font-family="sans-serif"></mj-all>
            <mj-text font-size="14px"></mj-text>
        </mj-attributes>
    </mj-head>
    <mj-body background-color="#f1f5f9">
        <mj-section background-color="white">
            <mj-group>
                <mj-column vertical-align="middle">
                    <mj-text background-color="#ffffff" font-size="24px" font-weight="bold">Cloud
                        Management</mj-text>
                </mj-column>
                <mj-column vertical-align="middle">
                    <mj-image width="100px" align="right"
                        src="https://praecura.de/wp-content/themes/wordpress-codeanker/assets/images/baron-logo.svg"></mj-image>
                </mj-column>
            </mj-group>
        </mj-section>
    </mj-body>
</mjml>
`

const tree = fromHtml(xml, {
    fragment: true,
})

minifyWhitespace(tree)

type Input = RootContent | ElementContent
function hastToMjml(element: Input): MJMLJsonObject | undefined {
    if (element.type === 'comment' || element.type === 'doctype') {
        return undefined
    }

    if (element.type === 'element') {
        if (element.tagName === 'mj-text') {
            return {
                tagName: element.tagName,
                attributes: element.properties,
                content: element.children.filter(child => child.type === 'text').map(child => child.value).join(' '),
            }
        }

        const children = element.children.map(hastToMjml).filter(child => child !== undefined)
        return {
            tagName: element.tagName,
            attributes: element.properties,
            children: children.length > 0 ? children : undefined,
        }
    }

    if (element.type === 'text') {
        return {
            tagName: 'text',
            attributes: {},
            content: element.value,
        }
    }

    return undefined
}

function clean(element: RootContent | ElementContent) {
    delete element.data
    delete element.position

    if (element.type === 'element') {
        for (const child of element.children) {
            clean(child)
        }
    }
}

const mjml = tree.children[0]
clean(mjml)

const transformed = hastToMjml(mjml)

await writeFile('test.json', JSON.stringify(transformed, null, 4))
