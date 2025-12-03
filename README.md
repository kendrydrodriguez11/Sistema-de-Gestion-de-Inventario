Sistema de Gestión de Inventario con AWS S3
📋 Descripción
Sistema completo de gestión de inventario desarrollado con arquitectura de microservicios. Permite administrar productos, controlar movimientos de stock, recibir notificaciones en tiempo real y almacenar imágenes de productos en AWS S3.
🛠️ Tecnologías Utilizadas
Backend

Spring Boot - Framework principal
Spring Cloud (Eureka, Gateway, Config Server) - Microservicios
MySQL - Base de datos relacional
Redis - Caché
RabbitMQ - Mensajería asíncrona
AWS S3 - Almacenamiento de imágenes
WebSocket - Notificaciones en tiempo real
JWT - Autenticación

Frontend

React - Framework UI
Material-UI - Componentes visuales
Axios - Peticiones HTTP
STOMP/SockJS - WebSocket cliente

📦 Arquitectura
El sistema consta de 6 microservicios:

microservice-eureka (8761) - Service Discovery
microservice-config (8888) - Configuración centralizada
microservice-gateway (8080) - API Gateway
microservice-auth (8081) - Autenticación y usuarios
microservice-aws (8082) - Gestión de S3
microservice-inventory (8083) - Gestión de inventario
microservice-notifications (8084) - Sistema de notificaciones

🚀 Instalación y Configuración
Prerrequisitos

Java 17+
Node.js 16+
MySQL 8.0+
Redis 6.0+
RabbitMQ 3.9+
Cuenta AWS con acceso a S3

1. Clonar el Repositorio
bashgit clone <repository-url>
cd auth-module-initial-aws
2. Configurar Base de Datos
Crear la base de datos en MySQL:
sqlCREATE DATABASE inventory;
Actualizar credenciales en microservice-configuration/src/main/resources/configurations/msvc-auth.yml:
yamlspring:
  datasource:
    url: jdbc:mysql://localhost:3306/inventory
    username: <TU_USUARIO>
    password: <TU_PASSWORD>
3. Configurar Redis
Asegurarse de que Redis esté corriendo en:

Host: localhost
Puerto: 6380 (auth) y 6379 (inventory)

4. Configurar RabbitMQ
RabbitMQ debe estar ejecutándose en:

Host: localhost
Puerto: 5672
Usuario: guest
Password: guest

5. Configurar AWS S3
Actualizar credenciales en microservice-configuration/src/main/resources/configurations/microservice-aws.yml:
yamlspring:
  aws:
    secret:
      key: <TU_AWS_SECRET_KEY>
    access:
      key: <TU_AWS_ACCESS_KEY>
    region: us-east-1
Crear bucket en AWS S3:

Nombre: my-inventory-bucketken
Región: us-east-1
Permisos: Configurar CORS para permitir acceso desde frontend

6. Configurar JWT Secret
En microservice-configuration/src/main/resources/configurations/msvc-auth.yml:
yamljwt:
  secret:
    key: <TU_JWT_SECRET_KEY_BASE64>
  time:
    expiration: 3600000
7. Iniciar Microservicios (en orden)
bash# 1. Eureka Server
cd microservice-eureka
./mvnw spring-boot:run

# 2. Config Server
cd ../microservice-configuration
./mvnw spring-boot:run

# 3. Esperar ~30 segundos y luego iniciar los demás (en cualquier orden)
cd ../microservice-auth
./mvnw spring-boot:run

cd ../microservice-aws
./mvnw spring-boot:run

cd ../microservice-inventory
./mvnw spring-boot:run

cd ../microservice-notifications
./mvnw spring-boot:run

cd ../microservice-gateway
./mvnw spring-boot:run
8. Configurar y Ejecutar Frontend
bashcd inventory-frontend

# Instalar dependencias
npm install

# Crear archivo .env
echo "REACT_APP_API_URL=http://localhost:8080" > .env
echo "REACT_APP_WS_URL=http://localhost:8081/ws" >> .env

