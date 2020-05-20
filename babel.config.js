module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'babel-plugin-root-import',
            {
                paths: [
                    {
                        rootPathPrefix: '~',
                        rootPathSuffix: 'src/',
                    },
                    {
                        rootPathPrefix: '_assets',
                        rootPathSuffix: 'src/_assets',
                    },
                    {
                        rootPathPrefix: '_components',
                        rootPathSuffix: 'src/_components',
                    },
                        {
                            rootPathPrefix: '_atoms',
                            rootPathSuffix: 'src/_components/_atoms',
                        },
                        {
                            rootPathPrefix: '_molecules',
                            rootPathSuffix: 'src/_components/_molecules',
                        },
                        {
                            rootPathPrefix: '_organisms',
                            rootPathSuffix: 'src/_components/_organisms',
                        },
                    {
                        rootPathPrefix: '_drawers',
                        rootPathSuffix: 'src/_drawers',
                    },
                    {
                        rootPathPrefix: '_screens',
                        rootPathSuffix: 'src/_screens',
                    },
                    {
                        rootPathPrefix: '_services',
                        rootPathSuffix: 'src/_services',
                    },
                    {
                        rootPathPrefix: '_store',
                        rootPathSuffix: 'src/_store',
                    },
                        {
                            rootPathPrefix: '_actions',
                            rootPathSuffix: 'src/_store/_actions',
                        },
                        {
                            rootPathPrefix: '_reducers',
                            rootPathSuffix: 'src/_store/_reducers',
                        },
                        {
                            rootPathPrefix: '_constants',
                            rootPathSuffix: 'src/_store/_constants',
                        },
                    // {
                    //   rootPathPrefix: '@asset',
                    //   rootPathSuffix: './asset',
                    // },
                ],
            },
        ],
    ],
};
