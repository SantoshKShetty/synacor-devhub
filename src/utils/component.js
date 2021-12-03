import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { isArray, exists } from "./basics";
import Text from '../components/text';
import Box from '../components/box';
import Divider from '../components/divider';
import TextField from '../components/textfield';
import EmailField from '../components/textfield/email';
import PasswordField from '../components/textfield/password';
import PrimaryCTABtn from '../components/button/primary-cta';
import SecondaryCTABtn from '../components/button/secondary-cta';
import GithubSignBtn from '../components/button/social-signing/github';
import GoogleSignBtn from '../components/button/social-signing/google';
import MicrosoftSignBtn from '../components/button/social-signing/microsoft';
import Button from '../components/button';
import ToggleButtonGroup from '../components/toggle-btn-group';
import Link from '../components/link';
import List from '../components/list';
import Image from '../components/image';
import Accordion from '../components/accordion';
import Menu from '../components/menu';
import * as Icons from '../components/icons';
import Avatar from '../components/avatar';
import CheckBox from '../components/checkbox';

export function composeComponents() {
	return children => [...arguments].reverse().reduce((acc, item) => {
		const [Component, props] = isArray(item) ? item : [item, {}];

		// Pickup only non-null/non-undefined values as rendering such values as JSX is errorneous.
		if (exists(Component)) {
			acc = <Component {...props}>{acc}</Component>;
		}

		return acc;
	}, children);
}

export function generateComponent(componentData) {
	const {
		type, subType,
		key,
		label,
		defaultValue,
		children,
		styles,
		icon,
		...props
	} = componentData;

	const componentProps = {
		key,
		...props,
		...styles
	};

	switch(type) {
		case 'box':
			return (
				<Box {...componentProps}>
					{children && children.map((c, i) => generateComponent({ ...c, key: `${key}-${i}` }))}
				</Box>
			);
		case 'text':
			return (
				<Text {...componentProps}>
					{label}
				</Text>
			);
		case 'textfield':
			switch(subType) {
				case 'email':
					return <EmailField {...componentProps} label={label} />
				case 'password':
					return <PasswordField {...componentProps} label={label} />
				default:
					return <TextField {...componentProps} label={label} />
			}
		case 'button':
			switch(subType) {
				case 'primary':
					return <PrimaryCTABtn {...componentProps} label={label} />
				case 'secondary':
					return <SecondaryCTABtn {...componentProps} label={label} />
				case 'socialGoogle':
					return <GoogleSignBtn {...componentProps} label={label} />
				case 'socialMicrosoft':
					return <MicrosoftSignBtn {...componentProps} label={label} />
				case 'socialGithub':
					return <GithubSignBtn {...componentProps} label={label} />
				default:
					return <Button {...componentProps} label={label} />
			}
		case 'divider':
			return <Divider {...componentProps} />
		case 'list':
			return <List {...componentProps} baseKey={key} items={children} />
		case 'link':
			return <Link {...componentProps} label={label} />
		case 'toggleBtnGroup':
			return <ToggleButtonGroup {...componentProps} baseKey={key} items={children} defaultValue={defaultValue} />
		case 'image':
			return <Image {...componentProps} />
		case 'accordion':
			return <Accordion {...componentProps} baseKey={key} label={label} items={children} />
		case 'menu':
			return <Menu {...componentProps} baseKey={key} items={children} />
		case 'iconButton':
			return (
				<IconButton {...componentProps}>
					{children && children.map((c, i) => generateComponent({ ...c, key: `${key}-${i}` }))}
				</IconButton>
			);
		case 'icon':
			const Icon = Icons[icon];
			return <Icon {...componentProps} />
		case 'avatar':
			return <Avatar {...componentProps} label={label} />
		case 'checkbox':
			return <CheckBox {...componentProps} label={label} />
	}
}