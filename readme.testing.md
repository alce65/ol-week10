# Testing

## Testing de componentes con react/testing-library.

Conceptos (Kent C. Dodds)
[testing-library](https://testing-library.com/docs/)

-   test de componentes (react y otros): elementos de interfaz
-   se necesita dar soporte a la renderización, como si existiera un DOM: render y screen.
-   se testa la interacción del usuario con el interfaz, NO la implementación
-   existen una serie de [queries](https://testing-library.com/docs/queries/about) más o menos adecuadas a esa perspectiva
    -   getBy..., getAllBy..., queryBy..., queryAllBy..., findBy..., findAllBy...
    -   ...ByRole
    -   ...ByLabelText
    -   ...ByPlaceholderText
    -   ...ByText
    -   ...ByDisplayValue
    -   ...ByAltText
    -   ...ByTitle
    -   ...ByTestId
-   existen **matchers** específicos para los interfaces renderizados (toBeInTheDocument)

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

Se seleccionan el/los elemento/s destacados del componente, preferiblemente por rol
Se comprueba que esta o están en el 'documento' (screen)

```tsx
const elementHeader = screen.getByRole('heading', {
    name: 'Learning Components',
});
expect(elementHeader).toBeInTheDocument();
```

Si existen varios elementos que coinciden con la query, debe usarse getAllBy... y se obtendrá un array de elementos

El 'entorno' del componente en la función **render** debe simular su entorno real

-   wrapper que lo envuelvan (Routers, Providers...)
-   child y otras props en caso que que los espere

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
Para ello se utiliza userEvent, importado desde '@testing-library/user-event'

En los inputs, el evento type permite simular que se escribe en ellos
El matcher toHaveValue permite comprobar el valor recogido en el input

```tsx
const mockTitle = 'Test task';
const inputElement = screen.getAllByRole('textbox'); // <input>
expect(inputElement).toBeInTheDocument();
userEvent.type(inputElement, mockTitle);
expect(inputElements[0]).toHaveValue(mockTitle);
```

En los botones, el evento click permite la interacción con el botón
para poder testear alguno de sus efectos:

-   los cambios en el interfaz
-   las llamadas a las funciones 'espiadas'

El primer caso lo vemos en los test del contador,
donde los clicks en uno u otro botón
se reflejan en los valores que se muestran en el componente

```tsx
button = screen.getByRole('button');
fireEvent.click(button);
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

### Paso de props en los tests.

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

### Tests de rutas. Memory Router

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
s;
```

### Storage Service

localStorage y sessionStorage con métodos de la clase (o función constructora) Storage.
Como en cualquier otra caso de objetos instanciados con el patrón constructor,
puede accederse a las propiedades del prototype para convertir los métodos de instancia en mocks.

Al tratarse de funciones síncronas, la implementación de la función mock puede definirse con el método
mockReturnValue. Distintas implementaciones definirán los distintos casos de uso

-   que existan datos en localStorage
-   que no exista el item en localStorage, con lo que se retorna un null

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

## Testing de componentes complejos. Mocks
