import "./App.css";
import BarraLateral from "./components/BarraLateral/BarraLateral";
import Header from "./components/Header";
import ListaTarefas from "./modules/tarefa/components/ListaTarefas/ListaTarefas";

function App() {
  return (
    <>
      <div className="bg-gray-900 text-white font-sans flex min-h-screen h-full">
        <BarraLateral />

        <main className="flex flex-col flex-1 p-8 ml-64">
          <Header />
          {/* <ModalTarefa /> */}
          <ListaTarefas />
        </main>
      </div>
    </>
  );
}

export default App;
