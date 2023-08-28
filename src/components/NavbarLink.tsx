import React from 'react';
import {NavLink} from 'react-router-dom';

interface NavLinkProps {
    to: string;
    linkName: string;
}

const NavbarLink: React.FC<NavLinkProps> = ({to, linkName}) => {
    return (
        <li className='nav-item'>
            <NavLink className='nav-link fw-bold'
                     style={{color: 'var(--dark-grey)', fontSize: 'var(--navbar-link-size)'}}
                     to={to}>
                {linkName}
            </NavLink>
        </li>
    )
};

export default NavbarLink;

