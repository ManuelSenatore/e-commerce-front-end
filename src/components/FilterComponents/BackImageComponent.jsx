import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// COMPONENTE DINAMICO CHE CAMBIA A SECONDA DELLA CATEGORIA

function BackImageComponent() {
  const [title, setTitle] = useState("");
  const location = useLocation();

  const generateTitle = () => {
    if(location.pathname === "/cancelleria"){
      setTitle("CANCELLERIA")
    }
    else if(location.pathname === "/ufficio"){
      setTitle("UFFICIO")
    }
    else if(location.pathname === "/svago"){
      setTitle("SVAGO")
    }
    else if(location.pathname === "/scuola"){
      setTitle("SCUOLA")
    }
  }

  useEffect(() => {
    generateTitle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
      <div className='backgroundImage mt-3'>
        <h1 className='titleImage'>{title}</h1>
      </div>
  );
}

export default BackImageComponent;
