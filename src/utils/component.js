import React from 'react';
import { isArray, exists } from "./basics";
import Text from '../components/text';
import Box from '../components/containers/box';
import Divider from '../components/divider';
import TextField from '../components/textfield';
import EmailField from '../components/textfield/email';
import PasswordField from '../components/textfield/password';
import PrimaryBtn from '../components/button/primary';
import SecondaryBtn from '../components/button/secondary';
import Button from '../components/button';
import { GithubSigningBtn, GoogleSigningBtn, MicrosoftSigningBtn } from '../components/button/social';
import ToggleButtonGroup from '../components/toggle-btn-group';
import Link from '../components/link';
import { UnOrderedList, OrderedList } from '../components/list';
import AdvancedList from '../components/list/advanced';
import Image from '../components/image';
import Accordion from '../components/accordion';
import Menu from '../components/menu';
import * as Icons from '../components/icons';
import Avatar from '../components/avatar';
import CheckBox from '../components/checkbox';
import MultiChoiceMenu from '../components/menu/multi-choice';
import IconButton from '../components/button/icon';
import Heading from '../components/custom/heading';
import HeaderMenu from '../components/custom/header-menu';
import AccordionMenu from '../components/custom/accordion-menu';
import Grid from '../components/containers/grid';
import {
	ACCORDION_TYPE,
	ACTION_TYPES,
	AVATAR_TYPE,
	CONTAINER_TYPES,
	DISPLAY_TYPES,
	ICON_TYPE,
	IMAGE_TYPE,
	LINK_TYPE,
	LIST_TYPES,
	MENU_TYPES,
	USER_INPUT_TYPES
} from '../constants/field-types';
import { useForm } from '../components/form';


/**
 * Function `composeComponents` - returns hierarchical components' ordered/wrapped as per the arguments provided.
 * 
 * How to call this function ?
 *     composeComponents(
 *         HOC - n,
 *         HOC - n-1,
 *         HOC - n-2,
 *         HOC - n-3
 *     )(Child)
 * where `Child` - Leaf Node in the Components' hierarchy and,
 * HOC - `Higher Order Component` and `n` is the level of that HOC in the hierarchy.
 * 
 * So, to achieve below hierarchy of components (along with props),
 * (
 *   <HOC n>
 *     <HOC n-1 prop1={val1} prop2={val2}>
 *       <Child>
 *     </HOC n-1>
 *   </HOC n>
 * )
 * we need to call,
 * composeComponents(
 *     HOC n,
 *     [HOC n-1, { prop1: val1, prop2: val2 }],
 * )(Child)
 */
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


/**
 * Function returns a random key attaching prefix and suffix (if passed).
 *
 * @param {String} prefix
 * @param {String} suffix
 */
export function generateKey(prefix = 'component', suffix = '', randomize = false) {
	return `${prefix}-${randomize ? Math.random() * 1000000 : ''}-${suffix}`;
}


/**
 * Function `generateComponent` - returns single/collection of React Components based on the Config Descriptor data provided.
 * 
 * @param {Object OR Array of Objects} componentData - Config Descriptor(s)
 */
