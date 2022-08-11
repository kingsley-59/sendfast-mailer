

export default function Contacts() {


    return (
        <div className="position-relative py-4 px-3">
            <div className="contacts-heading">
                <span className="h2">Contacts</span>
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
                    <tr>
                        <td>1</td>
                        <td>James</td>
                        <td>jameshungerson@gmail.com</td>
                        <td>12-08-2020 19:23:05</td>
                        <td role={'button'}><i className="bi bi-trash3-fill text-danger"></i></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>James</td>
                        <td>jameshungerson@gmail.com</td>
                        <td>12-08-2020 19:23:05</td>
                        <td role={'button'}><i className="bi bi-trash3-fill text-danger"></i></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>James</td>
                        <td>jameshungerson@gmail.com</td>
                        <td>12-08-2020 19:23:05</td>
                        <td role={'button'}><i className="bi bi-trash3-fill text-danger"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
