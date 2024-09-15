import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/items'; // Supondo que as rotas estejam separadas
import stressRoutes from './routes/stress'; // Supondo que as rotas estejam separadas

const app = express();

app.use(cors());
app.use(express.json());

app.use('/items', itemRoutes);
app.use('/stress', stressRoutes);

export default app; // Exporta o app para que o Jest use no teste
