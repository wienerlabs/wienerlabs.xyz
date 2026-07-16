import './App.css'
import Capsule from './components/Capsule/Index'
import CardScanner from './components/CardScanner/Index'
import Craft from './components/Craft/Index'
import { useEffect } from 'react';
import Home from './components/Home/Index'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Para from './components/Paragraph/Index'
import Para2 from './components/Paragraph2/Index'
import Partners from './components/Partners/Index'
import Ambassadors from './components/Ambassadors/Index'
import Real from './components/Real/Index'
import Team from './components/Team/Index'
import Footer from './components/Footer/Index';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.setAttribute("theme", "black");

    const themeTriggers = [];
    const list = document.querySelectorAll('.section[data-color]')
    list.forEach(function(e) {
      themeTriggers.push(ScrollTrigger.create({
        trigger: e,
        start: "top 90%",
        end: "bottom 90%",
        onEnter: function(){
          document.body.setAttribute("theme", e.dataset.color);
        },
        onEnterBack: function() {
          document.body.setAttribute("theme", e.dataset.color);
        }
      }))
    })

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refreshTimer);
      themeTriggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <div className='section main w-full '>
      <Home  />
      <Craft />
      <Real />
      <Team  />
      <Partners />
      <Ambassadors />
      <Para  />
      <Para2 />
      <Capsule />
      <CardScanner />
      <Footer />
    </div>
  )
}

export default App
