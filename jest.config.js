module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // para JavaScript e JSX
    '^.+\\.tsx?$': 'ts-jest', // para TypeScript e TSX
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
