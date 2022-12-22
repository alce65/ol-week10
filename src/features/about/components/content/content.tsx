import './content.css';
export function Content() {
    return (
        <section aria-label="content" className="content">
            <details>
                <summary>
                    <h3>Core</h3>
                </summary>
                <section className="first-level">
                    <h4>Core components</h4>
                    <div className="info">
                        <ul>
                            <li>Header</li>
                            <li>Footer</li>
                        </ul>
                        <p>
                            Componentes <strong>'estáticos'</strong>
                        </p>
                        <ul>
                            <li>Layout</li>
                        </ul>
                        <p>
                            Componente <strong>'wrapper'</strong> que incluye a
                            los anteriores y permite envolver las páginas de la
                            aplicación
                        </p>
                        <ul>
                            <li>Menu</li>
                        </ul>
                        <p>
                            Componente que recibe por props las rutas de la
                            aplicación para construir el <strong>menu</strong>
                        </p>
                    </div>
                </section>
                <section className="first-level">
                    <h4>Routes</h4>
                    <div className="info">
                        <ul>
                            <li>App</li>
                            <li>Router wrapper</li>
                            <li>Routes component</li>
                            <li>Páginas</li>
                        </ul>
                        <p>
                            A nivel del fichero <strong>index.tsx</strong>, el
                            provider <strong>Routes</strong> envuelve al
                            componente principal <strong>App</strong>{' '}
                            proporcionando así enrutamiento a toda la
                            aplicación.
                        </p>
                        <p>
                            El componente <strong>routes</strong> define las
                            páginas asociadas a cada una de las rutas de la
                            aplicación, que vienen definidas desde App.
                        </p>
                        <p>
                            Las <strong>páginas</strong> son componentes
                            normales, con una mínima funcionalidad, que
                            contienen los componentes necesarios para cada
                            feature de la aplicación.
                        </p>
                    </div>
                </section>
                <section className="first-level">
                    <h4>Services</h4>
                    <div className="info">
                        <ul>
                            <li>Storage</li>
                            <li>Time</li>
                            <li>Repository</li>
                        </ul>
                    </div>
                </section>
            </details>
            <details>
                <summary>
                    <h3>Features</h3>
                </summary>
                <section className="first-level">
                    <h4>Home - Counters</h4>
                    <div className="info">
                        <ul>
                            <li>Counter</li>
                            <li>Counter2</li>
                            <li>Counters (wrapper de los anteriores)</li>
                        </ul>
                        <div className="second-level">
                            <p>Ejemplos iniciales del uso de useState</p>
                            <p>
                                En los componentes Counter y Counter2 se
                                compara:
                            </p>
                            <ul>
                                <li>
                                    un único estado, basado en un objeto con 2
                                    propiedades
                                </li>
                                <li>
                                    dos estados, cada uno con un único valor
                                </li>
                            </ul>
                        </div>
                        <div className="second-level">
                            <p>
                                El componente Counters es un wrapper de los dos,
                                con su propio estado que se modifica en función
                                de interacciones en los componentes que contiene
                            </p>
                            <p>
                                Se introduce así el concepto de paso por props
                                de una función que gestiona el estado
                            </p>
                        </div>
                    </div>
                </section>
                <section className="first-level">
                    <h4>ToDo List</h4>
                    <div className="info">
                        <div className="second-level">
                            <p>Modelo controlador/presentadores</p>
                            <ul>
                                <li>controlador: List</li>
                                <li>presentadores: Add | Item</li>
                            </ul>
                            <p>
                                En el <strong>controlador</strong> se define el
                                estado y las funciones que lo manejan,
                                completando un CRUD sobre los datos
                            </p>
                            <p>
                                En los <strong>presentadores</strong> se reciben
                                datos y funciones desde el controlador. Las
                                funciones se ejecutarán en respuesta a las
                                interacciones del usuario.
                            </p>
                        </div>
                        <div className="second-level">
                            <p>
                                Las interacciones del usuario se recogen en las
                                correspondientes funciones '
                                <strong>handler</strong>' (manejadoras de
                                eventos).
                            </p>
                            <p>
                                En el caso de los formularios, se define su
                                propio estado local que permite un '
                                <strong>two-way data binding</strong>' entre los
                                controles del formulario y el estado que recoge
                                los valores
                            </p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="second-level">
                            <p>
                                <strong>Datos</strong>
                            </p>
                            <p>
                                Son obtenidos en un{' '}
                                <strong>servicio mock asíncrono</strong>
                                que utiliza localStorage como fuente de
                                persistencia
                            </p>
                        </div>
                    </div>
                </section>
                <section className="first-level">
                    <h4>Notes List</h4>
                    <div className="info">
                        <div className="second-level">
                            <p>
                                Se evoluciona el modelo
                                controlador/presentadores abstrayendo la lógica
                                del controlador a un{' '}
                                <strong>custom hook</strong>
                            </p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="second-level">
                            <p>
                                <strong>Datos</strong>
                            </p>
                            <p>
                                Son obtenidos de un servicio repository que
                                encapsula fetch para obtener los datos de un API
                            </p>
                            <p>La API es un mock generado con json-server</p>
                        </div>
                    </div>
                </section>
            </details>
        </section>
    );
}
