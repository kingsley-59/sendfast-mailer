import { FormEvent, useState } from "react"
import contactsData from "../../data/contacts"


export default function Contacts() {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    function handleNewContacts(e: FormEvent) {
        e.preventDefault()

        console.log('name', name)
        console.log('email', email)
    }

    return (
        <div className="position-relative py-4 px-3">
            <div className="contacts-heading">
                <span className="h2">Contacts</span>
            </div>
            <div className="position-fixed" style={{bottom: '50px', right: '30px'}}>
                <div className={`p-3 rounded-3 shadow bg-light mb-3 ${showForm ? 'd-block' : 'd-none'}`} style={{minWidth: '300px', minHeight: '300px'}}>
                    <div className="text-end">
                        <i className="bi bi-x-circle" onClick={() => setShowForm(false)}></i>
                    </div>
                    <div className="fs-5 fw-bold text-center mb-3">New Contact</div>
                    <form onSubmit={handleNewContacts} >
                        <div className="mb-3">
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder={'name'} required/>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder={'email'} required/>
                        </div>
                        <div className="mb-3 text-center">
                            <button type="submit" className="btn-secondary p-2 border-0 rounded-2 ">Add contact</button>
                        </div>
                    </form>
                </div>
                <div role={'button'} onClick={() => setShowForm(true)} className="rounded-circle shadow bg-secondary d-flex align-items-center justify-content-center ms-auto" style={{width: '60px', height: '60px'}}>
                    <i className="bi bi-person-plus-fill fs-4 text-light"></i>
                </div>
            </div>
            <hr className="hr" />
            <div className="d-flex align-items-center justify-content-between">
                <div className="search-box bg-white rounded-2">
                    <i className="bi bi-search p-2"></i>
                    <input type="search" className="p-2 border border-light rounded-2" placeholder="search contacts" />
                </div>
                <div className="filter-icon dropdown">
                    <span className="border border-dark rounded-2 p-2 dropdown-toggle" id="sortMenu" role={'button'} data-bs-toggle="dropdown" aria-expanded="false">
                        Sort by <i className="bi bi-filter-left p-2"></i>
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="sortMenu">
                        <li><span role={'button'} className="dropdown-item" >Name</span></li>
                        <li><span role={'button'} className="dropdown-item" >Email</span></li>
                        <li><span role={'button'} className="dropdown-item" >Date added</span></li>
                    </ul>
                </div>
            </div>
            <table className="table table-light table-hover my-3">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contactsData.map((contact, idx) => (
                            <tr>
                                <td>{idx + 1}</td>
                                <td>{contact?.name}</td>
                                <td>{contact?.email}</td>
                                <td>{contact?.date_added}</td>
                                <td role={'button'}><i className="bi bi-trash3-fill text-danger"></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
