import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

export default function Event() {
    const { id } = useParams<{ id: string }>();

    const fetchEvent = async () => {
        const { data } = await axios.get(`http://localhost:3000/event/${id}`);
        return data;
    };

    const { data, } = useQuery({ queryFn: fetchEvent, queryKey: ["events"] });


    const { register, handleSubmit, formState: { errors } } = useForm<{ participantName: string, participantEmail: string | undefined, participantTax: string }>()



    function createParticipant(data: { participantName: string, participantEmail: string | undefined, participantTax: string }) {

        console.log(data);
        // axios.post(`http://localhost:3000/event/${id}/create-participant`, data)
        //     .then(response => {
        //         console.log(response.data.message);
        //     })
        //     .catch(error => {
        //         console.error('There was an error creating the participant!', error);
        //     });
    }

    return (
        <section className='min-h-screen flex flex-col gap-5 justify-center items-center'>
            <h1 className='absolute top-10'>Evento: {data.name}</h1>

            <Card className='flex items-center gap-2 rounded-xl py-2 px-3 md:w-96'   >
                <input className='h-8 w-full bg-transparent outline-none text-sm' placeholder='Nome do caloteiro' type="text" {...register("participantName", { required: true })} />
                <Button onClick={handleSubmit(createParticipant)} className='h-8 gap-1'>Criar <ArrowRight className='size-4' /></Button>
            </Card>

            <div className='p-5'>
                <h1>Lista de Caloteiros</h1>
            </div>

        </section>
    )
}
