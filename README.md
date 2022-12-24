# Frontend in React

- [Frontend in React](#frontend-in-react)
    - [Week 10 - Día 1](#week-10---día-1)
        - [Daily. Code Review (Week 10)](#daily-code-review-week-10)
        - [Installation](#installation)
            - [EditorConfig / Prettier](#editorconfig--prettier)
                - [Prettier](#prettier)
                - [.editorconfig](#editorconfig)
            - [ESLInt. Configuración extra: TS](#eslint-configuración-extra-ts)
            - [Jest. Configuración extra](#jest-configuración-extra)
            - [NPM Scripts adicionales](#npm-scripts-adicionales)
                - [`npm start`](#npm-start)
                - [`npm test`](#npm-test)
                - [`npm run build`](#npm-run-build)
                - [`npm run eject`](#npm-run-eject)
            - [Custom NPM Scripts adicionales](#custom-npm-scripts-adicionales)
    - [Week 10 - Dia 2](#week-10---dia-2)
        - [Estructura del proyecto](#estructura-del-proyecto)
            - [Features](#features)
            - [Infrastructure / Core](#infrastructure--core)
        - [Developer Tools](#developer-tools)
    - [Week 10 - Dia 3](#week-10---dia-3)
    - [Week 11 - Día 1](#week-11---día-1)
        - [Daily. Code Review (Week 11)](#daily-code-review-week-11)
        - [Enrutamiento](#enrutamiento)
    - [Week 11 - Dia 2: TODO List](#week-11---dia-2-todo-list)
        - [Data](#data)
            - [Data Model](#data-model)
            - [Origen de los datos](#origen-de-los-datos)
                - [Mock síncrono (constante / servicio)](#mock-síncrono-constante--servicio)
                - [Mock de un servicio de datos asíncrono](#mock-de-un-servicio-de-datos-asíncrono)
                - [Servicio de datos asíncrono desacoplado de localStorage](#servicio-de-datos-asíncrono-desacoplado-de-localstorage)
            - [Componentes](#componentes)
                - [Estado en el componente presentador](#estado-en-el-componente-presentador)
                - [Carga inicial de los datos](#carga-inicial-de-los-datos)
                - [Modificaciones del estado](#modificaciones-del-estado)
                - [Paso de las funciones que modifican el estado](#paso-de-las-funciones-que-modifican-el-estado)
                - [Componentes presentadores (1): Controles de formularios](#componentes-presentadores-1-controles-de-formularios)
                - [Componentes presentadores (2): Datos finales en los formularios](#componentes-presentadores-2-datos-finales-en-los-formularios)
                - [Componentes presentadores (3): Botones](#componentes-presentadores-3-botones)
            - [Challenge: Formulario](#challenge-formulario)
    - [Week 11 - Dia 3](#week-11---dia-3)
        - [Daily. Code Review](#daily-code-review)
        - [Testing](#testing)
        - [Nueva feature: NotesList (CRUD)](#nueva-feature-noteslist-crud)
        - [Datos desde un API](#datos-desde-un-api)
            - [Data Repository](#data-repository)
                - [Repository interface](#repository-interface)
                - [NotesRepository](#notesrepository)
                - [Errores en NotesRepository](#errores-en-notesrepository)
            - [Custom Hook](#custom-hook)
    - [Robots CRUD: Front completo React básico + API en JSON Server + Testing](#robots-crud-front-completo-react-básico--api-en-json-server--testing)
    - [Redux](#redux)
        - [Uso de redux - TODO List](#uso-de-redux---todo-list)
        - [Testing Redux](#testing-redux)

## Week 10 - Día 1

### Daily. Code Review (Week 10)

### Installation

Librerías React. React-create-app (template TS). Webpack.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

```shell
npx create-react-app <my-app> --template typescript
npm i react-router-dom
```

Incluye ESLint y Jest
No se pueden sobre-instalar

#### EditorConfig / Prettier

##### Prettier

package.json

```json
    "prettier": {
        "singleQuote": true
    }
```

##### .editorconfig

```txt
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = false

[*.yml]
```

```shell
npx eclint check
```

#### ESLInt. Configuración extra: TS

```shell
npm i -D eslint-config-prettier
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

package.json

```json
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest",
            "plugin:@typescript-eslint/recommended",
            "prettier"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "plugins": [
            "@typescript-eslint"
        ],
        "rules": {
            "testing-library/no-render-in-setup": "off"
        }
    },
```

#### Jest. Configuración extra

package.json

```json
    "jest": {
        "coveragePathIgnorePatterns": [
            "<rootDir>/src/reportWebVitals.ts",
            "<rootDir>/src/index.ts",
        ]
    },
```

#### NPM Scripts adicionales

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Custom NPM Scripts adicionales

package.json

```json
    "scripts": {
        "test:all": "react-scripts test --watchAll --collect-coverage",
        "test:prod": "react-scripts test --watchAll --collect-coverage --watchAll=false",
        "lint": "eslint ."
    },
```

## Week 10 - Dia 2

- Scaffolding: src - public. Index.ts. Client side render
- Configuración TS… ESLint - Prettier. Ficheros tsx. CSS imports (Webpack)
- Scripts de npm: Start: render local. Build. CI/CD. Test.
- Componentes. JSX: template del componente. Expresiones JS {}. Fragments.

React. Conceptos.

- modelo de datos
- Renderización y virtual DOM
- Estado e Inmutabilidad.
- Hooks: useState

Header / Footer. Props

### Estructura del proyecto

#### Features

- Home -> componente Auth para el login/logout del usuario basado en Auth0
- About -> página sin contenido
- Todo -> Demo del funcionamiento de React-redux con una TODO List

#### Infrastructure / Core

- Componentes
    - Layout, que consume Header, Footer y Menu
    - App -> proporciona Layout al componente Routes

### Developer Tools

## Week 10 - Dia 3

Menu: renderizado iterativo. Key.
Composición de componentes: children… Layout
React Developer Tools.
Props drilling. App (menuItems) -> Layout -> Menu
Conditional render: operadores.

Páginas. Estructura de carpetas.

Componente contador. Eventos… Paso de parámetros. Estado. Hook useState. Opciones en el setter

El estado como objeto: counter + counter clicks. Tipo del estado: valor inicial. Inmutabilidad.
Multiples estados. Hook useEffect. Array de dependencias.
Total clicks en la página. Estado en componente padre. Props funcionales

## Week 11 - Día 1

### Daily. Code Review (Week 11)

Se continua le proyecto anterior: ToDoList.
Repaso - Layout del proyecto anterior. - Relaciones entre componentes. Uso de props… - Pages (default export)

### Enrutamiento

Routing… Install react-router-dom
Router: BrowserRouter v. MemoryRouter.
Routes.

- Definición de cada Route.
- Route default.
- Prueba de las urls. Links desde el menu

    - Componentes (Infrastructure / Core)
        - Routes -> Rutas publicas y privadas a las diferentes páginas usando Lazy Loading
        - PrivateRoute -> wrapper para crear las rutas privadas

Pendiente: Lazy Loading. React suspense.

## Week 11 - Dia 2: TODO List

ToDoList: Componentes (Add, List, Task) para el CRUD.

Patrón controlador / presentadores.

- Inicialmente datos y métodos pasados por props
    - Metodos por props en el formulario. Review conceptos de React. Funciones puras
- Componente Add: formularios en React.
    - Estado local del formulario (siempre useState).
    - Validación nativa

### Data

#### Data Model

El modelo de datos (Task) se representa mediante un tipo de TS
(opción más adecuada que un interface por tratarse solo de propiedades, sin métodos)

```tsx
export type TaskStructure = {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
};
```

Al menos en una fase inicial se añade una clase que implementa
la instanciación de objetos correspondientes al tipo anterior.

En ella se incluye la asignación de un identificador a las tareas,
empleando para ello un método estático de la clase

```tsx
export class Task implements TaskStructure {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isCompleted: boolean;
    constructor(public title: string, public responsible: string) {
        this.id = Task.generateId();
        this.isCompleted = false;
    }
}
```

La referencia al API crypto mediante window hace posible que sea testado fácilmente,
a pesar de que en el entrono Node usado por Jest durante los tests
no exista el método getRandomValues en la clase Crypto

#### Origen de los datos

##### Mock síncrono (constante / servicio)

Como primera aproximación se utiliza una fuente síncrona de los datos:

- Mock de datos desde un array.
- Una función (servicio) que se limita a retornar el array con los datos

##### Mock de un servicio de datos asíncrono

La función getTasks se tipa como promesa de array de tareas.
Comprueba si existen datos en localStorage para devolverlos
En caso de que no existan, carga los datos iniciales
de una constante TASKS (mock de las tareas) y los almacena en localStorage

En su versión mas simple sería una función async con el código antes descrito

```tsx
export const getTasks = async (): Promise<Array<TaskType>> => {
    const data = localStorage.getItem('Tasks');
    if (!data) {
        localStorage.setItem('Tasks', JSON.stringify(TASKS));
        return TASKS;
    }
    return JSON.parse(data as string) as Array<TaskType>;
};
```

Para poder comprobar un retaso en el tiempo de la carga de datos,
una segunda versión de la anterior función instancia la promesa con new Promise
y la resuelve en un setTimeout

```tsx
export const getTasks = (): Promise<Array<TaskType>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = localStorage.getItem('Tasks');
            if (!data) {
                localStorage.setItem('Tasks', JSON.stringify(TASKS));
                resolve(TASKS);
            }
            resolve(JSON.parse(data as string) as Array<TaskType>);
        }, 2000);
    });
};
```

La función que guarda los datos en localStorage se limita a usar
el correspondiente método setItems de la web APi

```tsx
export const saveTasks = async (tasks: Array<Task>) => {
    consoleDebug('Saving');
    localStorage.setItem('Tasks', JSON.stringify(tasks));
};
```

##### Servicio de datos asíncrono desacoplado de localStorage

El problema del ejemplo anterior es su acoplamiento a localStorage.
El servicio Storage nos permite encapsular las operaciones de localStorage
proporcionando un buen ejemplo de Single Responsibility y del uso del tipado genérico

```tsx
export const getStorageList = <T,>(storeName: string): Array<T> => {
    const result = localStorage.getItem(storeName);
    if (!result) return [];
    return JSON.parse(result);
};

export const setStorageList = <T,>(storeName: string, data: Array<T>): void => {
    localStorage.setItem(storeName, JSON.stringify(data));
};
```

Utilizando este servicio puede refactorizarse el servicio
que proporciona la lista de tareas de forma asíncrona

```tsx
export const getTasks = async (): Promise<Array<TaskStructure>> => {
    const data = getStorageList<Task>('Tasks');
    if (!data.length) {
        setStorageList('Tasks', TASKS);
        return TASKS;
    }
    return data;
};

export const saveTasks = async (tasks: Array<Task>) => {
    consoleDebug('Saving');
    setStorageList('Tasks', tasks);
};
```

#### Componentes

##### Estado en el componente presentador

El componente 'controlador' necesita definir un estado (lista de tareas)
junto con los métodos responsables del CRUD en el estado

```tsx
const initialState: Array<TaskStructure> = [];

const [tasks, setTasks] = useState(initialState);

const handleLoad = async () => {};
const handleAdd = function (task: TaskStructure) {};
const handleUpdate = function (task: Partial<TaskStructure>) {};
const handleDelete = function (id: TaskStructure['id']) {};
```

Los métodos responsables del CRUD realizan operaciones sobre el array de tareas (obtenerlo o modificarlo) para luego actualizar el estado con el nuevo array haciendo uso de la función setter proporcionada por el useState

```tsx
const handleLoad = async () => {
    const data = await getTasks();
    setTasks(data);
};

const handleAdd = function (task: TaskStructure) {
    const data = [...tasks, task];
    setTasks();
};

const handleUpdate = function (task: Partial<TaskStructure>) {
    const data = tasks.map((item) =>
        item.id === task.id ? { ...item, ...task } : item
    );
    setTasks(data);
};

const handleDelete = function (id: TaskStructure['id']) {
    setTasks(tasks.filter((item) => item.id !== id));
};
```

Estas operaciones van a ser desencadenadas por:

- la ejecución inicial del componente
- distintos eventos de usuario producidos en los componentes 'presentadores'

##### Carga inicial de los datos

Gracias al hook useEffect, la función handleLoad se desencadena únicamente
cuando se crea la instancia del componente,
al no haber en el array de dependencias ninguna que cambie con posterioridad

```tsx
useEffect(() => {
    handleLoad();
}, []);
```

Todo el proceso de creación del componente tiene tres etapas

- renderización inicial sin datos
- carga de los datos
- hidratación del componente con los datos y nueva renderización

Hasta alcanzar esta última etapa, es buena práctica renderizar de forma condicional
algún feedback que le indique al usuario que se están cargando (Loading...) los datos

```tsx
{
    !tasks.length ? <p>Loading ....</p> : <ul className="task-list">...</ul>;
}
```

Como indicador del proceso de carga suelen utilizarse elementos gráficos tipo
'loader' o 'spinner' basados en CSS o en JS

##### Modificaciones del estado

La relación entre los cambios de estado y la actualización persistente de los datos
puede seguir básicamente dos patrones

- enfoque optimista: cambia directamente el estado,
    suponiendo que la actualización persistente no dará problemas.
    En caso contrario será necesario revertir el cambio de estado.
- enfoque no optimista: espera a recibir confirmación
    del cambio en los datos persistentes, y sólo entonces modifica el estado

En este caso, al ser la persistencia solamente local es más adecuado el primer enfoque.
Una vez modificado el estado, el proceso es siempre el mismo,
mediante el servicio que accede al localStorage (saveTasks)  
por lo que puede de ser invocado desde un useEffect
con el propio estado (lista de tareas) como dependencia

```tsx
useEffect(() => {
    consoleDebug('useEffect', { tasks });
    if (tasks.length) {
        saveTasks(tasks);
    }
}, [tasks]);
```

Cuando exista una sincronización con el back, sera más sencillo utilizar un enfoque no-optimista.

##### Paso de las funciones que modifican el estado

las modificaciones del estado como consecuencia de las interacciones del usuario
se desencadenan siempre en los componentes 'presentadores'.
Por tanto es necesario que estos reciban por props las funciones 'manejadoras' de los cambios.

```tsx
<Add handleAdd={handleAdd}></Add>
...
<Item
    item={item}
    handleUpdate={handleUpdate}
    handleDelete={handleDelete}
></Item>
```

##### Componentes presentadores (1): Controles de formularios

Una de las funciones de los componentes presentadores es recoger datos de los usuarios mediante formularios,
como sucede en el caso del componente Add

Cada formulario incluye un estado local que agrupa, normalmente como un objeto,
el conjunto de variables que recogerán los datos proporcionados al formulario

```ts
const initialFormData: Partial<TaskStructure> = {
    title: '',
    responsible: '',
};

const [formData, setFormData] = useState(initialFormData);
```

Cada control de un formulario se asocia con una de las variables del estado local del formulario
El valor del control (el checked en caso de los checkbox) se iguala a la variable,
lo que proporciona un **data binding** en una dirección.
El name del control se iguala al de la variable y su evento input (o change)
se asocia con el manejador de eventos que proporcionara la otra dirección del binding,
para completar el **"two way data binding"**

```tsx
<label htmlFor="title">Tarea</label>
<input
    type="text"
    name="title"
    id="title"
    placeholder="Describe la tarea"
    value={formData.title}
    onInput={handleInput}
    required
/>
```

En respuesta a los eventos input de un control, la propiedad de los datos del formulario
a la que está asociada recibe el nuevo valor asignado por el usuario al control del formulario

```ts
const handleInput = (ev: SyntheticEvent) => {
    const element = ev.target as HTMLFormElement;
    setFormData({ ...formData, [element.name]: element.value });
};
```

Para conseguir ello en una única función se aprovecha la notación [] de los objetos
que permite hacer referencia a una propiedad mediante el nombre obtenido al evaluar el valor de una variable

##### Componentes presentadores (2): Datos finales en los formularios

Una vez completados los datos requeridos por el formulario, el usuario tiene a su disposición el botón submit,
que disparara el evento submit del propio formulario.

Este evento se gestiona en el correspondiente handle, cuya primera función es
deshabilitar el comportamiento por defecto del submit, que provocaría una indeseada recarga de la página.

```tsx
const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    handleAdd(
        new Task(
            formData.title as string,
            formData.responsible ? formData.responsible : ''
        )
    );
    setFormData(initialFormData);
};
```

El resto del manejador esta vinculado con desencadenar la función recibida por props
que por su parte incorporara al estado los datos recogidos del usuario.

En esta ocasión, al utilizarse una persistencia en localStorage, se incluye como paso previo la creation de una item completo (task), incluida la asignación de un id, de lo que se encarga el constructor de la clase Task.

##### Componentes presentadores (3): Botones

La interacción con el usuario más habitual al margen de los formularios, son los botones y los controles independientes de formulario, como los que aparecen en el componente Item

```tsx
<div className="item-task">
    <span className="item-task__start">
        <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={handleChange}
        />
        <span>{item.id}</span>
    </span>
    ...
    <span role="button" className="item-task__end button" onClick={handleClick}>
        🗑️
    </span>
</div>
```

En cualquiera de los casos, para definir la respuesta a los eventos (onClick, onChange...)
es buena practica declarar una función para ello, aunque su código se tan simple
como invocar la función recibida desde el componente presentador para modificar el estado

```tsx
const handleChange = () => {
    item.isCompleted = !item.isCompleted;
    handleUpdate(item); // función recibida por props
};

const handleClick = () => {
    handleDelete(item.id); // función recibida por props
};
```

#### Challenge: Formulario

## Week 11 - Dia 3

### Daily. Code Review

### Testing

Testing de componentes con react/testing-library. Conceptos (Kent C. Dodds); render y screen. Matchers
Paso de props en los tests. Test del child content. MemoryRouter.
Componentes dinámicos: mock "handle" functions. Eventos: userEvent. Opciones de jest runner. Coverage

### Nueva feature: NotesList (CRUD)

- Feature/Page: nueva página con su test
- App: nuevo item en la lista de MenuItems
- Nueva ruta en AppRoutes / AppRutesLazy
- Tests correspondientes a la nueva ruta
- Modelo de datos y su test
- Servicio mock de los datos y su test
- Componentes con sus tests:
    - Add
    - Item
    - List

### Datos desde un API

- Server (JSON Server): EndPoint <http://localhost:3500/tasks> (from .env)

#### Data Repository

- Data Repository
    Servicio de fetch de los datos (Similar al usado en componente vanilla, conn clases)

##### Repository interface

Abstract repository interface -> use of TS generic

```ts
export interface Repository<T> {
    load: () => Promise<T[]>;
    // como alternativa, load puede denominarse search
    queryId: (id: string) => Promise<T>;
    // No se incluye una query potencialmente más genérica query: ({ id }: { id: string }) => Promise<T>;
    create: (payload: Partial<T>) => Promise<T>;
    update: (payload: Partial<T>) => Promise<T>;
    delete: (id: string) => Promise<string>;
}
```

##### NotesRepository

Class implementando el interface
El constructor recibe la url de la API que se utiliza, o emplea el valor por defecto definido
Cada método de la clase encapsula una operación **fetch** con uno de los métodos Http, de acuerdo con el estándar REST

- load / queryId (Read) -> HTTP GET
- create -> HTTP POST
- update -> HTTP PATCH
- delete -> HTTP DELETE

Fetch devuelve una promesa que una vez resuelta proporciona en objeto **Response**

En el existe la propiedad **ok**, que vale true para las respuestas http de status 2xx.

En las respuestas **NO OK** se genera un error, reject de la promesa.

En las respuestas OK, se procesa el body mediante el método json del objeto response y se devuelve la nueva promesa con los datos contenidos.

Este procedimiento puede llevarse a cabo con then/catch o utilizando async/await

```ts
    load(): Promise<NoteStructure[]> {
        return fetch(this.url).then((resp) => {
            if (!resp.ok)
                throw new Error(`Error ${resp.status}: ${resp.statusText}`);
            return resp.json();
        });
    }
```

```ts
    async create(payload: Partial<NoteStructure>): Promise<NoteStructure> {
        const resp = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
```

En los casos en que existe body (POST/PATCH) es necesario darle valor de forma serializada (string JSON generado mediante JSON.stringify) e indicar en las cabeceras HTTP el tipo del contenido: 'Content-type': 'application/json'

```ts
async update(payload: Partial<NoteStructure>): Promise<NoteStructure> {
    if (!payload.id) return Promise.reject(invalidIdError);
    const resp = await fetch(this.url + payload.id, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json',
        },
    });
    if (!resp.ok)
        throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    return await resp.json();
}
```

En el caso del delete, el API de JSON-server devuelve siempre un objeto vacío, por lo que no aporta nada procesar el contenido del body.
La opción que hemos empleado es devolver el id del item en caso de que haya sido borrado.

```ts
async delete(id: NoteStructure['id']): Promise<NoteStructure['id']> {
    if (!id) return Promise.reject(invalidIdError);
    const resp = await fetch(this.url + id, {
        method: 'DELETE',
    });
    if (!resp.ok)
        throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    return id;
}
```

##### Errores en NotesRepository

Los errores en el repository representan dos posibles situaciones

- fetch genera un error, generalmente porque la conexión no a sido posible

- nuestro código genera un error cuando la respuesta al fetch viene marcada como ok: false (códigos HTTP 4xx, 5xx ...)

En este segundo caso de crea el mensaje de error

```ts
`Error ${resp.status}: ${resp.statusText}`;
```

En consecuencia siempre que se usen los metodos del repo debe ser en una estructura try/catch que gestione los posibles errores para proporcionarle el feedback adecuado al usuario

#### DataModel: ids

Al utilizar datos procedentes de un API es posible que el id de cada item
sea generado tanto en el back como en el front. 
Con JSON-server se da el primero de los casos

Puede ser util definir interfaces del modelo de datos con y sin id

```ts
export type NoteNoId = {
    title: string;
    author: string;
    isImportant: boolean;
};

export type NoteStructure = {
    id: string;
    title: string;
    author: string;
    isImportant: boolean;
};
```

Si existen clases constructoras, será util disponer también de ls dos posibilidades

```ts
export class Note implements NoteStructure {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    id: string;
    isImportant: boolean;
    constructor(public title: string, public author: string) {
        this.id = Note.generateId();
        this.isImportant = false;
    }
}

export class NoteLite implements NoteNoId {
    isImportant: boolean;
    constructor(public title: string, public author: string) {
        this.isImportant = false;
    }
}
```

#### Custom Hook

En el patrón controlador/presentadores, toda la **lógica del estado**
reside en el componente controlador (List)

Un primer paso para reducir la complejidad del componente controlador
es trasladar la lógica del estado a un **custom hook**.
El segundo paso, se verá mas adelante, es que el estado resida en un **contexto**.

El primero de estos pasos aislado, solo se usa por motivos didácticos 
pero NO resulta una situación adecuada ... 

En cualquier caso, el hook será ahora el que

- instancia el servicio repository
- define el estado y su valor inicial
- define los métodos que lo manejan
- devuelve un objeto con el estado y sus métodos 

```ts
export function useNotes(): UseNotes {

    const repo = useMemo(() => new NotesRepo(), []);
    
    const initialState: Array<NoteStructure> = [];

    const [notes, setNotes] = useState(initialState);

    const handleLoad = useCallback(async () => {
        //...
    }, [repo]);

    const handleAdd = async function (note: NoteNoId) {
        //...
    };

    const handleUpdate = async function (notePayload: Partial<NoteStructure>) {
        //...
    };

    const handleDelete = async function (id: NoteStructure['id']) {
        //...
    };

    return {
        notes,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
```

En ellos se aplica la estrategia no-optimista de
esperar los resultados de la llamada al API antes de actualizar el estado

```ts
const handleLoad = useCallback(async () => {
    try {
        const data = await repo.load();
        setNotes(data);
        consoleDebug('LOAD');
    } catch (error) {
        handleError(error as Error);
    }
}, [repo])
```

En el caso del handleLoad, que sera incluido en el array de dependencias
del useEffect del componente que lo use se emplea 
el **patrón memoización** (memoization or memoisation) mediante el **useCallback**,
almacenando la instancia de la función la primera vez que es llamada
para evitar reinstanciarla en llamadas sucesivas.

El mismo patrón se utiliza en el **useMemo** para el caso de las instancias de objetos

El componente List queda simplificado al hacer uso del hook

```ts
const { notes, handleLoad, handleAdd, handleDelete, handleUpdate } =
        useNotes();

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

}
```

Igual que anteriormente

- `handleAdd`, `handleDelete`, `handleUpdate` pasan por props
    a los componentes presentadores (Add e Item)
- la iteración sobre el array `notes` de lugar a las instancias
    del componente Item

```tsx
<Add handleAdd={handleAdd}></Add>
<h3>Lista de notas</h3>
{!notes.length ? (
    <p>Loading ....</p>
) : (
    <ul className="note-list">
        {notes.map((item) => {
            return (
                <li key={item.id}>
                    <Item
                        item={item}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    ></Item>
                </li>
            );
        })}
    </ul>
)}
```

---

## Robots CRUD: Front completo React básico + API en JSON Server + Testing

## Redux

### Uso de redux - TODO List

- action.types -> object / enum

- action.creators -> createAction (RTK)
- reducer -> createReducer (RTK)
- (ALT) -> slice (RTK)

- test del reducer

- modelo de datos -> type / interface / class
- store -> configureStore (RTK) + types
- provider -> Provider (react-redux)

- componente (view)

    - useSelector() (react-redux)
        useSelector((state: rootState ) => state.`branch`)
    - useDispatch() (react-redux)

    - ¿Integramos servicioAPI?
        - como servicio externo
        - como thunk

### Testing Redux
