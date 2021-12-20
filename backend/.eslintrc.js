module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["eslint:all"],
    "parserOptions": {
        "ecmaVersion": 13
    },
    "rules": {
        "sort-vars": "off", //éviter de devoir trier les variables déclarée même temps par ordre alphabétique
        "one-var": "off", //éviter de devoir déclarer les variables qui se suivent via le même déclarateurs
        "function-call-argument-newline" : "off", //éviter de devoir passer à la ligne pour chaque paramètre déclaré dans une fonction
        "padded-blocks" : "off", //éviter d'avoir un espace entre chaque ligne de code
        "no-console" : "off", //éviter les console.log (à terme il faudra le remettre, car console.log destiné au débogage et pas au client)
        "sort-keys": "off", //éviter d'avoir à trier les éléments d'un dictionnaire par ordre alphabétique
        "strict" :"off", //éviter d'avoir à mettre "use strict"; dans les fichiers js
    }
};
