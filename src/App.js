import Homepage, { EditModeProvider } from "./homepage";

function App() {
  return (
    <div className="App">
      <EditModeProvider>
        <Homepage />
      </EditModeProvider>
    </div>
  );
}

export default App;
