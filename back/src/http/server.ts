import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyCors from '@fastify/cors';

const server = fastify();
const prisma = new PrismaClient();

// Habilitar CORS
server.register(fastifyCors, {
    origin: '*',
});

// Rota GET com ID específico
server.get<{ Params: { id: string } }>('/event/:id', async (request, reply) => {
    const { id } = request.params;
    const event = await prisma.events.findUnique({
        where: { id: id },
    });
    if (event) {
        return event;
    } else {
        reply.status(404).send({ error: 'Event not found' });
    }
});

// Rota POST para criar um novo evento
server.post<{ Body: { eventName: string } }>('/create-event', async (request, reply) => {
    const { eventName } = request.body;
    try {
        const newEvent = await prisma.events.create({
            data: {
                name: eventName,
            },
        });
        return { message: 'Event created successfully', data: newEvent };
    } catch (error) {
        reply.status(500).send({ error: 'Failed to create event' });
    }
});

const start = async () => {
    try {
        await server.listen({ port: 3000, host: 'localhost' });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();