import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Info } from 'lucide-react'
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import axios from 'axios'



export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ eventName: string }>()

  function createEvent(data: { eventName: string }) {
    axios.post('http://localhost:3000/create-event', data)
      .then(response => {
        toast("Evento criado", {
          icon: <Info className="text-blue-500"></Info>,
          closeButton: true,
        });

        console.log(response.data.message);
      })
      .catch(error => {
        console.error('There was an error creating the event!', error);
      });
  }

  return (
    <section className=" min-h-screen flex flex-col justify-center items-center text-center gap-5">
      <h1 className='text-lg text-foreground text-balance'>Simplifique sua arrecadação e divisão de despesas!</h1>
      <div className='text-center'>

        <Card className='flex items-center gap-2 rounded-xl py-2 px-3 md:w-96'   >
          <input className='h-8 w-full bg-transparent outline-none text-sm' placeholder='Digite o nome do evento' type="text" {...register("eventName", { required: true })} />
          <Button onClick={handleSubmit(createEvent)} className='h-8 gap-1'>Criar <ArrowRight className='size-4' /></Button>
        </Card>
        {errors.eventName && <span className='w-full text-left text-xs text-red-500'>Por favor, coloque um nome para o evento</span>}

      </div>

      {/* <pre className='text-zinc-600'> {JSON.stringify(watch(), null, 2)}</pre> */}
    </section>
  )
}


