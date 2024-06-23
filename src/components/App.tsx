import '../assets/styles/styles.scss';
import '../assets/styles/styles.css';
import Home from '../pages/Home';

const App = () => {
  return (
    <main className="relative h-screen bg-black-100 flex justify-center items-center flex-col overflow-x-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Home />
      </div>
    </main>
  );
};

export default App;
