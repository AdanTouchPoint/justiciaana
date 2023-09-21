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
                <h7>{mp.govt_type}</h7> -  Estado de  <h7>{mp.state}</h7> 
                </div>                       
            ))}
        </div>
        <div className='btn-container-checklist'>
            <div className={'buttons'}>
                <div>
                    <Button id="representativeList-button" className='list-button' size={'md'} variant={'dark'} onClick={click}>
                    Proceed to Email
                    </Button>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Advice</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please check the box of at least one representative</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default List


