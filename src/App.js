import React from 'react';
import './api/basic'

const App = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default App;