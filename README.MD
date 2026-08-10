# Cómo usar el repositorio template

Guía paso a paso para arrancar las prácticas de la materia.

Este repositorio es un **template**: cada alumno crea su propia copia independiente, no un fork. Tu copia no tiene ninguna relación con el repo del profesor, así que no hay riesgo de mandar cambios a otro lado por error.

## 0. Requisitos previos

- Tener una cuenta de GitHub.
- Tener Git instalado (`git --version` en la terminal para verificar).
- Tener un editor de código (por ejemplo VS Code).

## 1. Crear tu propio repositorio a partir del template

1. Entrá al repositorio del profesor en GitHub: https://github.com/mef760/proyecto-aplicaciones-web-cliente-2c-2026
2. Hacé clic en el botón verde **"Use this template"** → **"Create a new repository"** (arriba a la derecha, al lado de "Code").
3. Elegí tu cuenta como dueño, poné un nombre al repo (por ejemplo `app-web-cliente-tunombre`) y marcalo como **público** (el profesor necesita poder verlo sin permisos especiales).
4. Hacé clic en **Create repository**.

Esto te crea un repositorio 100% tuyo: `github.com/TU-USUARIO/nombre-repo`. No es un fork, no tiene conexión con el original, y vos sos el único dueño.

## 2. Clonar tu repositorio

```bash
git clone https://github.com/TU-USUARIO/nombre-repo.git
cd nombre-repo
```

## 3. Crear una rama para tu trabajo

Aunque el repo es tuyo, conviene practicar el flujo de ramas + PR. Usá un nombre de rama descriptivo (por ejemplo `practica1`, `tp2-formulario`, etc.):

```bash
git checkout -b practica1
```

> Nunca trabajes directo sobre `main`: siempre creá una rama antes de tocar archivos.

## 4. Hacer tus cambios

Editá los archivos según la consigna. Después:

```bash
git add .
git commit -m "Descripción breve de lo que hiciste"
git push origin practica1
```

## 5. Abrir el Pull Request (dentro de tu propio repo)

1. Andá a tu repositorio en GitHub.
2. Vas a ver un botón que dice **"Compare & pull request"** — hacé clic ahí.
3. Verificá que tanto la rama base como la de comparación pertenezcan a **TU** repositorio:
   - base: `main`
   - compare: `practica1`
4. Completá la plantilla que aparece automáticamente (ver [`.github/pull_request_template.md`](.github/pull_request_template.md) para el detalle de qué información pide).
5. Hacé clic en **Create pull request** y después en **Merge pull request** para integrarlo a tu `main`.

Todo este proceso queda dentro de tu propio repositorio. El profesor accede a tu repo (por el link que le compartas) para revisar el código y el PR, pero nunca recibe un PR en su repositorio.

## 6. Repetir el flujo para cada práctica

Para cada nueva práctica o entrega, repetí los pasos 3 a 5 con una rama nueva (por ejemplo `practica2`, `practica3`, ...), partiendo siempre de `main` actualizado:

```bash
git checkout main
git pull origin main
git checkout -b practica2
```

## 7. Compartir el repositorio con el profesor

Copiá el link de tu repositorio (`https://github.com/TU-USUARIO/nombre-repo`) y entregalo como indique el profesor (formulario, mail, etc.).

## Errores comunes

- **Buscar el botón "Fork" en vez de "Use this template"**: son cosas distintas. Fork crea una copia conectada al original; template crea una copia independiente. Usá siempre "Use this template".
- **Trabajar directo sobre `main`**: creá una rama antes de tocar archivos, para practicar el flujo de PR.
- **Dejar el repositorio como privado**: si el repo no es público, el profesor puede no tener acceso para revisarlo. Verificá los ajustes en Settings → General → Danger Zone si necesitás cambiar la visibilidad.
- **No hacer push de la rama antes de abrir el PR**: si `git push origin practica1` falla, revisá que la rama exista localmente (`git branch`) y que el remoto esté bien configurado (`git remote -v`).
