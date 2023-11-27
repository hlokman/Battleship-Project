module.exports = {
  // Indique à Jest d'utiliser babel-jest pour la transpilation des fichiers JS
  transform: {
    "^.+\\.js$": "babel-jest",
  },

  // Spécifie l'environnement de test pour Jest
  testEnvironment: "node",

  // Définit les répertoires que Jest doit ignorer
  testPathIgnorePatterns: ["/node_modules/"],

  // Configurations pour le traitement des fichiers de style et d'images
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  // Configure Jest pour qu'il puisse comprendre les alias de modules, si vous en utilisez
  moduleDirectories: ["node_modules", "src"],

  // Ajoutez d'autres configurations spécifiques à votre projet ici
};
