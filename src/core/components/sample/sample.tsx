import './sample.css';
export function Sample() {
    // Controller del componente

    const title = 'Titulo Sample';
    const cssClass = 'sample';

    // Template string `${title}`
    // Vista del componente en JSX
    return (
        <div className={cssClass}>
            <h1>{title}</h1>
        </div>
    );
}