export function generateComponent(componentData) {
	if (!exists(componentData)) return null;

	// If incoming `componentData` is array, loop over them.
	if (isArray(componentData)) {
		return componentData.map(
			(c, i) => generateComponent({
				...c,
				key: generateKey(c.name || c.key, i)
			})
		);
	}

	const {
		type,
		variant,
		key,
		label,
		defaultValue,
		children,
		styles,
		icon,
		name,
		relatesToField,
		...props
	} = componentData;

	const { formError, bindFormEvents } = useForm();

	// Event props, later we can add custom events if required.
	const eventProps = bindFormEvents && bindFormEvents(type, name, defaultValue, relatesToField);

	// Form validation errors etc.
	const errorProps = formError && formError[name] && {
		error: true,
		helperText: formError[name]
	};

	const componentProps = {
		key,
		name,
		...props,
		...styles,
		...errorProps,
		...eventProps
	};

	switch(type) {
		case CONTAINER_TYPES.BOX :
			return (
				<Box {...componentProps}>
					{children && generateComponent(children)}
				</Box>
			);
		case DISPLAY_TYPES.TEXT :
			return (
				<Text {...componentProps} variant={variant}>
					{label}
					{children && generateComponent(children)}
				</Text>
			);
		case USER_INPUT_TYPES.TEXT_FIELD :
			switch(variant) {
				case USER_INPUT_TYPES.EMAIL_FIELD :
					return <EmailField {...componentProps} label={label} />
				case USER_INPUT_TYPES.PASSWORD_FIELD :
					return <PasswordField {...componentProps} label={label} />
				default :
					return <TextField {...componentProps} label={label} />
			}
		case ACTION_TYPES.BUTTON.GENERIC :
			switch(variant) {
				case ACTION_TYPES.BUTTON.PRIMARY :
					return <PrimaryBtn {...componentProps} label={label} />
				case ACTION_TYPES.BUTTON.SECONDARY :
					return <SecondaryBtn {...componentProps} label={label} />
				case ACTION_TYPES.BUTTON.SOCIAL.GOOGLE :
					return <GoogleSigningBtn {...componentProps} label={label} />
				case ACTION_TYPES.BUTTON.SOCIAL.MICROSOFT :
					return <MicrosoftSigningBtn {...componentProps} label={label} />
				case ACTION_TYPES.BUTTON.SOCIAL.GITHUB :
					return <GithubSigningBtn {...componentProps} label={label} />
				default :
					return <Button {...componentProps} label={label} />
			}
		case ACTION_TYPES.BUTTON.SUBMIT :
			return <PrimaryBtn {...componentProps} label={label} />
		case DISPLAY_TYPES.DIVIDER :
			return <Divider {...componentProps} />
		case LIST_TYPES.GENERIC :
			switch(variant) {
				case LIST_TYPES.ORDERED :
					return <OrderedList {...componentProps} baseKey={key} items={children} />
				case LIST_TYPES.UNORDERED :
					return <UnOrderedList {...componentProps} baseKey={key} items={children} />
				case LIST_TYPES.ADVANCED :
					return <AdvancedList {...componentProps} baseKey={key} items={children} />
				default :
					return <UnOrderedList {...componentProps} baseKey={key} items={children} />
			}
		case LINK_TYPE:
			return <Link {...componentProps} label={label} />
		case ACTION_TYPES.TOGGLE_BTN_GROUP:
			return <ToggleButtonGroup {...componentProps} baseKey={key} items={children} defaultValue={defaultValue} />
		case IMAGE_TYPE:
			return <Image {...componentProps} />
		case ACCORDION_TYPE:
			return <Accordion {...componentProps} baseKey={key} label={label} items={children} />
		case MENU_TYPES.GENERIC:
			return <Menu {...componentProps} baseKey={key} items={children} />
		case ACTION_TYPES.BUTTON.ICON:
			return (
				<IconButton {...componentProps}>
					{children && generateComponent(children)}
				</IconButton>
			);
		case ICON_TYPE:
			const Icon = Icons[icon];
			return <Icon {...componentProps} />
		case AVATAR_TYPE:
			return <Avatar {...componentProps} label={label} />
		case USER_INPUT_TYPES.CHECKBOX:
			return <CheckBox {...componentProps} label={label} />
		case MENU_TYPES.MULTI_CHOICE:
			return <MultiChoiceMenu {...componentProps} baseKey={key} items={children} />
		case 'heading':
			return <Heading {...componentProps} label={label} variant={variant} />
		case 'headerMenu':
			return <HeaderMenu {...componentProps} baseKey={key} items={children} />
		case MENU_TYPES.ACCORDION:
			return <AccordionMenu {...componentProps} baseKey={key} label={label} items={children} />
		case CONTAINER_TYPES.GRID:
			return <Grid {...componentProps} baseKey={key} items={children} />
	}
}