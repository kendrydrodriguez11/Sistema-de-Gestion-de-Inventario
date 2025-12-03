*📦 Sistema de Gestión de Inventario con AWS S3*
*Arquitectura Empresarial Basada en Microservicios*
*📋 Descripción del Proyecto*

Este sistema es una plataforma empresarial completa para la gestión de inventario, diseñada con una arquitectura de microservicios altamente escalable.
Permite a empresas administrar de manera eficiente:

* Productos y categorías

* Movimientos de stock en tiempo real

* Alertas automáticas por bajo inventario

* Autenticación segura por JWT

* Notificaciones instantáneas

* Almacenamiento de imágenes en AWS S3 mediante URLs pre-firmadas

El objetivo es proveer una solución robusta, modular y lista para escalar en entornos de producción.

*⭐ Características Principales*
Gestión del Inventario

CRUD completo de productos

Manejo de stock con entradas, salidas y ajustes

Historial completo de movimientos

Categorías personalizables

Monitoreo de stock crítico

Infraestructura y Seguridad

Autenticación segura con JWT

Capa API Gateway centralizada

Registro dinámico de servicios con Eureka

Caché distribuida con Redis

Comunicación asíncrona con RabbitMQ

Almacenamiento y Tiempo Real

Subida de imágenes a AWS S3

Generación de URL pre-firmada (PUT/GET)

Notificaciones instantáneas con WebSocket/STOMP

Dashboard en tiempo real

Casos de Uso

SMEs y comercios minoristas

Bodegas y centros de distribución

E-commerce con catálogo visual

Empresas que requieren alertas de reabastecimiento

*🛠️ Tecnologías Utilizadas*
*Backend*

Spring Boot 3

Spring Cloud (Eureka, Gateway, Config Server)

Spring Security + JWT

Spring Data JPA (Hibernate)

Feign Client

MySQL 8.0

Redis 6.0

RabbitMQ 3.9

AWS S3 + AWS SDK v2

WebSocket + STOMP

*Frontend*

*React 18*

Material UI v5

React Router v6

Axios

SockJS / STOMP

Context API

JWT Decode

Herramientas

Maven & Maven Wrapper

npm

Lombok

Git

*🧱 Arquitectura del Sistema*

El sistema está compuesto por los siguientes microservicios:

🔍 1. microservice-eureka (8761)

Service Discovery
Registra servicios y permite balanceo dinámico

⚙️ 2. microservice-config (8888)

Configuración centralizada
Manejo de ambientes: dev, test, prod

🌐 3. microservice-gateway (8080)

Único punto de entrada
Filtros de seguridad
CORS global

🔐 4. microservice-auth (8081)

Gestión de usuarios
Generación/validación de tokens
Notificaciones WebSocket para login/logout

☁️ 5. microservice-aws (8082)

Integración con AWS S3
Generación de URLs pre-firmadas
Gestión de buckets y permisos

📦 6. microservice-inventory (8083)

CRUD de productos
Detección automática de stock bajo
Publicación de eventos a RabbitMQ

🔔 7. microservice-notifications (8084)

Procesamiento de eventos
Almacenamiento de notificaciones
WebSocket de alertas en tiempo real

*🔄 Flujo de Datos*
Frontend → Gateway → Microservicio → MySQL
                                   ↓
                               RabbitMQ → Notifications
                                   ↓
                               WebSocket → Frontend

*🚀 Instalación y Configuración*
Prerrequisitos

Java 17+

Node.js 16+

MySQL 8+

Redis 6+

RabbitMQ 3.9+

Cuenta AWS + IAM

Maven o Maven Wrapper

*📥 1. Clonar Repositorio*
git clone <repository-url>
cd auth-module-initial-aws

*🗄️ 2. Configurar MySQL*

Crear BD:

CREATE DATABASE inventory CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


*Actualizar credenciales en:*

msvc-auth.yml

msvc-inventory.yml

msvc-notifications.yml

*⚡ 3. Configurar Redis*
redis-server --port 6379   # inventory
redis-server --port 6380   # auth

*📨 4. Configurar RabbitMQ*
rabbitmq-server
rabbitmq-plugins enable rabbitmq_management


Acceso: http://localhost:15672
Usuario: guest, Password: guest

*☁️ 5. Configurar AWS S3*
*5.1 Credenciales AWS*

AWS Console → IAM → User → Security Credentials → Create Access Key

⚠️ NO subir credenciales al repositorio

*5.2 Crear Bucket*

Nombre: my-inventory-bucketken

Región: us-east-1

5.3 CORS del bucket:
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
    "AllowedOrigins": ["http://localhost:3000"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]

*🌎 6. Configuración de Zona Horaria (CRÍTICA)*

El microservicio AWS requiere sincronización exacta para generar URLs pre-firmadas.
Si la hora del backend ≠ hora real → AWS rechaza la firma.

Archivo:

microservice-aws/MicroserviceAwsApplication.java

TimeZone.setDefault(TimeZone.getTimeZone("America/Guayaquil"));

¿Por qué es crítico?

Las URLs pre-firmadas dependen de la hora exacta

Un desfase genera errores:
❌ SignatureDoesNotMatch
❌ Expired URL

Recomendación:

DEV: Usar tu zona local (ej. "America/Guayaquil")

PROD: Usar UTC

*🔐 7. Configurar JWT Secret*

Generar clave:

echo -n "clave-muy-segura" | base64


Configurar en msvc-auth.yml:

jwt:
  secret:
    key: <CLAVE_BASE64>
  time:
    expiration: 3600000

*🟢 8. Iniciar Microservicios (ORDEN OBLIGATORIO)*
# 1. Eureka
cd microservice-eureka
./mvnw spring-boot:run

# 2. Config Server
cd ../microservice-configuration
./mvnw spring-boot:run


Esperar 30 segundos.

Luego iniciar los demás en cualquier orden.

🖥️ 9. Ejecutar Frontend
cd inventory-frontend
npm install
npm start


Acceso:
➡️ http://localhost:3000

🎯 Uso del Sistema

Registro e inicio de sesión

Gestión completa del inventario

Carga de imágenes a S3

Notificaciones en tiempo real

Dashboard de métricas

🔍 Verificación Rápida
Servicio	URL
Eureka Dashboard	http://localhost:8761

API Gateway	http://localhost:8080

Health Check	http://localhost:8080/actuator/health
🐛 Troubleshooting
Problema	Causa	Solución
SignatureDoesNotMatch	Zona horaria incorrecta	Configurar America/Guayaquil o UTC
WebSocket no conecta	Auth no está arriba	Verificar puerto 8081
Servicios no aparecen en Eureka	Config Server no cargó	Esperar 1 minuto
Error de BD	Credenciales incorrectas	Verificar YAML


*Algunas imagenes de mi sistema*

<img width="1919" height="921" alt="image" src="https://github.com/user-attachments/assets/e771daeb-596e-49e2-8f27-a1c90588c45a" />

<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/22c650ba-1141-4170-b149-2d2feee18b5a" />

<img width="1899" height="1021" alt="image" src="https://github.com/user-attachments/assets/3eefc3f2-e9dd-4160-b417-74e89bc076c7" />

<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/b481425e-b9ec-49c6-bcab-b235274a7d02" />





