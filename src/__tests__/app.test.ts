import request from 'supertest';
import app from '../app'; 


beforeEach(() => {
    jest.useFakeTimers(); 
});

afterEach(() => {
    jest.clearAllTimers(); 
});

describe('API Endpoints', () => {

  it('should return an empty list of items initially', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Novo Item' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Novo Item');
  });

  it('should return an item by ID', async () => {
    const newItem = await request(app).post('/items').send({ name: 'Item 1' });
    const itemId = newItem.body.id;

    const res = await request(app).get(`/items/${itemId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Item 1');
  });

  it('should delete an item', async () => {
    const newItem = await request(app).post('/items').send({ name: 'Item para remover' });
    const itemId = newItem.body.id;

    const deleteRes = await request(app).delete(`/items/${itemId}`);
    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body.message).toEqual(`Item com id ${itemId} removido.`);

    const getRes = await request(app).get(`/items/${itemId}`);
    expect(getRes.statusCode).toEqual(404);
  });

  it('should start stress with specified CPU and memory levels', async () => {
    const res = await request(app)
      .post('/stress/start')
      .send({ cpuLevel: 5, memoryLevel: 100, duration: 2 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Estresse iniciado: CPU (5), Memória (100MB) por 2 minutos.');
  });

  it('should stop stress immediately', async () => {
    const res = await request(app).post('/stress/stop');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Estresse de CPU e Memória parado.');
  });

  it('should return stress status', async () => {
    await request(app)
      .post('/stress/start')
      .send({ cpuLevel: 3, memoryLevel: 200, duration: 3 });

    const res = await request(app).get('/stress/status');
    expect(res.statusCode).toEqual(200);
    expect(res.body.isCpuStressed).toBe(true);
    expect(res.body.stressCpuLevel).toEqual(3);
    expect(res.body.stressMemoryLevel).toEqual(200);
  });
});
