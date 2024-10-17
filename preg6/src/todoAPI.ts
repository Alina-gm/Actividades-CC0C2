// Interfaz para la tarea (Task)
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Lista de tareas simulada
const tasks: Task[] = [
    { id: 1, title: "Aprender TypeScript", completed: false },
    { id: 2, title: "Desarrollar API con promesas", completed: false }
];

// Obtener todas las tareas
const getAllTasks = (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
        try {
            resolve([...tasks]); // Devolver una copia de la lista de tareas
        } catch (error) {
            reject("Error al obtener las tareas.");
        }
    });
};

// Agregar una nueva tarea
const addTask = (title: string): Promise<Task> => {
    return new Promise((resolve, reject) => {
        try {
            const newTask: Task = {
                id: tasks.length + 1,
                title,
                completed: false
            };
            tasks.push(newTask);
            resolve(newTask); // Devolver la tarea agregada
        } catch (error) {
            reject("Error al agregar la tarea.");
        }
    });
};

// Marcar una tarea como completada
const completeTask = (taskId: number): Promise<Task> => {
    return new Promise((resolve, reject) => {
        try {
            const task = tasks.find(task => task.id === taskId);
            if (!task) {
                return reject("Tarea no encontrada.");
            }
            task.completed = true;
            resolve(task); // Devolver la tarea completada
        } catch (error) {
            reject("Error al completar la tarea.");
        }
    });
};

// Función para manejar la respuesta de promesas de array de tareas
const handleResponseArray = async <T>(promise: Promise<T[]>): Promise<{ success: boolean, data?: T[], error?: string }> => {
    try {
        const data = await promise;
        return { success: true, data };
    } catch (error) {
        return { success: false, error: String(error) };
    }
};

// Función para manejar la respuesta de promesas de una sola tarea
const handleResponseSingle = async <T>(promise: Promise<T>): Promise<{ success: boolean, data?: T, error?: string }> => {
    try {
        const data = await promise;
        return { success: true, data };
    } catch (error) {
        return { success: false, error: String(error) };
    }
};

// Función principal para probar la API
const main = async () => {
    // Obtener todas las tareas
    let responseArray = await handleResponseArray(getAllTasks());
    console.log("Obtener todas las tareas:", responseArray);

    // Agregar una nueva tarea
    let responseSingle = await handleResponseSingle(addTask("Hacer la compra"));
    console.log("Agregar una nueva tarea:", responseSingle);

    // Marcar una tarea como completada
    responseSingle = await handleResponseSingle(completeTask(1));
    console.log("Marcar una tarea como completada:", responseSingle);

    // Intentar marcar una tarea que no existe
    responseSingle = await handleResponseSingle(completeTask(999));
    console.log("Error al completar una tarea:", responseSingle);
};

// Ejecutar la función principal
main();
/* respuesta //
Obtener todas las tareas: {
    success: true,
    data: [
      { id: 1, title: 'Aprender TypeScript', completed: false },
      { id: 2, title: 'Desarrollar API con promesas', completed: false }
    ]
  }
  Agregar una nueva tarea: {
    success: true,
    data: { id: 3, title: 'Hacer la compra', completed: false }
  }
  Marcar una tarea como completada: {
    success: true,
    data: { id: 1, title: 'Aprender TypeScript', completed: true }
  }
  Error al completar una tarea: { success: false, error: 'Tarea no encontrada.' }*/
  