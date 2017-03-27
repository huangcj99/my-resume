import { Component } from 'react';
import { Link } from 'react-router';

export default class Service extends Component {
    render () {
        return (
            <div>
                <div>
                    <Link to='/service_beauty'>beauty</Link>
                </div>
                <div>
                    <Link to='/service_treatment'>treatment</Link>
                </div>
                <div>
                    <Link to='/service_care'>case</Link>
                </div>
            </div>
        )
    }
}