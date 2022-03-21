import React from 'react';
import { isArray, exists } from "./basics";
import Text from '../components/text';
import Box from '../components/containers/box';
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
import { UnOrderedList, OrderedList } from '../components/list';
import AdvancedList from '../components/list/advanced';
import Image from '../components/image';
import Accordion from '../components/accordion';
import Menu from '../components/menu';
import * as Icons from '../components/icons';
import Avatar from '../components/avatar';
import CheckBox from '../components/checkbox';
import MultiChoiceMenu from '../components/menu/multi-choice';
import IconButton from '../components/button/icon-button';
import Heading from '../components/custom/heading';
import HeaderMenu from '../components/custom/header-menu';
import AccordionMenu from '../components/custom/accordion-menu';
import Grid from '../components/containers/grid';


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
 * Function `generateComponent` - returns single/collection of React Components based on the Config Descriptor data provided.
 * 
 * @param {Object OR Array of Objects} componentData - Config Descriptor(s)
 */
export function generateComponent(componentData) {
	// If incoming `componentData` is array, loop over them.
	if (isArray(componentData)) {
		return componentData.map(
			(c, i) => generateComponent({
				...c,
				key: componentData?.key || `component-${Math.random() * 100000}-${i}`
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
		events,
		fieldName,
		handleChange,
		...props
	} = componentData;

	const tempChangeEvent = handleChange && { onChange: handleChange(fieldName) };

	const componentProps = {
		key,
		...props,
		...styles,
		...events,
		...tempChangeEvent
	};

	switch(type) {
		case 'box':
			return (
				<Box {...componentProps}>
					{children && generateComponent(children)}
				</Box>
			);
		case 'text':
			return (
				<Text {...componentProps} variant={variant}>
					{label}
					{children && generateComponent(children)}
				</Text>
			);
		case 'textfield':
			switch(variant) {
				case 'email':
					return <EmailField {...componentProps} label={label} />
				case 'password':
					return <PasswordField {...componentProps} label={label} />
				default:
					return <TextField {...componentProps} label={label} />
			}
		case 'button':
			switch(variant) {
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
			switch(variant) {
				case 'ordered':
					return <OrderedList {...componentProps} baseKey={key} items={children} />
				case 'unordered':
					return <UnOrderedList {...componentProps} baseKey={key} items={children} />
				case 'advanced':
					return <AdvancedList {...componentProps} baseKey={key} items={children} />
				default:
					return <UnOrderedList {...componentProps} baseKey={key} items={children} />
			}
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
					{children && generateComponent(children)}
				</IconButton>
			);
		case 'icon':
			const Icon = Icons[icon];
			return <Icon {...componentProps} />
		case 'avatar':
			return <Avatar {...componentProps} label={label} />
		case 'checkbox':
			return <CheckBox {...componentProps} label={label} />
		case 'multiChoiceMenu':
			return <MultiChoiceMenu {...componentProps} baseKey={key} items={children} />
		case 'heading':
			return <Heading {...componentProps} label={label} variant={variant} />
		case 'headerMenu':
			return <HeaderMenu {...componentProps} baseKey={key} items={children} />
		case 'accordionMenu':
			return <AccordionMenu {...componentProps} baseKey={key} label={label} items={children} />
		case 'grid':
			return <Grid {...componentProps} baseKey={key} items={children} />
	}
}