import React from 'react';
import { generateComponent } from '../../../utils/component';

export default function UserSecurity({ info }) {
    return info && generateComponent(info)
}