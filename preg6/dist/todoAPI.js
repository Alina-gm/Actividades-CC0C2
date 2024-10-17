"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Lista de tareas simulada
const tasks = [
    { id: 1, title: "Aprender TypeScript", completed: false },
    { id: 2, title: "Desarrollar API con promesas", completed: false }
];
// Obtener todas las tareas
const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve([...tasks]); // Devolver una copia de la lista de tareas
        }
        catch (error) {
            reject("Error al obtener las tareas.");
        }
    });
};
// Agregar una nueva tarea
const addTask = (title) => {
    return new Promise((resolve, reject) => {
        try {
            const newTask = {
                id: tasks.length + 1,
                title,
                completed: false
            };
            tasks.push(newTask);
            resolve(newTask); // Devolver la tarea agregada
        }
        catch (error) {
            reject("Error al agregar la tarea.");
        }
    });
};
// Marcar una tarea como completada
const completeTask = (taskId) => {
    return new Promise((resolve, reject) => {
        try {
            const task = tasks.find(task => task.id === taskId);
            if (!task) {
                return reject("Tarea no encontrada.");
            }
            task.completed = true;
            resolve(task); // Devolver la tarea completada
        }
        catch (error) {
            reject("Error al completar la tarea.");
        }
    });
};
// Función para manejar la respuesta de promesas de array de tareas
const handleResponseArray = (promise) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promise;
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error: String(error) };
    }
});
// Función para manejar la respuesta de promesas de una sola tarea
const handleResponseSingle = (promise) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promise;
        return { success: true, data };
    }
    catch (error) {
        return { success: false, error: String(error) };
    }
});
// Función principal para probar la API
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener todas las tareas
    let responseArray = yield handleResponseArray(getAllTasks());
    console.log("Obtener todas las tareas:", responseArray);
    // Agregar una nueva tarea
    let responseSingle = yield handleResponseSingle(addTask("Hacer la compra"));
    console.log("Agregar una nueva tarea:", responseSingle);
    // Marcar una tarea como completada
    responseSingle = yield handleResponseSingle(completeTask(1));
    console.log("Marcar una tarea como completada:", responseSingle);
    // Intentar marcar una tarea que no existe
    responseSingle = yield handleResponseSingle(completeTask(999));
    console.log("Error al completar una tarea:", responseSingle);
});
// Ejecutar la función principal
main();
