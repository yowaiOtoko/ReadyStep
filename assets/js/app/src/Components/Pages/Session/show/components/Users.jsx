import { CardBody, CardHeader, Card } from "reactstrap"


const Users = ({ users }) => {

    return (
        <Card>
            <CardHeader>{users.length} Utilisateurs</CardHeader>
            <CardBody>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    )
}

export default Users