import Homepage from "./homepage";
import { HomepageDataProvider, EditModeProvider } from "./providers";

function App() {
  return (
    <div className="App" style={{ padding: "1rem" }}>
      <HomepageDataProvider>
        <EditModeProvider>
          <Homepage />
        </EditModeProvider>
      </HomepageDataProvider>
    </div>
  );
}

export default App;
