import { useEffect, useState } from 'react';
import { getTasks, saveTasks } from '../../data/mock.service';
import { TaskType } from '../../models/task';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.css';

export function List() {
    const initialState: Array<TaskType> = [];

    const [tasks, setTasks] = useState(initialState);

    const handleLoad = async () => {
        const data = (await getTasks()) as Array<TaskType>;
        setTasks(data);
        console.log('LOAD');
    };

    const handleAdd = function (task: TaskType) {
        setTasks([...tasks, task]);
    };

    const handleUpdate = function (task: Partial<TaskType>) {
        setTasks(
            tasks.map((item) =>
                item.id === task.id ? { ...item, ...task } : item
            )
        );
    };

    const handleDelete = function (id: TaskType['id']) {
        setTasks(tasks.filter((item) => item.id !== id));
    };

    useEffect(() => {
        handleLoad();
    }, []);

    useEffect(() => {
        console.log('useEffect', { tasks });
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
                        console.log({ item });
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
