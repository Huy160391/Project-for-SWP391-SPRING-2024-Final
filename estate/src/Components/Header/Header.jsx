import './Headers.css';
const navigation = [
    { name: 'Property', href: '/property', current: false },
    { name: 'Project', href: '/realestatelisting', current: false },
    { name: 'Agent', href: '/agency', current: false },
    { name: 'About Us', href: '/aboutus', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (

        <header >
            <div className="Logo"><img src="/logo.png" alt="" /></div>
            <div className='header'>
            <ul>
                <li>Property</li>
                <li>Project</li>
                <li>Agency</li>
                <li>About Us</li>
                
            </ul>
            </div>
                <button>Login</button>
        </header>
    )
}
