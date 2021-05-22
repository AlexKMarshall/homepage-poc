import Homepage from "./homepage";
import { HomepageDataProvider, EditModeProvider } from "./providers";

function App() {
  return (
    <div className="App">
      <HomepageDataProvider>
        <EditModeProvider>
          <Homepage />
        </EditModeProvider>
      </HomepageDataProvider>
    </div>
  );
}

export default App;
