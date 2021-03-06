import React, { useState } from 'react';
import { ITarefa } from '../types/tarefas/tarefa';
import Cronometro from '../components/Cronometro';
import Form from '../components/Form';
import List from '../components/List';
import './style.scss';

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[] | []>([]);
  const [selecionado, setSelecionado] = useState<ITarefa >();

  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false
    })));
  }

  function finalizarTarefa() {
    if(selecionado) {
      setSelecionado(undefined);
      setTarefas(
        tarefasAnteriores => 
        tarefasAnteriores.map(tarefa => {
          if(tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true
            }
          }
          return tarefa;
        }))
    }
  }

//não está funcionando corretamente se resetar durante a contagem, tem que parar a contagem
  function limparTarefas() {
    
    console.log('limparTarefas foi chamada');
    setTarefas(
      tarefasAnteriores => 
      tarefasAnteriores.map((tarefa, index) => {   
        console.log('A tarefa ' + index + ' foi limpa!')     
          return {
            ...tarefa,
            selecionado: false,
            completado: false
          }
        
      }));
  }

  console.log('Página criada'); //console apenas para mostrar a duplicidade da renderização

  return (
    <div className="AppStyle">
      <Form setTarefas={setTarefas}/>
      <List 
        tarefas={tarefas}
        selecionaTarefa={selecionaTarefa}
      />
      <Cronometro 
        selecionado={selecionado}
        finalizarTarefa={finalizarTarefa}
        limparTarefas={limparTarefas}
      />
    </div>
  );
}

export default App;
