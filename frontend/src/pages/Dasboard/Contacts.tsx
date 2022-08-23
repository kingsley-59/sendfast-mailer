import axios from "axios";
import { FormEvent, useEffect, useState } from "react"
import ContactModal from "../../components/Modals/ContactModal";
import { API_URL } from "../../config/config";
import { useAuthContext } from "../../contexts/AuthContext";

interface IContacts {
    name?: String | null,
    email?: String | null,
    created_at?: Date | any
}

export default function Contacts() {
    const [show, setShow] = useState(false);
    const [activeContact, setActiveContact] = useState(null)
    const [contactsError, setContactsError] = useState('')
    const [contactsSuccess, setContactsSuccess] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contacts, setContacts] = useState<IContacts[]>([])
    const [loading, setLoading] = useState(false)

    const { saveContacts } = useAuthContext()
    const token = localStorage.getItem('token')

    async function handleNewContacts(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setContactsError('')

        try {
            let payload = { name, email }
            let { data, status } = await axios.post(`${API_URL}/contacts/add`, payload, {
                headers: { authorization: `Bearer ${token}` }
            })
            if (status === 200) {
                setName('')
                setEmail('')
                setContactsSuccess('Saved')
                setTimeout(() => setContactsSuccess(''), 5000)
                console.log(data)
            }
            setLoading(false)
        } catch (error: any) {
            setContactsError(error?.message)
            setLoading(false)
        }
    }

    function handleContactModal(contact: any): any {
        setShow(true)
        setActiveContact(contact)
    }

    useEffect(() => {
        if (!token) {
            return;
        }
        axios.get(`${API_URL}/contacts/all`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then(res => {
                let { data } = res.data
                if (typeof data !== 'object' || data?.length < 1) {
                    setContactsError('Invalid contacts data!')
                    return;
                }
                saveContacts(data)
                setContacts(data)
            })
            .catch(error => {
                setContactsError(error?.message)
            })
    }, [saveContacts, token])

    return (
        <div className="position-relative py-4 px-3">
            <div className="contacts-heading">
                <span className="h2">Contacts</span>
            </div>
            <div className="position-fixed" style={{ bottom: '50px', right: '30px' }}>
                <div className={`p-3 rounded-3 shadow bg-light mb-3 ${showForm ? 'd-block' : 'd-none'}`} style={{ minWidth: '300px', minHeight: '300px' }}>
                    <div className="text-end">
                        <i className="bi bi-x-circle" onClick={() => setShowForm(false)}></i>
                    </div>
                    <div className="fs-5 fw-bold text-center mb-3">New Contact</div>
                    <div className="text-center">
                        {contactsSuccess && <span className="text-success">{contactsSuccess}</span>}
                        {contactsError && <span className="text-danger">{contactsError}</span>}
                    </div>
                    <form onSubmit={handleNewContacts} >
                        <div className="mb-3">
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder={'name'} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder={'email'} required />
                        </div>
                        <div className="mb-3 text-center">
                            <button type="submit" className="btn-secondary p-2 border-0 rounded-2 ">{loading ? 'Saving...' : 'Add contact'}</button>
                        </div>
                    </form>
                </div>
                <div role={'button'} onClick={() => setShowForm(prev => !prev)} className="rounded-circle shadow bg-secondary d-flex align-items-center justify-content-center ms-auto" style={{ width: '60px', height: '60px' }}>
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
                        contacts.map((contact, idx) => (
                            <tr key={idx} onClick={() => handleContactModal(contact)}>
                                <td>{idx + 1}</td>
                                <td>{contact?.name}</td>
                                <td>{contact?.email}</td>
                                <td>{contact?.created_at}</td>
                                <td className="text-center" role={'button'}><i className="bi bi-trash3-fill text-danger"></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ContactModal show={show} setShow={setShow} contact={activeContact} />
        </div>
    )
}
