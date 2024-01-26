import { useState } from 'react';
import './App.css';
import contactsData from './contacts.json';

function App() {
	const firstFive = contactsData.slice(0, 5);
	const [contacts, setContacts] = useState(firstFive);

	const addRandomContact = () => {
		if (contacts.length === contactsData.length) {
			return;
		}

		const remainingContacts = contactsData.filter(
			(contact) => !contacts.find((contactState) => contactState.id === contact.id)
		);

		const randomIndex = Math.floor(Math.random() * remainingContacts.length);
		const contactToAdd = remainingContacts[randomIndex];
		setContacts([contactToAdd, ...contacts]);
	};

	const sortByName = () => {
		const copy = [...contacts];

		copy.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

		setContacts(copy);
	};

	const sortByPopularity = () => {
		const copy = [...contacts];

		copy.sort((a, b) => b.popularity - a.popularity);

		setContacts(copy);
	};

	const removeContact = (id) => {
		const newContacts = contacts.filter((contact) => contact.id !== id);

		setContacts(newContacts);
	};

	return (
		<div className='App'>
			<h1>LAB | React IronContacts</h1>

			<div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem' }}>
				<button onClick={addRandomContact}>Add Random Contact</button>
				<button onClick={sortByName}>Sort by Name</button>
				<button onClick={sortByPopularity}>Sort by Popularity</button>
			</div>

			<table>
				<thead>
					<tr>
						<td>Picture</td>
						<td>Name</td>
						<td>Popularity</td>
						<td>Won Oscar</td>
						<td>Won Emmy</td>
						<td>Actions</td>
					</tr>
				</thead>

				<tbody>
					{contacts.map((contact) => (
						<tr key={contact.id}>
							<td>
								<img src={contact.pictureUrl} alt={contact.name} />
							</td>
							<td>{contact.name}</td>
							<td>{contact.popularity.toFixed(2)}</td>
							<td>{contact.wonOscar && '🏆'}</td>
							<td>{contact.wonEmmy && '🌟'}</td>
							<td>
								<button
									onClick={() => {
										removeContact(contact.id);
									}}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
