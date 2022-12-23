# Testing

- [Testing](#testing)
    - [Testing de componentes con react/testing-library](#testing-de-componentes-con-reacttesting-library)
        - [Estructura general de una suite de test](#estructura-general-de-una-suite-de-test)
        - [Componente 'estático'](#componente-estático)
        - [Componente 'interactivos'](#componente-interactivos)
        - [Funciones 'espiadas' o 'de prueba' (test stubs)](#funciones-espiadas-o-de-prueba-test-stubs)
        - [Test del child content](#test-del-child-content)
        - [Multiples Componentes](#multiples-componentes)
        - [Paso de props en los tests](#paso-de-props-en-los-tests)
    - [Rutas y páginas](#rutas-y-páginas)
        - [Test de las páginas](#test-de-las-páginas)
        - [Tests de rutas. Memory Router](#tests-de-rutas-memory-router)
    - [Testing de funciones y servicios](#testing-de-funciones-y-servicios)
        - [class Task](#class-task)
        - [Storage Service](#storage-service)
        - [Mock Tasks Service](#mock-tasks-service)
    - [Testing de componentes complejos. Mocks](#testing-de-componentes-complejos-mocks)
        - [Testing handleLoad](#testing-handleload)
        - [Testing handleAdd](#testing-handleadd)
        - [Testing handleUpdate](#testing-handleupdate)
        - [Testing handleDelete](#testing-handledelete)

## Testing de componentes con react/testing-library

Conceptos (_Kent C. Dodds_)
[testing-library](https://testing-library.com/docs/)

- test de componentes (react y otros): elementos de interfaz
- se necesita dar soporte a la renderización, como si existiera un DOM: **render** y **screen**.
- se testa la interacción del usuario con el **interfaz**, NO la implementación
- existen una serie de [queries](https://testing-library.com/docs/queries/about) más o menos adecuadas a esa perspectiva
    - getBy..., getAllBy..., queryBy..., queryAllBy..., findBy..., findAllBy...
    - ...ByRole
    - ...ByLabelText
    - ...ByPlaceholderText
    - ...ByText
    - ...ByDisplayValue
    - ...ByAltText
    - ...ByTitle
    - ...ByTestId
- existen **matchers** específicos para los interfaces renderizados (toBeInTheDocument)

### Estructura general de una suite de test

```tsx
describe('Given Foo component', () => {
    describe('When it has been render', () => {
        beforeEach(() => {
            render(<Foo />);
        });
        test('Then the title should be in the screen', () => {
            // Se selecciona un elemento preferiblemente por rol
            // Se comprueba que esta en el 'documento' (screen)
        });
    });
});
```

### Componente 'estático'

- Se seleccionan el/los elemento/s destacados del componente, preferiblemente por **rol**
- Se comprueba que esta o están en el 'documento' (screen)

```tsx
const elementHeader = screen.getByRole('heading', {
    name: 'Learning Components',
});
expect(elementHeader).toBeInTheDocument();
```

Si existen varios elementos que coinciden con la query, debe usarse getAllBy... y se obtendrá un array de elementos

El **'entorno'** del componente en la función **render** debe simular su entorno real

- wrapper que lo envuelvan (Routers, Providers...)
- child y otras props en caso que que los espere

```tsx
render(
    <Router>
        <Header>
            <></>
        </Header>
    </Router>
);
```

### Componente 'interactivos'

Se deben comprobar todas las posibles interacciones del usuario con el componente
Para ello se utiliza **userEvent**, importado desde '@testing-library/user-event'

En los inputs, el evento type permite simular que se escribe en ellos
El matcher toHaveValue permite comprobar el valor recogido en el input

```tsx
const mockTitle = 'Test task';
const inputElement = screen.getByRole('textbox'); // <input>
expect(inputElement).toBeInTheDocument();
userEvent.type(inputElement, mockTitle);
expect(inputElements[0]).toHaveValue(mockTitle);
```

En los botones, el evento click permite la interacción con el botón
para poder testear alguno de sus efectos:

- los cambios en el interfaz
- las llamadas a las funciones 'espiadas'

El primer caso lo vemos en los test del contador,
donde los clicks en uno u otro botón
se reflejan en los valores que se muestran en el componente

```tsx
button = screen.getByRole('button');
userEvent.click(button);
const value = screen.getByText(/value: 1/i);
const clicks = screen.getByText(/clicks: 1/i);
expect(value).toBeInTheDocument();
expect(clicks).toBeInTheDocument();
```

En el componente Add (añadir tarea) la interacción con el botón
tiene como resultado que se invoque una función,
que tendrá que estar convertida en stub para completar el test.

```tsx
elementButton = screen.getByRole('button');
userEvent.click(elementButton);
expect(handleAdd).toHaveBeenCalled();
```

### Funciones 'espiadas' o 'de prueba' (test stubs)

En Jest incluye tanto **mocks** como **spies**, aunque se utilizan más los primeros
Para conseguir un **test unitario** se deberían tratar como stubs TODOS
los elementos ajenos al que se está probando,
es decir la mayoría de los imports que utiliza el módulo que estamos testando.

Sin embargo, en los test de componentes es habitual probar determinado componente
dejando que renderice todos los que normalmente contiene (su jerarquía de descendientes)

### Test del child content

Cuando la relación entre componentes se construye por composición (child component)
es mucho más sencillo el test unitario, al poder proporcionar al componente wrapper
cualquier contenido específico para el test

```tsx
render(
    <Router>
        <Layout>
            <p>Contenido para el test</p>
        </Layout>
    </Router>
);
```

### Multiples Componentes

Al tener un componente 'padre' que refleja las interacciones en los componentes 'hijos' podemos optar por testarlo de forma integrada

```tsx
render(<Counters />);
buttons = screen.getAllByRole('button');
// los botones están en los componentes hijos
userEvent.click(buttons[0]);
// se interacciona con uno de los botones
const clicks = screen.getByText(/clicks totales: 1/i);
// el interfaz en el padre refleja los cambios en el estado
expect(clicks).toBeInTheDocument();
```

Como se trata de interfaces, no importa la implementación implicada en el cambio,
sino unicamente como se refleja este en el interface que puede ser visto por el usuario

### Paso de props en los tests

Si el componente recibe funciones por props, estas se convierten en mocks y se le pasan al componente

Así sucede en los componente 'presentadores', dentro del modelo 'controlador/presentadores'

```tsx
const handleAdd = jest.fn();
render(<Add handleAdd={handleAdd}></Add>);
```

Posteriormente, como en el botón ya mencionado,
se puede comprobar que la función 'mock' ha sido llamada

Una situación similar la vemos en el componente Item, utilizado para
presentar cada uno de los elementos de la iteración con un array

```tsx
const updateTask = jest.fn();
const deleteTask = jest.fn();
const mockTitle = 'Test task';
const mockUser = 'Test user';
const mockTask = new Task(mockTitle, mockUser);

render(
    <Item
        item={mockTask}
        handleUpdate={updateTask}
        handleDelete={deleteTask}
    ></Item>
);
```

## Rutas y páginas

### Test de las páginas

Son componentes muy sencillos.
En muchos casos renderizan un título o exclusivamente los componentes que contienen.

Si estos componentes son complejos, pueden convertirse en mocks
para tetar aisladamente la página

```tsx
jest.mock('../components/list/list');
(List as jest.Mock).mockImplementation(() => {
    return <p>Mock List</p>;
});

const title = /Todo/i;
render(<TodoPage />);
const elementHeader = screen.getByRole('heading', {
    name: title,
});
expect(elementHeader).toBeInTheDocument();
```

### Tests de rutas. Memory Router

En principio las rutas pueden quedar 'cubiertas' en el coverage
si se testan las páginas/componentes a las que apuntan.

También es posible testarlas directamente.

Para no depender de los componentes reales, se utiliza un mock de estos
cuya implementación se limita a mostrar un titulo

```tsx
import HomePage from '../../../features/home/pages/home.page';
const pageTitle = 'Test Home';

jest.mock('../../../features/home/pages/home.page');

(HomePage as jest.Mock).mockReturnValue(<p>{pageTitle}</p>);
```

Al renderizar el componente de rutas, el MemoryRouter permite indicarle que ruta se esta usando,
y en consecuencia comprobar que se a renderizado el mock del componente asociado a esa ruta.

```tsx
paths = ['/home', '/todo', '/about'];
render(
    <Router initialEntries={paths} initialIndex={0}>
        <AppRoutes items={items} />
    </Router>
);

const title = /pageTitle/i;
const element = screen.getByText(title);
expect(element).toBeInTheDocument();
```

## Testing de funciones y servicios

Los servicios abstraen la lógica al margen del interfaz.
Además de otras mejoras de diseño, con ello son más fáciles de testear.
Y más aun en la medida en que sean o se aproximen a funciones puras.

Si los servicios dependen de elementos externos, importados desde librerías o
proporcionados directamente por las APIs del navegador (locaStorage, fetch...)
se deben tratar como stubs para conseguir tests unitarios.

### class Task

El test de una clase que representa el modelo de datos
se limita a comprobar que la instancia incluye las propiedades esperadas

```ts
const mockTitle = 'Test task';
const mockResponsible = 'Test user';
const result = new Task(mockTitle, mockResponsible);
expect(result).toBeInstanceOf(Task);
expect(result).toHaveProperty('title', mockTitle);
expect(result).toHaveProperty('responsible', mockResponsible);
expect(result).toHaveProperty('isCompleted', false);
```

### Storage Service

localStorage y sessionStorage con métodos de la clase (o función constructora) Storage.
Como en cualquier otra caso de objetos instanciados con el patrón constructor,
puede accederse a las propiedades del prototype para convertir los métodos de instancia en mocks.

Al tratarse de funciones síncronas, la implementación de la función mock puede definirse con el método
mockReturnValue. Distintas implementaciones definirán los distintos casos de uso

- que existan datos en localStorage
- que no exista el item en localStorage, con lo que se retorna un null

```ts
const testItem = { name: 'Test' };

Storage.prototype.getItem = jest
    .fn()
    .mockReturnValue(JSON.stringify([testItem]));

Storage.prototype.getItem = jest.fn().mockReturnValue(null);
```

Cuando la función mock es void, no es necesario definir ninguna implementación al crear el mock

```ts
Storage.prototype.setItem = jest.fn();
```

El resto del test se limita a comprobar que las funciones del servicio utilizan los mocks proporcionados y gestionan los datos de forma correcta. En ningún caso hay interacción real con el API de Storage

El caso de uso en que existan datos en localStorage:

```ts
const result = getStorageList<TestItem>('test'); // el servicio que se esta testando
expect(result).toEqual([testItem]);
expect(Storage.prototype.getItem).toHaveBeenCalledWith('test');
```

El caso de uso en que no exista el item en localStorage:

```ts
const result = getStorageList<TestItem>('test'); // el servicio que se esta testando
expect(result).toEqual([]);
expect(Storage.prototype.getItem).toHaveBeenCalledWith('test');
```

La segunda de las funciones del servicio:

```ts
setStorageList<TestItem>('test', [testItem]);
expect(Storage.prototype.setItem).toHaveBeenCalledWith(
    'test',
    JSON.stringify([testItem])
);
```

### Mock Tasks Service

Servicio que simula (mock) una fuente asíncrona de datos utilizando el Storage Service

El primer paso por tanto es hacer el mock de nuestro servicio.
Al tratarse de un módulo, es necesario hacer el mock del propio módulo,
lo que convierte en jest.Mock todas las funciones importadas desde él
(en este caso getStorageList y setStorageList)

```ts
import {
    getStorageList,
    setStorageList,
} from '../../../core/services/storage/storage';
jest.mock('../../../core/services/storage/storage');
```

El resto del test se limita a comprobar que las funciones del servicio
llaman a las que han sido convertidas en mock

```ts
const result = await getTasks();
expect(getStorageList).toHaveBeenCalled();
expect(result).toEqual(mockData);
```

```ts
const result = await getTasks();
expect(getStorageList).toHaveBeenCalled();
expect(setStorageList).toHaveBeenCalled();
expect(result).toEqual(TASKS);
```

En el fichero de test puede verse como se utilizan funciones con nombre
en lugar de las habituales funciones anónimas, para evitar duplicaciones
al tener que testar dos implementaciones diferentes pero con idénticos test

### Repository service

Servicio que encapsula las operaciones con **fetch**.
Al testarlo se creará un **mock** del método fetch provisto por la correspondiente **web API**.
A nivel de testing (Jest se ejecuta en Node) se accede al método en el objeto **global**

```ts
 global.fetch = jest.fn()
```

Los distintos casos de uso dependen de las implementaciones del mock de fetch

- El API devuelve un conjunto de datos

```ts
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockData),
});
```

- El API no devuelve datos

```ts
global.fetch = jest.fn().mockResolvedValue({
    ok: false,
});
```

```ts
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 404,
    statusText: 'Not Found',
    json: jest.fn().mockRejectedValue(new Error()),
});
```

En todos los test habrá que tener en cuenta el carácter asíncrono de las operaciones realizadas por fetch:

- se ejecuta (await) el método del repo a testar
- se comprueba que fetch ha sido llamado
- se comprueba que los datos devueltos por el método son coherentes con los 'enviados' por el mock de fetch. Estos datos definirán el caso de uso que se está probando.

#### Casos de uso (e.g. método load)

- En el caso de uso en que se reciben los datos

```ts
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockData),
});

const data = await repo.load();
expect(global.fetch).toHaveBeenCalled();
expect(data).toEqual(mockData);
```

- En el caso de uso en el que NO se reciben los datos.

Como resultado de la implementación de fetch, el método load desencadenará el **reject** de la promesa.
El **expect** correspondiente engloba la ejecución del método load en un async/await y como matcher
se utiliza  `.rejects.toThrowError()`

```ts
global.fetch = jest.fn().mockResolvedValue({
    ok: false,
});
await expect(async () => {
    await repo.load();
}).rejects.toThrowError();
expect(global.fetch).toHaveBeenCalled();

```

## Testing de componentes complejos. Mocks

El componente controlador, dentro del patrón controlador/presentador,
tiene las funciones responsables de toda la lógica relativa al estado, lo que lo hace relativamente difícil de testar de forma unitaria, teniendo en cuenta que es imposible acceder directamente a las mencionadas funciones:

- handleLoad
- handleAdd
- handleUpdate
- handleDelete

Para hacerlo se necesita convertir en mock los componentes presentadores y el servicio responsable de los datos

```tsx
import { Add } from '../add/add';
import { Item } from '../item/item';
import { getTasks, saveTasks } from '../../data/mock.service';

jest.mock('../add/add');
jest.mock('../item/item');
jest.mock('../../data/mock.service');
```

Las implementaciones del mock del servicio permitirán definir distintos casos de usos en función de los datos recibidos

Las implementaciones de los componentes presentadores proporcionaran los elementos de interfaz necesarios para permitir las acciones del usuario que desencadenan los eventos responsables de la llamada a las funciones del controlador que modifican el estado.

### Testing handleLoad

Para el test de la carga de los datos, estas implementaciones serían

```tsx
(Add as jest.Mock).mockImplementation(() => {
    return <p>Mock Add</p>;
});
(Item as jest.Mock).mockImplementation(({ item }) => {
    return <p>Task: {item.title}</p>;
});

// 1. Para el caso en que no hay datos en locaStorage
(getTasks as jest.Mock).mockResolvedValue([]);

// 2. Para el caso en el que si hay datos

(getTasks as jest.Mock).mockResolvedValue(mockTasks);
```

En cualquiera de los casos, el renderizado debe estar controlado especialmente, porque conlleva cambios en el estado:

- Define state -> tasks: []
- Renderiza el componente -> Loading
- useEffect -> savedTaskMock -> clg []
- useEffect inicio -> handleLoad()
- |-> getTasksMock([])
- |-> setTasks -> [mockTask]
- useEffect -> savedTaskMock -> clg [mockTask]

```tsx
beforeEach(async () => {
    await act(async () => {
        render(<List></List>);
    });
});
```

Finalmente el test comprueba

- que inicialmente se renderiza el componente
- que el mock del servicio ha sido llamado
- que los datos proporcionado por el mock del servicio
    se han mostrado enl documento (screen)

```tsx
const elementList = await screen.findByRole('list'); // <ul />
expect(elementList).toBeInTheDocument();
await waitFor(() => {
    expect(saveTasks).toHaveBeenCalled();
});
const elementItem = await screen.findByText(/Test task/i);
expect(elementItem).toBeInTheDocument();
```

### Testing handleAdd

Se necesita una implementación del mock del componente Add similar a la del original, en la que poder desencadenar el evento click en el botón submit del formulario de añadir tareas

```tsx
(Add as jest.Mock).mockImplementation(({ handleAdd }) => {
    return (
        <button
            onClick={() => {
                handleAdd(mockAddTask);
            }}
        >
            Mock Add
        </button>
    );
});
```

En el test se simula la interacción con el botón se comprueba

- que el documento (screen) refleja la nueva información
- que ha sido llamado el mock del servicio
    responsable de la persistencia de los datos

```tsx
const button = screen.getByRole('button');
userEvent.click(button);
const addItem = await screen.findByText(/Added task/i);
expect(addItem).toBeInTheDocument();
expect(saveTasks).toHaveBeenCalled();
```

### Testing handleUpdate

Se necesita una implementación del mock del componente Item similar a una parte del original, en la que poder desencadenar el evento click que actualiza la información de la tarea

```tsx
const mockUpdatedTask = new Task('Updated task', 'user');
mockUpdatedTask.id = '000001';
(getTasks as jest.Mock).mockResolvedValue([mockTask, mockAddTask]);
(Item as jest.Mock).mockImplementation(({ item, handleUpdate }) => {
    return (
        <>
            <p>
                Task: {item.id} {item.title}
            </p>
            <button
                onClick={() => {
                    handleUpdate(mockUpdatedTask);
                }}
            >
                Update
            </button>
        </>
    );
});
```

En el test interacciona con el botón de actualizar y se comprueba

- que ha sido llamado el mock del servicio
    responsable de la persistencia de los datos
- que el documento (screen) refleja la nueva información

```tsx
const title = /Updated task/i;
const buttons = await screen.findAllByRole('button', {
    name: 'Update',
});
userEvent.click(buttons[0]);
expect(saveTasks).toHaveBeenCalled();
const updateItem = await screen.findByText(title);
expect(updateItem).toBeInTheDocument();
```

### Testing handleDelete

Se necesita una implementación del mock del componente Item similar a una parte del original, en la que poder desencadenar el evento click en el botón de eliminar

```tsx
(getTasks as jest.Mock).mockResolvedValue(mockTasks);
(Item as jest.Mock).mockImplementation(
    ({ item, handleUpdate, handleDelete }) => {
        return (
            <>
                <p>
                    Task: {item.id} {item.title};
                </p>
                <button
                    onClick={() => {
                        handleDelete(mockTask.id);
                    }}
                >
                    Delete
                </button>
            </>
        );
    }
);
```

En el test interacciona con el botón de borrar y se comprueba

- que ha sido llamado el mock del servicio
    responsable de la persistencia de los datos
- que el documento (screen) refleja la ausencia de datos, volviendo a aparecer el loader inicial

```tsx
const button = await screen.findByRole('button', {
    name: 'Delete',
});
userEvent.click(button);
expect(saveTasks).toHaveBeenCalled();
const elementLoading = screen.getByText(/Loading/i);
expect(elementLoading).toBeInTheDocument();
```
