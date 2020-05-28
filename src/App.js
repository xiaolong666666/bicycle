import React from 'react';
import './api/basic'
import './api/high'

const App = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default App;