# Iniciar aplicación
npm start
La aplicación estará disponible en: http://localhost:3000
🎯 Uso del Sistema
Primera Ejecución

Acceder a http://localhost:3000
Registrar un nuevo usuario desde el formulario de registro
Iniciar sesión con las credenciales creadas

Funcionalidades Principales

Dashboard: Vista general del inventario
Productos: CRUD completo con imágenes almacenadas en S3
Movimientos: Registro de entradas/salidas de stock
Notificaciones: Alertas en tiempo real por stock bajo
Categorías: Organización de productos
Stock Bajo: Vista rápida de productos críticos

🔍 Verificación de Servicios

Eureka Dashboard: http://localhost:8761
API Gateway: http://localhost:8080
Health Check: http://localhost:8080/actuator/health

📝 Notas Importantes

Todos los microservicios deben estar corriendo para el funcionamiento completo
El orden de inicio es crucial (Eureka → Config → Demás servicios)
Las imágenes de productos se almacenan en S3 con URLs pre-firmadas
Redis se usa para caché y mejora de rendimiento
RabbitMQ gestiona las notificaciones de stock bajo

🐛 Troubleshooting

Error de conexión a base de datos: Verificar que MySQL esté corriendo y las credenciales sean correctas
Services no se registran en Eureka: Esperar ~1 minuto después de iniciar Eureka
Error de S3: Verificar credenciales AWS y permisos del bucket
WebSocket no conecta: Verificar que microservice-auth esté corriendo en puerto 8081

📄 Licencia
Este proyecto es de uso educativo.Khabla sobre la zona horario en la main principal de aws, sobre las credenciales que se debe de configurar y habla mas sobre la descripcion del proyectoSistema de Gestión de Inventario con AWS S3
📋 Descripción del Proyecto
Sistema empresarial completo de gestión de inventario desarrollado con arquitectura de microservicios distribuidos. La aplicación permite a las empresas administrar eficientemente su catálogo de productos, controlar movimientos de stock en tiempo real, recibir alertas automáticas de inventario bajo, y gestionar imágenes de productos almacenadas de forma segura en la nube de AWS.
Características Principales

Gestión Completa de Productos: Crear, editar, eliminar y visualizar productos con información detallada (SKU, precio, stock, categoría)
Sistema de Categorías: Organización intuitiva de productos por categorías personalizables
Control de Movimientos: Registro detallado de entradas, salidas y ajustes de inventario con historial completo
Alertas Inteligentes: Sistema de notificaciones en tiempo real cuando productos alcanzan niveles críticos de stock
Almacenamiento en la Nube: Subida y gestión de imágenes de productos mediante AWS S3 con URLs pre-firmadas
Dashboard Analítico: Vista consolidada con métricas clave del inventario
Autenticación Segura: Sistema de login con JWT y manejo de sesiones
Notificaciones en Tiempo Real: WebSocket para actualizaciones instantáneas de alertas
Sistema de Caché: Optimización de consultas frecuentes mediante Redis
Mensajería Asíncrona: Procesamiento de alertas mediante RabbitMQ

Casos de Uso

Pequeñas y medianas empresas que necesitan digitalizar su inventario
Tiendas retail que requieren control de stock multi-categoría
Almacenes que necesitan trazabilidad de movimientos
Negocios que requieren alertas automáticas de reabastecimiento

🛠️ Tecnologías Utilizadas
Backend

Spring Boot 3.x - Framework principal para microservicios
Spring Cloud (Eureka, Gateway, Config Server) - Infraestructura de microservicios
Spring Security + JWT - Autenticación y autorización
Spring Data JPA - Persistencia de datos
MySQL 8.0 - Base de datos relacional principal
Redis 6.0 - Sistema de caché distribuido
RabbitMQ 3.9 - Broker de mensajería para eventos asíncronos
AWS SDK v2 - Integración con servicios de Amazon Web Services
AWS S3 - Almacenamiento de objetos (imágenes de productos)
WebSocket + STOMP - Comunicación bidireccional en tiempo real
Hibernate - ORM para mapeo objeto-relacional
Feign Client - Cliente HTTP declarativo para comunicación entre microservicios

