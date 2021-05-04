module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|tsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|PNG)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testRegex: '(/^__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
