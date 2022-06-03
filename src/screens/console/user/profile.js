import React from 'react';
import { generateComponent } from '../../../utils/component';

export default function UserProfile({ info }) {
    return info && generateComponent(info)
}