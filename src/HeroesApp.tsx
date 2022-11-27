import { AuthProvider } from "./auth";
import { AppRouter } from "./router/AppRouter";

function HeroesApp() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default HeroesApp;
