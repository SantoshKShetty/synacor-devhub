import React from 'react';
import ReactList from '@material-ui/core/List';
import ReactListItem from '@material-ui/core/ListItem';
import ReactListItemIcon from '@material-ui/core/ListItemIcon';
import ReactListItemText from '@material-ui/core/ListItemText';
import { generateComponent } from '../../utils/component';
import { isArray } from '../../utils/basics';
import { makeStyles } from '../../provider/theme';

const styles = makeStyles(
    ({ spacing }) => ({
        bulletin: {
            minWidth: 'fit-content',
            marginRight: spacing(2)
        },
        txt: {
            margin: 0
        }
    })
);

export default function AdvancedList({
    baseKey,
    items,
    dense = true,
    listStyle: { styles: listStyles, ...bulletinDesc } = {},
    ...props
}) {
    if (!isArray(items)) return null;

    const classes = styles();
    const Bulletin = React.cloneElement(
        React.Children.only(
            bulletinDesc && generateComponent(bulletinDesc) || <React.Fragment />
        ),
        { style: {...listStyles} }
    );

    return (
        <ReactList dense={dense} {...props}>
            {items.map((item, i) => (
                <ReactListItem key={`${baseKey}-${i}`}>
                    <ReactListItemIcon className={classes.bulletin}>{Bulletin}</ReactListItemIcon>
                    <ReactListItemText className={classes.txt} primary={generateComponent(item)} />
                </ReactListItem>
            ))}
        </ReactList>
    );
}