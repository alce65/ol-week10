import { useEffect, useState } from 'react';
import { consoleDebug } from '../../../../tools/debug';
import { getTasks, saveTasks } from '../../data/mock.service';
import { TaskStructure } from '../../models/task';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const initialState: Array<TaskStructure> = [];

    const [tasks, setTasks] = useState(initialState);

    const handleLoad = async () => {
        const data = await getTasks();
        setTasks(data);
        consoleDebug('LOAD');
    };

    const handleAdd = function (task: TaskStructure) {
        setTasks([...tasks, task]);
    };

    const handleUpdate = function (task: Partial<TaskStructure>) {
        setTasks(
            tasks.map((item) =>
                item.id === task.id ? { ...item, ...task } : item
            )
        );
    };

    const handleDelete = function (id: TaskStructure['id']) {
        setTasks(tasks.filter((item) => item.id !== id));
    };

    useEffect(() => {
        handleLoad();
    }, []);

    useEffect(() => {
        consoleDebug('useEffect', { tasks });
        if (tasks.length) {
            saveTasks(tasks);
        }
    }, [tasks]);

    return (
        <>
            <Add handleAdd={handleAdd}></Add>
            <h3>Lista de tareas</h3>
            {!tasks.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="task-list">
                    {tasks.map((item) => {
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
        </>
    );
}
