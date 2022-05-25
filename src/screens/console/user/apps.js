import React from 'react';
import { generateComponent } from '../../../utils/component';

export default function UserApplications({ info }) {
    return info && generateComponent(info)
}