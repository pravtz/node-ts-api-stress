let cpuStressInterval: NodeJS.Timeout | null = null;
let memoryStressInterval: NodeJS.Timeout | null = null;
let stressCpuLevel = 0;
let stressMemoryLevel = 0;
let isCpuStressed = false;
let isMemoryStressed = false;
let allocatedMemory: Buffer[] = [];

let cpuStressTimeout: NodeJS.Timeout | null = null;
let memoryStressTimeout: NodeJS.Timeout | null = null;
const MAX_STRESS_TIME = 600; // Limite de 10 minutos em segundos
let stressDuration = 0; // Duração atual do estresse em segundos


// Função para iniciar o estresse de CPU com tempo limite
export const startCpuStress = (cpuLevel: number, duration: number) => {
    if (isCpuStressed) {
        console.log('Estresse de CPU já está ativo.');
        return;
    }

    stressCpuLevel = cpuLevel;
    isCpuStressed = true;
    stressDuration = Math.min(duration, MAX_STRESS_TIME);

    cpuStressInterval = setInterval(() => {
        for (let i = 0; i < stressCpuLevel * 1000000; i++) {
            Math.sqrt(Math.random());
        }
    }, 100);

    // Parar o estresse após o tempo definido
    cpuStressTimeout = setTimeout(stopCpuStress, stressDuration * 1000);
    console.log(`Estresse de CPU iniciado com nível ${stressCpuLevel} por ${stressDuration} segundos.`);
};



// Função para iniciar o estresse de memória com tempo limite
export const startMemoryStress = (memoryLevel: number, duration: number) => {
    if (isMemoryStressed) {
        console.log('Estresse de memória já está ativo.');
        return;
    }

    stressMemoryLevel = memoryLevel;
    isMemoryStressed = true;
    stressDuration = Math.min(duration, MAX_STRESS_TIME);

    memoryStressInterval = setInterval(() => {
        const memoryChunk = Buffer.alloc(stressMemoryLevel * 1024 * 1024);
        allocatedMemory.push(memoryChunk);
    }, 1000);

    // Parar o estresse após o tempo definido
    memoryStressTimeout = setTimeout(stopMemoryStress, stressDuration * 1000);
    console.log(`Estresse de memória iniciado com nível ${stressMemoryLevel}MB por ${stressDuration} segundos.`);
};



export const getStressStatus = () => {
    return {
        isCpuStressed,
        stressCpuLevel,
        isMemoryStressed,
        stressMemoryLevel,
        allocatedMemorySize: allocatedMemory.length * (stressMemoryLevel || 0),
        stressDuration: stressDuration
    };
};

// Função para parar estresse manualmente
export const stopCpuStress = () => {
    if (cpuStressInterval) {
        clearInterval(cpuStressInterval);
        cpuStressInterval = null;
    }
    if (cpuStressTimeout) {
        clearTimeout(cpuStressTimeout);
        cpuStressTimeout = null;
    }
    isCpuStressed = false;
    stressCpuLevel = 0;
    console.log('Estresse de CPU parado.');
};

export const stopMemoryStress = () => {
    if (memoryStressInterval) {
        clearInterval(memoryStressInterval);
        memoryStressInterval = null;
    }
    if (memoryStressTimeout) {
        clearTimeout(memoryStressTimeout);
        memoryStressTimeout = null;
    }
    isMemoryStressed = false;
    stressMemoryLevel = 0;
    allocatedMemory = [];
    console.log('Estresse de memória parado e memória liberada.');
};