Frontend

React 18 - Librería UI moderna
Material-UI v5 - Sistema de diseño y componentes
React Router v6 - Navegación SPA
Axios - Cliente HTTP para API REST
STOMP/SockJS - Cliente WebSocket
JWT Decode - Manejo de tokens de autenticación
Context API - Gestión de estado global

Herramientas de Desarrollo

Maven - Gestión de dependencias y build
npm - Gestor de paquetes frontend
Lombok - Reducción de código boilerplate

📦 Arquitectura del Sistema
El sistema implementa una arquitectura de microservicios con los siguientes componentes:
Microservicios

microservice-eureka (Puerto 8761)

Service Registry y Discovery
Registro automático de todos los microservicios
Monitoreo de salud de servicios


microservice-config (Puerto 8888)

Servidor de configuración centralizada
Gestión de propiedades por ambiente
Actualización dinámica de configuraciones


microservice-gateway (Puerto 8080)

API Gateway único punto de entrada
Enrutamiento inteligente de peticiones
Filtros de autenticación globales
Configuración CORS centralizada


microservice-auth (Puerto 8081)

Gestión de usuarios y autenticación
Generación y validación de tokens JWT
Control de roles (ADMIN, USER)
Registro de actividad de usuarios
WebSocket para notificaciones de autenticación


microservice-aws (Puerto 8082)

Integración con AWS S3
Generación de URLs pre-firmadas (PUT/GET)
Gestión de buckets
Configuración de CORS en S3


microservice-inventory (Puerto 8083)

CRUD completo de productos
Gestión de movimientos de inventario
Búsqueda y filtrado avanzado
Detección automática de stock bajo
Publicación de eventos a RabbitMQ


microservice-notifications (Puerto 8084)

Consumo de eventos de RabbitMQ
Almacenamiento de notificaciones
WebSocket para push notifications
Marcado de leído/no leído



Flujo de Datos
Frontend → Gateway → Microservicio específico → Base de Datos
                                              ↓
                                           RabbitMQ → Notifications
                                              ↓
                                          WebSocket → Frontend
🚀 Instalación y Configuración
Prerrequisitos
Software Requerido

Java JDK 17 o superior (Descargar)
Node.js 16+ y npm (Descargar)
MySQL 8.0+ (Descargar)
Redis 6.0+ (Descargar)
RabbitMQ 3.9+ (Descargar)
Maven 3.8+ (incluido en el proyecto con Maven Wrapper)

Cuenta y Credenciales AWS

Cuenta activa de AWS
Usuario IAM con permisos de S3
Access Key y Secret Key generadas

1. Clonar el Repositorio
bashgit clone <repository-url>
cd auth-module-initial-aws
2. Configurar Base de Datos MySQL
Crear la base de datos:
sqlCREATE DATABASE inventory CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
Actualizar credenciales en archivos de configuración:
Archivo: microservice-configuration/src/main/resources/configurations/msvc-auth.yml
yamlspring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/inventory
    username: <TU_USUARIO_MYSQL>
    password: <TU_PASSWORD_MYSQL>
Archivo: microservice-configuration/src/main/resources/configurations/msvc-inventory.yml
yamlspring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/inventory
    username: <TU_USUARIO_MYSQL>
    password: <TU_PASSWORD_MYSQL>
Archivo: microservice-configuration/src/main/resources/configurations/msvc-notifications.yml
yamlspring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/inventory
    username: <TU_USUARIO_MYSQL>
    password: <TU_PASSWORD_MYSQL>
3. Configurar Redis
Instalación y configuración de puertos:

Para microservice-auth: Puerto 6380
Para microservice-inventory: Puerto 6379

Iniciar instancias de Redis:
bash# Instancia 1 (puerto 6379 - inventory)
redis-server --port 6379

