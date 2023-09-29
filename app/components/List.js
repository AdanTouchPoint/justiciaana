import React, {useState} from 'react'
import Button from "react-bootstrap/cjs/Button";
import Modal from 'react-bootstrap/Modal';

const List = ({setAllDataIn, mp, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm, tweet}) => {
    const [checklistStates, setChecklistStates] = useState(Array(mp.length).fill(true));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async() => setShow(true);
    const toggleChecklist = (index) => {
      const newChecklistStates = [...checklistStates];
      newChecklistStates[index] = !newChecklistStates[index];
      setChecklistStates(newChecklistStates);
    };
  
    const click = async() => {   
      const selectedMps = await mp.filter((mp, index) => checklistStates[index]);
      const emails = await selectedMps.map((mp) => mp.contact);
      console.log(emails, 'allDataIn')
      if(checklistStates.every(state => !state)){
        handleShow();
        setShowEmailForm(true);
        setShowFindForm(false);
      } else {
        setAllDataIn(emails);
        setShowEmailForm(false);
        setShowFindForm(true);
      }
    };
    function urlEncode(text) {
      var encodedText = encodeURIComponent(text);
      return encodedText;
    }
    const decoder = urlEncode(tweet);
    const tweetText = `.${mp.twitter} ${decoder}`;
    return (

        <>
        <div className={'buttonsContainer'}>
          
            {mp.map((mp, index) => (
             <div   key={index}>
                <label className='list-mp-row' >
                    <input
                    id="representativeList-checkbox"
                    type='checkbox'
                    checked={checklistStates[index]}
                    onChange={() => toggleChecklist(index)}
                    />
                    <h5>{mp.name}</h5>  
                </label>
                <h7>{mp.govt_type}</h7> - <h7>{mp.state}</h7> 
                {mp.twitter ? <Button className="list-button"
              size={"sm"}
              variant={"dark"} href={`https://twitter.com/intent/tweet?text=.${mp.twitter} ${decoder}`}
              target={"blank"}> tweet</Button> : null}
                </div>                       
            ))}
        </div>
        <div className='btn-container-checklist'>
            <div className={'buttons'}>
                <div>
                    <Button id="representativeList-button" className='list-button' size={'md'} variant={'dark'} onClick={click}>
                    Enviar email
                    </Button>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Por favor seleccione almenos un representante</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default List


