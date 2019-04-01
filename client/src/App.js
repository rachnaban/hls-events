import React from 'react';
import "../src/scss/index.scss";
import { useState, useEffect } from 'react';
function useWindowWidth() {
    const [ width, setWidth ] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return width;

}
/*function App() {
    const width = useWindowWidth(); // Our custom Hook
    return (
        <p>Window width is {width}</p>
    );
};*/

class App extends React.Component {
    state = { counter: 0 };
    /*componentDidMount() {
        this.setState({counter: 1});}*/
    render() {
        console.log('app render');
        return (<div>Hello</div>)
    }
}



export default App;

