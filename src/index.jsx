import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'


function Cat(props) {
    let text = props.text;
    console.log(text)
    const [data, setData] = useState({loaded: false})

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            let url = "https://cataas.com/cat/gif/says/" + text + "?filter=sepia&color=orange";
            let response = await fetch(url);
            //another capacitor bug, doesn't work in webview
            //but let's assume it works
            let src = URL.createObjectURL(await response.blob());
            setData({loaded: true, src,});
        };

        dataFetch();
    }, []);
    if (!data.loaded) {
        return (<div>Loading</div>)
    }
    let src = data.src
    console.log(src)
    return (<img width={500} height={500} src={src} />);
}

function App() {
    return (<>
        <div>
            {[...Array(3)].map((_, i) => (<Cat key={i} text={"leaked memory cat  " + i}/>))}
        </div>
    </>)
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <App/>
</React.StrictMode>,)
