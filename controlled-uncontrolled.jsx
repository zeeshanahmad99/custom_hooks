import React, { useEffect, useRef } from 'react';

// https://jjenzz.com/component-control-freak

// First Example
// controlled and uncontrolled counter component
const Counter = ({ count, defaultCount = 0, onChange }) => {
  const [countSate, setCountState] = useState(defaultCount);
  const isControlled = count != null;
  const countValue = isControlled ? count : countState;
  const prevCountValueRef = useRef();
  const hasCountChanged = prevCountValueRef.current !== countValue;

  useEffect(() => {
    if (!hasCountChanged) return;

    useEffect(() => {
      if (isControlled) {
        onChange();
      } else {
        setCountState((countState) => countState + 1);
      }
    }, 1000);
  }, [hasCountChanged, isControlled, onChange]);

  useEffect(() => {
    prevCountValueRef.current = countValue;
  });

  return <span>{countValue}</span>;
};

// Second Example
// Uncontrolled Form

const Contact = () => {
  function handleSubmit(event) {
    const body = getFormData(event.target);

    fetch('/contact', { mode: 'post', body: JSON.stringify(body) });
    // .then(...)
    // .catch(...);

    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Message
        <textarea name="name" />
      </label>
      <label>
        <input type="checkbox" name="isSubscribed" />
        Please check this box if you would like to subscribe to our newsletter
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

function getFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}

// Third Example
// Uncontrolled paired with the key prop

// first attempt
const DEFAULT_COMMENT = 'Sounds decent';

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState();
  const [comment, setComment] = useState(DEFAULT_COMMENT);

  useEffect(() => {
    setComment(DEFAULT_COMMENT);
  }, [selectedPostId]);

  function handleSubmitComment(event) {
    submitComment(comment);
    event.preventDefault();
  }

  return (
    <div>
      <ul>
        {['1', '2', '3'].map((postId) => (
          <li>
            <input
              type="radio"
              value={postId}
              onChange={(event) => setSelectedPostId(event.target.value)}
              checked={selectedPostId === postId}
            />{' '}
            Post {postId}
          </li>
        ))}
      </ul>
      {selectedPostId && (
        <form onSubmit={handleSubmitComment}>
          <h2>Comment on post {selectedPostId}</h2>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </form>
      )}
    </div>
  );
};

// second attempt
const App = () => {
  const [selectedPostId, setSelectedPostId] = useState();

  return (
    <div>
      <ul>
        {['1', '2', '3'].map((postId) => (
          <li>
            <input
              type="radio"
              value={postId}
              onChange={(event) => setSelectedPostId(event.target.value)}
              checked={selectedPostId === postId}
            />{' '}
            Post {postId}
          </li>
        ))}
      </ul>
      {selectedPostId && <Comment key={selectedPostId} id={selectedPostId} />}
    </div>
  );
};

const Comment = ({ id }) => {
  function handleSubmitComment(event) {
    const formData = new FormData(event.target);
    submitComment(formData.get('comment'));
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmitComment}>
      <h2>Comment on post {id}</h2>
      <textarea name="comment" defaultValue={DEFAULT_COMMENT} />
    </form>
  );
};

// Third Example Switch
import { bool } from 'prop-types';
import styled from 'styled-components';

export const Switch = ({ defaultValue, onValueChange, ...props }) => {
  const [localValue = props.value, setLocalValue] = useState(defaultValue);
  const isControlled = props.hasOwnProperty('value');

  const handleChange = () => {
    if (isControlled) {
      onValueChange(!props.value);
    } else {
      setLocalValue((localValue) => {
        onValueChange(!localValue);
        return !localValue;
      });
    }
  };

  return (
    <Container isOn={localValue} {...props}>
      <Checkbox checked={localValue} onChange={handleChange} />
      <Handle isOn={localValue} />
    </Container>
  );
};

Switch.propTypes = {
  value: bool,
  defaultValue: bool,
};

Switch.defaultProps = {
  onValueChange: () => {},
};

const Container = styled.div`
  background: ${(props) => (props.isOn ? '#7d7' : '#ccc')};
  position: relative;
  display: inline-block;
  width: 35px;
  height: 20px;
  padding: 1px;
  border-radius: 10px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 1;
  opacity: 0;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #fff;
  transition: transform 200ms;
  transform: ${(props) => props.isOn && 'translateX(15px)'};
`;

const App = () => {
  const [error, setError] = useState();
  const [value, setValue] = useState(true);

  function handleSwitchValueChange(value) {
    setTimeout(() => {
      const isSuccessResponse = Math.random() >= 0.5;

      if (isSuccessResponse) {
        setValue(value);
        console.log('success');
      } else {
        setError(`api error ${Math.random()}`);
        console.log('fail');
      }
    }, 300);
  }

  return (
    <Container>
      <Switch
        defaultValue={value}
        onValueChange={handleSwitchValueChange}
        key={error}
      />
    </Container>
  );
};

const Container = styled.div`
  font-family: sans-serif;
`;
