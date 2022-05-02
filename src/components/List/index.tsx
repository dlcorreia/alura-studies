import { ITarefa } from '../../types/tarefas/tarefa';
import React from 'react';
import style from './List.module.scss';
import Item from './Item';

interface Props {
    tarefas: ITarefa[],
    selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}


function List({ tarefas, selecionaTarefa }: Props) {
    
    
    return (
        <aside className={style.listaTarefas}>
            <h2> Estudos do dia </h2>
            <ul>
                {tarefas.map((item) => (
                    <Item
                        selecionaTarefa={selecionaTarefa} 
                        key={item.id}
                        {...item}
                    />
                ))}
            </ul>
        </aside>
    )
}

export default List;