# Instancia 2 (puerto 6380 - auth)
redis-server --port 6380
Nota: En producción, configurar Redis con persistencia y autenticación.
4. Configurar RabbitMQ
Iniciar RabbitMQ:
bash# Iniciar servicio
rabbitmq-server

# Habilitar plugin de management (opcional pero recomendado)
rabbitmq-plugins enable rabbitmq_management
Verificar acceso:

Console: http://localhost:15672
Usuario por defecto: guest
Password por defecto: guest

Nota: En producción, cambiar credenciales por defecto.
5. Configurar AWS S3
5.1 Obtener Credenciales AWS

Acceder a AWS Console
Ir a IAM → Users → Seleccionar o crear usuario
Security credentials → Create access key
Seleccionar "Application running outside AWS"
Guardar Access Key ID y Secret Access Key

5.2 Crear Bucket S3

Ir a S3 en AWS Console
Create bucket
Nombre: my-inventory-bucketken (o el que prefieras)
Región: us-east-1 (o tu región preferida)
Desmarcar "Block all public access" (para permitir URLs pre-firmadas)
Crear bucket

5.3 Configurar CORS en el Bucket
En el bucket creado, ir a Permissions → CORS y agregar:
json[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
        "AllowedOrigins": ["http://localhost:3000"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]
5.4 Actualizar credenciales en configuración
Archivo: microservice-configuration/src/main/resources/configurations/microservice-aws.yml
yamlspring:
  aws:
    secret:
      key: <TU_AWS_SECRET_ACCESS_KEY>
    access:
      key: <TU_AWS_ACCESS_KEY_ID>
    region: us-east-1  # Cambiar si usas otra región
⚠️ IMPORTANTE DE SEGURIDAD:

NUNCA subir estas credenciales a repositorios públicos
Usar variables de entorno en producción
Considerar AWS Secrets Manager para producción
Rotar credenciales periódicamente

6. Configuración de Zona Horaria (AWS Microservice)
Problema de Zona Horaria
El microservicio AWS incluye una configuración crítica de zona horaria en su clase principal:
Archivo: microservice-aws/src/main/java/com/example/microservice_aws/MicroserviceAwsApplication.java
java@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceAwsApplication {

    public static void main(String[] args) {
        // 🔥 CONFIGURACIÓN CRÍTICA: Establece zona horaria de la JVM
        TimeZone.setDefault(TimeZone.getTimeZone("America/Guayaquil"));
        
        SpringApplication.run(MicroserviceAwsApplication.class, args);
    }

    @PostConstruct
    public void printLocalTime() {
        // Útil para debugging de timestamps
        System.out.println("Hora Local JVM: " + java.time.ZonedDateTime.now());
        System.out.println("Instant (UTC): " + java.time.Instant.now());
    }
}
¿Por Qué es Importante?

URLs Pre-firmadas de S3: Tienen fecha de expiración precisa. Un desfase horario causa:

URLs expiradas prematuramente
Errores de autenticación con AWS
Problemas de sincronización con frontend


Registros de Auditoría: Los timestamps de actividad deben ser precisos y consistentes
Coordinación entre Servicios: Todos los microservicios deben usar la misma referencia temporal

Personalización
Para cambiar la zona horaria según tu ubicación:
java// Para Ciudad de México
TimeZone.setDefault(TimeZone.getTimeZone("America/Mexico_City"));

// Para Buenos Aires
TimeZone.setDefault(TimeZone.getTimeZone("America/Argentina/Buenos_Aires"));

// Para Madrid
TimeZone.setDefault(TimeZone.getTimeZone("Europe/Madrid"));

// Para UTC (recomendado en producción)
TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
Recomendación para Producción: Usar UTC y manejar conversiones de zona horaria en el frontend.
7. Configurar JWT Secret
Generar Secret Key
bash# En Linux/Mac
echo -n "tu-clave-secreta-muy-segura" | base64

# En Windows PowerShell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("tu-clave-secreta-muy-segura"))
Actualizar configuración
Archivo: microservice-configuration/src/main/resources/configurations/msvc-auth.yml
yamljwt:
  secret:
    key: <TU_JWT_SECRET_KEY_BASE64>  # Resultado del comando anterior
  time:
    expiration: 3600000  # 1 hora en milisegundos
⚠️ IMPORTANTE:

Usar clave de al menos 256 bits
Cambiar en cada ambiente (dev, staging, prod)
No compartir la clave en documentación

8. Iniciar Microservicios (ORDEN IMPORTANTE)
bash# 1. PRIMERO: Eureka Server (Service Discovery)
cd microservice-eureka
./mvnw clean spring-boot:run
# Esperar hasta ver: "Started MicroserviceEurekaApplication"
# Verificar en: http://localhost:8761

# 2. SEGUNDO: Config Server (debe esperar ~30 segundos después de Eureka)
cd ../microservice-configuration
./mvnw clean spring-boot:run
# Esperar hasta ver: "Started MicroserviceConfigurationApplication"

# 3. TERCERO: Esperar ~30 segundos y luego iniciar los demás (puede ser en paralelo)

# Terminal 3 - Gateway
cd ../microservice-gateway
./mvnw clean spring-boot:run

# Terminal 4 - Auth
cd ../microservice-auth
./mvnw clean spring-boot:run

# Terminal 5 - AWS
cd ../microservice-aws
./mvnw clean spring-boot:run

# Terminal 6 - Inventory
cd ../microservice-inventory
./mvnw clean spring-boot:run

# Terminal 7 - Notifications
cd ../microservice-notifications
./mvnw clean spring-boot:run
Verificar Registro de Servicios
Acceder a Eureka Dashboard: http://localhost:8761
Deberías ver registrados:

MSVC-GATEWAY
MSVC-AUTH
MICROSERVICE-AWS
MSVC-INVENTORY
MSVC-NOTIFICATIONS

9. Configurar y Ejecutar Frontend
bashcd inventory-frontend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cat > .env << EOL
REACT_APP_API_URL=http://localhost:8080
REACT_APP_WS_URL=http://localhost:8081/ws
EOL

# Iniciar aplicación React
npm start
La aplicación se abrirá automáticamente en: http://localhost:3000
10. Actualizar Nombre del Bucket (Si es necesario)
Si creaste un bucket con nombre diferente a my-inventory-bucketken:
Frontend - inventory-frontend/src/services/productService.js:
javascriptasync createProduct(productData, bucketName = 'TU-BUCKET-NAME') {
Backend - microservice-inventory/src/main/java/.../service/ProductServiceImpl.java:
javaString imageUrl = s3ClientApi.getPresignedGetUrl("TU-BUCKET-NAME", entity.getImageUrl());
🎯 Uso del Sistema
Primera Ejecución

Acceder a http://localhost:3000
Registrar nuevo usuario:

Click en "¿No tienes cuenta? Regístrate aquí"
Llenar formulario (username, email, password)
El sistema creará automáticamente espacio en S3 para el usuario


Iniciar sesión con credenciales creadas
Explorar el dashboard

Flujo Completo de Trabajo
1. Crear Producto con Imagen

Dashboard → Productos → Nuevo Producto
Llenar información (SKU único, nombre, precio, stock, categoría)
Seleccionar imagen desde tu computadora
Guardar (la imagen se sube automáticamente a S3)

2. Registrar Movimiento

Movimientos → Nuevo Movimiento
Seleccionar producto
Tipo: Entrada/Salida/Ajuste
Cantidad
Razón (opcional)
Registrar

3. Monitorear Alertas

Las notificaciones aparecen automáticamente cuando stock < minStock
Bell icon en navbar muestra contador
Click para ver detalles de alertas

4. Analizar Dashboard

Vista rápida de métricas clave
Productos con stock bajo
Actividad reciente

🔍 Verificación de Servicios
Endpoints de Salud
bash# Gateway Health
curl http://localhost:8080/actuator/health

# Eureka Dashboard
open http://localhost:8761

# RabbitMQ Management
open http://localhost:15672
Logs Importantes
Verificar en consola de cada microservicio:

✅ "Started <ServiceName>Application"
✅ "DiscoveryClient_<SERVICE-NAME> registering service"
✅ "Fetched config from server"

📝 Notas Importantes y Mejores Prácticas
Seguridad

Credenciales AWS: Usar AWS Secrets Manager en producción
JWT Secret: Rotar periódicamente y usar claves robustas
Base de Datos: Configurar SSL/TLS en conexiones
CORS: Restringir orígenes permitidos en producción

Performance

Redis: Configurar persistencia RDB o AOF
RabbitMQ: Ajustar prefetch count según carga
S3: Implementar CloudFront CDN para imágenes
Base de Datos: Crear índices en columnas frecuentemente consultadas

Escalabilidad

Cada microservicio puede escalarse independientemente
Redis puede convertirse en cluster
RabbitMQ soporta clustering nativo
MySQL puede replicarse (master-slave)

Monitoreo

Implementar Spring Boot Actuator en todos los servicios
Considerar ELK Stack para logs centralizados
Usar Prometheus + Grafana para métricas
Configurar alertas de salud de servicios

🐛 Troubleshooting
Error: "Connection refused" al iniciar servicios
Causa: Eureka o Config Server no están corriendo aún
Solución:
bash# Verificar que Eureka esté activo
curl http://localhost:8761

# Esperar 30-60 segundos entre inicios de servicios
Error: "Access Denied" en S3
Causa: Credenciales AWS incorrectas o sin permisos
Solución:

Verificar Access Key y Secret Key
Asegurar que el usuario IAM tenga policy:

json{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::my-inventory-bucketken/*"
        }
    ]
}
```

### Error: "Table doesn't exist"

**Causa**: Hibernate no creó las tablas automáticamente

**Solución**:
1. Verificar `ddl-auto: update` en configuración
2. Manualmente crear tablas si es necesario
3. Revisar logs de Spring Boot al inicio

### WebSocket no conecta

**Causa**: microservice-auth no está corriendo o CORS mal configurado

**Solución**:
1. Verificar `http://localhost:8081/ws` accesible
2. Revisar configuración CORS en WebSocketConfig
3. Verificar que SockJS esté habilitado

### Imágenes no se cargan

**Causa**: URLs pre-firmadas expiradas o zona horaria incorrecta

**Solución**:
1. Verificar configuración de zona horaria en AWS service
2. Las URLs expiran en 10 minutos por defecto
3. Recargar la vista del producto para generar nueva URL

## 📄 Estructura del Proyecto
```
auth-module-initial-aws/
├── microservice-eureka/          # Service Discovery
├── microservice-configuration/   # Config Server
├── microservice-gateway/         # API Gateway
├── microservice-auth/            # Autenticación
├── microservice-aws/             # AWS S3 Integration
├── microservice-inventory/       # Gestión Inventario
├── microservice-notifications/   # Sistema Notificaciones
└── inventory-frontend/           # Aplicación React
🤝 Contribuciones
Este proyecto es de uso educativo. Para contribuir:

Fork del repositorio
Crear branch para feature
Commit cambios
Push al branch
Crear Pull Request

📄 Licencia
Este proyecto es de uso educativo y demostrativo.


Algunas imagenes de mi sistema

<img width="1919" height="921" alt="image" src="https://github.com/user-attachments/assets/e771daeb-596e-49e2-8f27-a1c90588c45a" />

<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/22c650ba-1141-4170-b149-2d2feee18b5a" />

<img width="1899" height="1021" alt="image" src="https://github.com/user-attachments/assets/3eefc3f2-e9dd-4160-b417-74e89bc076c7" />

<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/b481425e-b9ec-49c6-bcab-b235274a7d02" />

<img width="1915" height="911" alt="image" src="https://github.com/user-attachments/assets/9cdfc00a-2ae7-41dd-9174-629ee8070ed8" />




