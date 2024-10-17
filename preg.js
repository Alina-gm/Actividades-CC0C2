ejercicio///

# Comandos para crear el proyecto
mkdir preg6
cd preg6
mkdir src
touch tsconfig.json
touch src/eventLoopSimulation.ts
/////////
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
///////////
// Definición de tipos y clases usando TypeScript avanzado

// Tipo Task para representar una tarea en el Event Loop
interface Task {
    id: number;
    description: string;
    executed: boolean;
}

// Utility Types
type PartialTask = Partial<Task>;
type ReadonlyTask = Readonly<Task>;

// Clase base abstracta para manejar las tareas
abstract class BaseTask {
    constructor(public description: string) {}

    abstract execute(): void;
}

// Simulación de una macrotarea (setTimeout)
class MacroTask extends BaseTask {
    constructor(public description: string, private delay: number) {
        super(description);
    }

    execute(): void {
        setTimeout(() => {
            console.log(`Macrotarea ejecutada: ${this.description}`);
        }, this.delay);
    }
}

// Simulación de una microtarea (process.nextTick)
class MicroTask extends BaseTask {
    execute(): void {
        process.nextTick(() => {
            console.log(`Microtarea ejecutada: ${this.description}`);
        });
    }
}

// Simulación de promesas como microtareas
class PromiseTask extends BaseTask {
    async execute(): Promise<void> {
        const promise = new Promise<void>((resolve) => {
            console.log("Inicio de tarea Promise");
            resolve();
        });
        await promise;
        console.log(`Promise ejecutada: ${this.description}`);
    }
}

// Manejador de tareas
class TaskManager {
    private tasks: Task[] = [];

    addTask(task: PartialTask): void {
        if (!task.description) {
            console.log("Tarea inválida");
        } else {
            this.tasks.push({ ...task, id: this.tasks.length + 1, executed: false } as Task);
            console.log(`Tarea agregada: ${task.description}`);
        }
    }

    executeAll(): void {
        this.tasks.forEach((task) => {
            task.executed = true;
            console.log(`Ejecutando tarea: ${task.description}`);
        });
    }
}

// Simulación del Event Loop
const simulateEventLoop = async () => {
    console.log("Inicio de la simulación del Event Loop...");

    // Crear tareas de diferentes tipos
    const macroTask = new MacroTask("Tarea pesada", 1000);
    const microTask = new MicroTask("Tarea rápida");
    const promiseTask = new PromiseTask("Tarea Promise");

    // Ejecutar las tareas
    macroTask.execute();
    microTask.execute();
    await promiseTask.execute();

    console.log("Fin de la simulación del Event Loop.");
};

// Función principal que maneja todo el proceso
const main = async () => {
    console.log("Simulación del Event Loop y manejo de tareas con POO...");

    // Crear instancia del manejador de tareas
    const taskManager = new TaskManager();

    // Agregar tareas al manejador
    taskManager.addTask({ description: "Primera tarea" });
    taskManager.addTask({ description: "Segunda tarea" });
    taskManager.addTask({ description: undefined });  // Ejemplo de tarea inválida

    // Ejecutar todas las tareas
    taskManager.executeAll();

    // Simulación del Event Loop
    await simulateEventLoop();
};

// Ejecutar la simulación
main();
////////////
node dist/eventLoopSimulation.js
////////
Simulación del Event Loop y manejo de tareas con POO...
Tarea agregada: Primera tarea
Tarea agregada: Segunda tarea
Tarea inválida
Ejecutando tarea: Primera tarea
Ejecutando tarea: Segunda tarea
Inicio de la simulación del Event Loop...
Microtarea ejecutada: Tarea rápida
Inicio de tarea Promise
Fin de la simulación del Event Loop.
Promise ejecutada: Tarea Promise
Macrotarea ejecutada: Tarea pesada
