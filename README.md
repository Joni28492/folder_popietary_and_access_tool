instalar node   https://nodejs.org/en


en la carpeta del propyecto

```
npm install
```

los txt que creemos tienen que seguir la siguiente estructura
```
nombre_usuario
p => directorios de los que es propietario separado por espacios
a => directorios a los que tiene acceso separado por espacios
n => notas que quieras agregar
\n salto de linea
```

ejemplo
```
pepe
p => dir1
a => dir2 dir3
n => el jefe

juan
p => dir2
a => dir3 dir4
n => 
```





Generar html de una empresa
```
node .\app.js -f .\data\empresa.txt

node .\app.js -f <Path archivo txt>
```

Generar varios html con una pagina de index con el listado de empresas
```
node .\app.js -d .\data\
node .\app.js -d <Path de la carpeta con los txt>
```