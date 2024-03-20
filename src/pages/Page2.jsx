import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Page2() {
  const [apiResponse, setApiResponse] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [workDone, setWorkDone] = useState("");
  const token = localStorage.getItem('Token');

  const fetchItems = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      };

      const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("data==>", data);
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [workDone]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    setShowModal(false);

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(selectedItem),
      };

      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${selectedItem._id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to update note');
        setWorkDone("Edited");
      }
      console.log('Note updated successfully');
      toast.success('Updated Sucessfully');

    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  const handleDelete = async (item) => {
    setSelectedItem(item);
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      };
  
      const response = await fetch(`http://localhost:5000/api/notes/deletenote/${selectedItem._id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to delete note');

      }
      // Update the item list after deletion
      toast.success('Deleted Sucessfully');
      console.log('Note deleted successfully');
      setWorkDone("Deleted");
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  
  return (
  <>
     <div className='wfull h-[100vh]'>
     <ToastContainer /> 

      <h1 className='my-3 text-center'><b>List of Items</b></h1>
      <div className='w-full flex flex-wrap'>
        {apiResponse.map((item, index) => (
          <div key={index} className='w-[300px] h-[fit-content] border-1 border-[#b5cfea] rounded-xl bg-[#4281b942] mx-auto'>
            <h1 className='text-center'>{item.title}</h1>
            <p className='text-center'>{item.description}</p>
            <h5 className='text-center'>{item.price}</h5>
            <div className='w-full flex justify-end pe-3 my-2'>
              <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(item)} className='text text-orange-500' />
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item)} className='ml-5 text-red-700'/>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='flex w-full justify-center'>
          <h1>Title</h1>
          <input
            type="text"
            className='border-2 rounded-full px-2'
            value={selectedItem ? selectedItem.title : ''}
            onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
          />
         </div>
         <div className='flex w-full justify-center'>
          <h1>Description:</h1>
         <input
            type="text"
            className='border-2 rounded-full px-2'
            value={selectedItem ? selectedItem.description : ''}
            onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
          />
         </div>
         <div className='flex w-full justify-center'>
          <h1>Price:</h1>
         <input
            type="text"
            className='border-2 rounded-full px-2'
            value={selectedItem ? selectedItem.price : ''}
            onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
          />
         </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button className='bg-red-500' onClick={() => setShowModal(false)}>Cancel</Button>
          <Button className='bg-blue-500' onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  </>
  );
}

export default Page2;
