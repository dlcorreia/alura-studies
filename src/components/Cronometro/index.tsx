import { useEffect, useState } from 'react';
import { tempoParaSegundos } from '../../common/utils/time';
import { ITarefa } from '../../types/tarefas/tarefa';
import Button from '../Button';
import Clock from './Clock';
import style from './Cronometro.module.scss'

interface Props {
    selecionado: ITarefa | undefined,
    finalizarTarefa: () => void
}

export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
    const [tempo, setTempo] = useState<number>();

    useEffect(() => {
        if(selecionado?.tempo) { //aqui o instrutor colocou selecionado?.tempo na condição, porque? O tempo a princípio nunca será null
            setTempo(tempoParaSegundos(selecionado.tempo))
        }
    }, [selecionado])

    function regressivaComSetTimeout(contador: number = 0) {
        if(contador === 0) finalizarTarefa();
        setTimeout(() => {    
            if(contador > 0) { 
                setTempo(contador - 1);
                return regressivaComSetTimeout(contador - 1);
            }
        }, 1000)
    }

    function regressivaComSetInterval(contador: number = 0) {
        const timerId = setInterval(regressiva, 1000)

        function regressiva() {
            setTempo(contador - 1);
            contador--;
            if(contador === 0) {
                finalizarTarefa();
                clearInterval(timerId);
                return;
            };
        }
    }
    
    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Clock tempo={tempo}/>
            </div>
            <Button onClick={() => regressivaComSetInterval(tempo)} >
                Começar!
            </Button>
        </div>
    )
}