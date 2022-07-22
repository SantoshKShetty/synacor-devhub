import { generateComponent } from '../../../utils/component';

export default function UserApplications({ screenInfo }) {
    return screenInfo && generateComponent(screenInfo)
}