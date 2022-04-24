import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Message = ({ name, view, handleGoBack }) => {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const details = { name: newName.toLowerCase(), title, body };
  const nameConvert = name.toLowerCase();

  useEffect(() => {
    fetch('https://email-kin.herokuapp.com/api/v1/messages/' + nameConvert)
      .then(res => res.json())
      .then(result => {
        setUser(
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      });
  }, [user]);

  const handleMessage = () => {
    fetch('https://email-kin.herokuapp.com/api/v1/messages/', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(err => err);
  };

  return (
    <div className={view ? 'Message show' : 'Message'}>
      <Button className="go-back" onClick={handleGoBack}>
        Go back
      </Button>
      <div className="details">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jon Doe"
              onChange={e => setNewName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your title"
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            onChange={e => setBody(e.target.value)}
          >
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
        <Button className="add-message" onClick={handleMessage}>
          Send Message
        </Button>
        <div>
          <h2>Messages</h2>
          <ul>
            {user.map(user => (
              <li key={user._id}>
                <h3>{user.title}</h3>
                <p>{user.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Message;
