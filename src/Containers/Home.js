import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/form';
import { useState } from 'react';
import Message from './Message';


const Home = () => {
  const [name, setName] = useState('');
  const [view, setView] = useState(true);

  const handleSignin = e => {
    e.preventDefault();

    fetch(
      'https://email-kin.herokuapp.com/api/v1/messages/' + name.toLowerCase()
    )
      .then(res => res.json())
      .then(result => {
        // handleName(name);
        setView(false);
      });
  };

  const handleClick = () => {
    if (name.length > 0) setView(false);
  };

  const handleGoBack = () => {
    setView(true);
  };

  return (
    <div className="enter-name">
      {view && (
        <div className={view ? 'container' : 'hidden'}>
          <h1 className="yo">Your Name Pls!</h1>
          <Form onSubmit={handleSignin}>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={e => setName(e.target.value)}
              className="input"
              required
            />
            <Button type="submit" className="input" onClick={handleClick}>
              Sign in
            </Button>
          </Form>
        </div>
      )}

      {view || <Message name={name} view={view} handleGoBack={handleGoBack} />}
    </div>
  );
};

export default Home;
