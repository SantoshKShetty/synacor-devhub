import { generateComponent } from '../../../utils/component';

export default function UserProfile({ screenInfo }) {
    return screenInfo && generateComponent(screenInfo)
}