import './sample.css';
export function Sample({ children }: { children: JSX.Element }) {
    // Controller del componente

    const title = 'Titulo Sample';
    const cssClass = 'sample';
    const hour = new Date().getHours();

    // Template string `${title}`
    // Vista del componente en JSX
    return (
        <div className={cssClass}>
            <h1>{title}</h1>
            {/* @TODO Re-design for allow testing */}
            {hour < 10 && children}
        </div>
    );
}
