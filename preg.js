interface Tarea {
    id: number;
    descripcion: string;
    ejecutada: boolean;
}

type TareaParcial = Partial<Tarea>;
type TareaSoloLectura = Readonly<Tarea>;

abstract class TareaBase {
    constructor(public descripcion: string) {}
    abstract ejecutar(): void;
}

class MacroTarea extends TareaBase {
    constructor(public descripcion: string, private retraso: number) {
        super(descripcion);
    }

    ejecutar(): void {
        setTimeout(() => {
            console.log(`Macrotarea ejecutada: ${this.descripcion}`);
        }, this.retraso);
    }
}

class MicroTarea extends TareaBase {
    ejecutar(): void {
        process.nextTick(() => {
            console.log(`Microtarea ejecutada: ${this.descripcion}`);
        });
    }
}

class PromesaTarea extends TareaBase {
    async ejecutar(): Promise<void> {
        const promesa = new Promise<void>((resolver) => {
            console.log("Inicio de tarea Promesa");
            resolver();
        });
        await promesa;
        console.log(`Promesa ejecutada: ${this.descripcion}`);
    }
}

class AdministradorTareas {
    private tareas: Tarea[] = [];
    agregarTarea(tarea: TareaParcial): void {
        if (!tarea.descripcion) {
            console.log("Tarea inválida");
        } else {
            this.tareas.push({ ...tarea, id: this.tareas.length + 1, ejecutada: false } as Tarea);
            console.log(`Tarea agregada: ${tarea.descripcion}`);
        }
    }
    ejecutarTodas(): void {
        this.tareas.forEach((tarea) => {
            tarea.ejecutada = true;
            console.log(`Ejecutando tarea: ${tarea.descripcion}`);
        });
    }
}

const simularEventLoop = async () => {
    console.log("Inicio de la simulación del Event Loop...");
    const macroTarea = new MacroTarea("Tarea pesada", 1000);
    const microTarea = new MicroTarea("Tarea rápida");
    const promesaTarea = new PromesaTarea("Tarea Promesa");
    macroTarea.ejecutar();
    microTarea.ejecutar();
    await promesaTarea.ejecutar();
    console.log("Fin de la simulación del Event Loop.");
};

const principal = async () => {
    console.log("Simulación del Event Loop y manejo de tareas con POO...");
    const administrador = new AdministradorTareas();
    administrador.agregarTarea({ descripcion: "Primera tarea" });
    administrador.agregarTarea({ descripcion: "Segunda tarea" });
    administrador.agregarTarea({ descripcion: undefined });
    administrador.ejecutarTodas();
    await simularEventLoop();
};

principal();
