import { Router, Request, Response } from 'express';

const router = Router();

interface Item {
    id: number;
    name: string;
}

let items: Item[] = [];
let currentId = 1;

// GET all items
router.get('/', (req: Request, res: Response) => {
    res.json(items);
});

// GET item by ID
router.get('/:id', (req: Request, res: Response) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST create new item
router.post('/', (req: Request, res: Response) => {
    const newItem: Item = {
        id: currentId++,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// DELETE item by ID
router.delete('/:id', (req: Request, res: Response) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
        items.splice(index, 1);
        res.status(200).json({ message: `Item com id ${req.params.id} removido.` });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

export default router;
