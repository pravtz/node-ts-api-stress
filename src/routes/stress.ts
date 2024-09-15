import { Router, Request, Response } from 'express';
import { startCpuStress, stopCpuStress, startMemoryStress, stopMemoryStress, getStressStatus } from '../stress/stressHandlers';

const router = Router();

router.post('/start', (req: Request, res: Response) => {
    const { cpuLevel, memoryLevel, duration } = req.body;
    const stressTime = duration ? Math.min(duration, 10) : 10; // Limite máximo de 10 minutos

    if (typeof cpuLevel === 'number' && cpuLevel > 0) {
        startCpuStress(cpuLevel, stressTime * 60); // Converter minutos para segundos
    }

    if (typeof memoryLevel === 'number' && memoryLevel > 0) {
        startMemoryStress(memoryLevel, stressTime * 60); // Converter minutos para segundos
    }

    res.json({ message: `Estresse iniciado: CPU (${cpuLevel}), Memória (${memoryLevel}MB) por ${stressTime} minutos.` });
});

// Rota para parar o estresse
router.post('/stop', (req: Request, res: Response) => {
    stopCpuStress();
    stopMemoryStress();
    res.json({ message: 'Estresse de CPU e Memória parado.' });
});

// Rota para verificar o status
router.get('/status', (req: Request, res: Response) => {
    const status = getStressStatus();
    res.json(status);
});

export default router;
