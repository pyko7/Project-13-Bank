import Header from "./components/Header/Header";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import Card from "./components/Card/Card";
import chatIcon from "./assets/img/icon-chat.png";
import moneyIcon from "./assets/img/icon-money.png";
import securityIcon from "./assets/img/icon-security.png";
import text from "./utils/texts.json";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Card
            title={text.chat.title}
            description={text.chat.description}
            iconUrl={chatIcon}
          />
          <Card
            title={text.savings.title}
            description={text.savings.description}
            iconUrl={moneyIcon}
          />
          <Card
            title={text.security.title}
            description={text.security.description}
            iconUrl={securityIcon}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
