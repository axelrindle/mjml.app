import { configActDefault, configActReact } from '@actcoding/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'

/** @type import('eslint').Linter.Config[] */
const config = [
    ...configActDefault,
    ...configActReact,
    {
        name: 'app/ignores',
        ignores: [
            '*.d.ts',
        ],
    },
    {
        name: 'app/react',
        rules: {
            '@react/react-in-jsx-scope': 'off',
            '@react/prop-types': 'off',
        },
    },
    {
        name: 'app/tailwind',
        rules: {
            '@tailwindcss/no-custom-classname': 'off',
        },
    },

    ...pluginQuery.configs['flat/recommended'],
]

export default config
