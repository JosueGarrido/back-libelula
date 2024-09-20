# Proyecto de Gestión de Cotizaciones y Pólizas de Seguros

Este proyecto es una plataforma de gestión de cotizaciones y pólizas de seguros, desarrollado con **NestJS** y **MongoDB**. El proyecto incluye funcionalidades de autenticación con **JWT**, control de acceso por roles, pruebas automatizadas, y un pipeline de CI/CD integrado con **GitHub Actions** y **Elastic Beanstalk** para despliegue en **AWS**.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Instalación](#instalación)
- [Documentación de la API](#documentación-de-la-api)
- [Pruebas](#pruebas)
- [Despliegue en AWS](#despliegue-en-aws)
- [Documentación Técnica](#documentación-técnica)

## Descripción

Este proyecto permite a las empresas gestionar cotizaciones de seguros, pólizas, clientes y entidades. Los usuarios pueden crear, actualizar y consultar cotizaciones y pólizas, mientras que el sistema asegura un control de acceso adecuado basado en roles como **admin** y **broker**.

El proyecto cuenta con:
- Control de autenticación por **JWT**.
- Control de acceso basado en roles.
- Gestión de usuarios, clientes, pólizas y cotizaciones.
- Documentación automática de la API con **Swagger**.
- Pruebas unitarias y de integración con **Jest**.
- Despliegue continuo en **AWS Elastic Beanstalk**.

## Características

- **Autenticación**: Autenticación basada en **JWT** con control de acceso por roles.
- **Gestión de usuarios**: Creación y gestión de usuarios asociados a entidades.
- **Gestión de clientes**: Gestión de clientes para las cotizaciones.
- **Gestión de pólizas**: Creación y actualización de pólizas de seguros.
- **Cotizaciones**: Creación y actualización de cotizaciones.
- **Documentación automática**: Documentación de la API generada con **Swagger**.
- **Pruebas unitarias**: Pruebas automatizadas con **Jest** y **GitHub Actions**.
- **Despliegue automático**: Despliegue continuo en **AWS Elastic Beanstalk**.

## Instalación

### Requisitos previos

- Node.js (v16 o superior).
- MongoDB (local o en la nube como MongoDB Atlas).
- AWS CLI configurada (si deseas desplegar en AWS).

### Pasos de instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/JosueGarrido/back-libelula
    cd back-libelula
    ```

2. Instalar dependencias:

    ```bash
    npm install
    ```

3. Configurar las variables de entorno en un archivo `.env`:

    ```bash
    # .env
    JWT_SECRET=your_jwt_secret
    DATABASE_URL=mongodb://localhost/nest
    AWS_ACCESS_KEY_ID=your_aws_access_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret_key
    ```

4. Iniciar el servidor localmente:

    ```bash
    npm run start:dev
    ```

La aplicación estará disponible en `http://localhost:3000`.

## Documentación de la API

La documentación de la API está generada automáticamente usando **Swagger**. Para acceder a la documentación:

1. Iniciar la aplicación.
2. Visitar `http://localhost:3000/api/docs`.

Desde ahí podrás ver y probar todos los endpoints.

## Pruebas

El proyecto cuenta con un conjunto completo de pruebas unitarias y de integración escritas en **Jest**. Para ejecutar las pruebas:

```bash
npm run test
```

Las pruebas están integradas en el pipeline de GitHub Actions, lo que asegura que cada nuevo cambio en el código es verificado antes de ser desplegado.

### Scripts de prueba disponibles

- npm run test: Ejecuta todas las pruebas.
- npm run test:watch: Ejecuta las pruebas en modo observador.
- npm run test:cov: Ejecuta las pruebas y genera un reporte de cobertura.


## Despliegue en AWS

El despliegue de este proyecto está automatizado mediante AWS Elastic Beanstalk. El pipeline de CI/CD en GitHub Actions se encarga de:

1. Ejecutar las pruebas.
2. Construir el proyecto.
3. Desplegar el código en Elastic Beanstalk automáticamente.

## Documentacion Tecnica

Además de la documentación de la API generada con Swagger, puedes generar documentación técnica completa utilizando Compodoc.

### Generar documentacion con Compodoc

1. Instalar Compodoc (si no lo has hecho):

```bash
npm install -g @compodoc/compodoc
```

2. Generar la documentación:

```bash
compodoc -p tsconfig.json
```

3. Servir la documentación localmente:

```bash
compodoc -s
```

La documentación estará disponible en http://localhost:8080.

## Pipeline de CI/CD con GitHub Actions

El proyecto está configurado con un pipeline de GitHub Actions que incluye:

- Instalación de dependencias.
- Ejecución de pruebas.
- Linting del código.
- Despliegue en AWS Elastic Beanstalk.

Puedes encontrar la configuración del pipeline en el archivo .github/workflows/ci.yml.