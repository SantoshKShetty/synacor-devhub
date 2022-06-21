import { generateComponent } from '../../../utils/component';

export default function UserSecurity({ screenInfo }) {
    return screenInfo && generateComponent(screenInfo)
}