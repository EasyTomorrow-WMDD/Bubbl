import {Header as HeaderRNE} from '@rneui/themed'

const Header = () => {
    return (
        <HeaderRNE backgroundColor='black' centerComponent={{
            text: 'Bubbl.',
            style:{color: '#fff', fontSize: 20, padding:5 }
        }}></HeaderRNE>
    )
}

export default Header