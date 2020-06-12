module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.tsx', '.ts', '.ios.js', '.android.js', '.js', '.json'],
        alias: {
          app: './app',
          api: './app/api',
          components: './app/components',
          screens: './app/screens',
          navigation: './app/navigation',
          services: './app/services',
          theme: './app/theme',
          utils: './app/utils',
          models: './app/models',
          i18n: './app/i18n',
          'app-graphql': './app/graphql',
          '@types': './app/@types',
          hooks: './app/hooks',
        },
      },
    ],
  ],
}
