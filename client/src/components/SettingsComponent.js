import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingsComponent = () => {
  const [libraries, setLibraries] = useState([]);
  const [newLibrary, setNewLibrary] = useState({name: '', path: ''});

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      const response = await axios.get('/api/libraries');
      setLibraries(response.data);
    } catch (error) {
      console.error('Error fetching libraries', error);
    }
  };

  const updateLibraries = async () => {
   try{
    await axios.post('/api/libraries',{libraries});
    fetchLibraries();
   } catch (error) {
    console.error('Error updating libraries',error);
  }
   }
   const deleteLibrary = async (name) => {
    try{
      await axios.delete('api/libraries/${name}');
      fetchLibraries();
    } catch (error) {
      console.error('Error deleting library:', error);
    }
  };
  
  const initiateAction = async (name, action) => {
    try {
      await axios.post('/api/libraries/${name}/action', {action});
      fetchLibraries();
    } catch (error) {
      console.error('Error initiating ${action} action:', error);
    }
  };
  
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedLibraries = libraries.map((library, idx) => {
      if (idx === index) {
        return { ...library, [name]: value };
      }
      return library;
    });
    setLibraries(updatedLibraries);
  };

  const handleNewLibraryChange = (event) => {
    const { name, value } = event.target;
    setNewLibrary((prev) => ({ ...prev, [name]: value }));
  };

  const addLibrary = () => {
    setLibraries([...libraries, newLibrary]);
    setNewLibrary({ name: '', path: '' });
  };

  return (
    <div className="settings-component">
      <h2 className="text-2xl font-bold mb-6">Library Settings</h2>
      {libraries.map((library, index) => (
        <div key={library.name} className="flex items-center">
          <input type="text" name="name" value={library.name} onChange={(e) => handleInputChange(e, index)}
          className='input-field' placeholder='Library Name'
        />
        <input type='text' name='path' value={library.path} onChange={(e) => handleInputChange(e, index)}
        className='input-field' placeholder='Library Path'/>
        <button onClick={() => initiateAction(library.name, 'scan')} className='scan-button'>Scan</button>
        <button onClick={() => initiateAction(library.name, 'purge')} className='purge-button'>Purge</button>
        <button onClick={() => deleteLibrary(library.name)} className='delete-button'>Delete</button>
        </div>
      ))}
       <div className="flex items-center">
        <input
          type="text"
          name="name"
          value={newLibrary.name}
          onChange={handleNewLibraryChange}
          className="input-field"
          placeholder="New Library Name"
        />
        <input
          type="text"
          name="path"
          value={newLibrary.path}
          onChange={handleNewLibraryChange}
          className="input-field"
          placeholder="New Library Path"
        />
        <button onClick={addLibrary} className="add-button">Add Library</button>
      </div>
      <button onClick={updateLibraries} className="update-button">Update Libraries</button>
    </div>
  );
};

export default SettingsComponent;
