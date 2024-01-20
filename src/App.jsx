import { useState } from 'react';
import './App.css';
import contactOriginal from './contacts.json';

function App() {
	const firstFive = contactOriginal.slice(0, 5);
  const [contacts, setContacts] = useState(firstFive)

  const randomContact = () => {
    const idsUsed = {}
    contacts.forEach(contact => {
      idsUsed[contact.name] ? null : idsUsed[contact.name] = true 
    })
    
    return function addRandom(){
      if(contacts.length === contactOriginal.length) return
      const noDuplicates = contactOriginal.filter(contact => !(contact.name in idsUsed))
      
      const randomIndex = Math.floor(Math.random() * noDuplicates.length)
      const randomContact = noDuplicates[randomIndex]
      idsUsed[randomContact.name] = true
      setContacts([randomContact, ...contacts])
    }
  }

  const sortName = () => {
    const copy = [...contacts]
    copy.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    })

    setContacts(copy)
  }

  const sortPopulatiry = () => {
    const copy = [...contacts]
    copy.sort((a, b) => {
      return b.popularity - a.popularity
    })

    setContacts(copy)
  }

  const removeContact = (id) => {
    setContacts(previousContacts => {
      return previousContacts.filter(contact => contact.id !== id)
    })
  }
  
	return (
		<div className='App'>
			<h1>LAB | React IronContacts</h1>

      <button onClick={randomContact()}>Add random contact</button>
      <button onClick={sortName}>Sort by name</button>
      <button onClick={sortPopulatiry}>Sort by popularity</button>
			<table>
				<thead>
					<tr>
						<td>Picture</td>
						<td>Name</td>
						<td>Popularity</td>
						<td>Won Oscar</td>
						<td>Won Emmy</td>
						<td>Action</td>
					</tr>
				</thead>
				<tbody>
					{contacts.map((contact) => (
						<tr key={contact.id}>
							<td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
							<td>{contact.name}</td>
							<td>{Number(contact.popularity.toFixed(2))}</td>
							<td>{contact.wonOscar && <span>🏆</span>}</td>
							<td>{contact.wonEmmy && '🌟'}</td>
							<td><button onClick={() => removeContact(contact.id)}>Delete</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
