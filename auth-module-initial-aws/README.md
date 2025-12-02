# Microservicios de Reseñas de Películas
Este proyecto está compuesto por varios microservicios que permiten gestionar reseñas de películas, autenticación de usuarios y un gateway para enrutar las solicitudes entre los diferentes servicios. Está implementado con **Spring Boot**, utiliza **Eureka** para el descubrimiento de servicios y **configuración centralizada**.

## Requisitos

- **Java 17+**
- **MySQL** como base de datos
- **Spring Boot** para el desarrollo de los microservicios


## Connfiguracion
  -- **En microservice-config -> src -> main -> resources ->configurations -> msvc-reviews y msvc-auth**
      datasource:
       url: jdbc: mysql://<HOST>:<PUERTO>/<NOMBRE_BASE_DE_DATOS>  # Dirección de tu base de datos
       username: <TU_USUARIO>                                   # Usuario de la base de datos
       password: <TU_CONTRASEÑA>                                 # Contraseña de la base de datos
       driver-class-name: com.mysql.cj.jdbc.Driver
     jpa:
       hibernate:
         ddl-auto: update                                       # Estrategia de creación de la base de datos (por ejemplo: update, validate, create)
         database: mysql
         database-platform: org.hibernate.MySQL8Dialect


         
### Base de Datos

- La base de datos utilizada es **MySQL**.
- Debe crearse una base de datos llamada `movies` en MySQL, que será utilizada por los microservicios `msvc-reviews` y `msvc-auth`.
- Asegúrate de tener MySQL corriendo localmente con las credenciales configuradas en los archivos `application.yml` de cada microservicio.

  

### Módulos del Proyecto

1. **microservice-config** (Puerto: 8888)
   - Servidor de configuración centralizada.
   - Utiliza Spring Cloud Config para administrar la configuración de los microservicios desde una ubicación centralizada dentro de; microservice-config -> src -> main -> resources.

2. **msvc-eureka** (Puerto: 8761)
   - Servidor de descubrimiento de servicios.
   - Permite a los microservicios registrarse y localizarse automáticamente.
  
3. **msvc-reviews** (Puerto: 8090)
   - Gestiona las reseñas de las películas.
   - Se conecta a la base de datos `movies` en MySQL.
   - **Controlador de Películas**:
     - **@RequestMapping("/api/movies")**
     - **GET /get/{idMovie}**: Obtiene una película por su `idMovie`.
     - **GET /getByName/{name}**: Busca películas por su nombre.
     - **GET /getByGenre/{genre}**: Busca películas por género.
     - **GET /all**: Obtiene todas las películas registradas.
     - **POST /save**: Guarda una nueva película con los géneros proporcionados.
     - **PUT /update**: Actualiza la información de una película existente.
     - **DELETE /delete/{idMovie}**: Elimina una película por su `idMovie`.


4. **msvc-auth** (Puerto: 8092)
   - Gestiona la autenticación de usuarios.
   - Permite el **registro de usuarios**, **login** y **validación de tokens JWT** generados por el microservicio.
   - Valida los tokens JWT que pasan a través del gateway y los utiliza para autenticar las solicitudes.
   - **Controlador de Autenticación**:
     - **@RequestMapping("/api/auth")**
     - **POST /register**: Registra un nuevo usuario. Recibe `username`, `email`, `password` y una imagen de perfil opcional.
     - **POST /login**: Autentica al usuario con las credenciales proporcionadas (`username` y `password`) y devuelve un token JWT para autenticación futura.
     - **POST /validationToken**: Valida el token JWT proporcionado, retornando `true` si es válido y `false` si no lo es.

         
5. **msvc-gateway** (Puerto: 8080)
   - Actúa como el gateway que enruta las solicitudes a los servicios correspondientes.
   - Se conecta a `msvc-reviews` y `msvc-auth`.
     


### Puertos

- **msvc-reviews**: `8090`
- **msvc-gateway**: `8080`
- **msvc-eureka**: `8761`
- **msvc-auth**: `8092`
- **microservice-config**: `8888`
- **mySql** `3306`

