/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		className,
		attributes: { fullName, mediaID, mediaURL, website, phone, address, style, backgroundColor, textColor },
		setAttributes,
	} = props;

	const onChangeName = ( value ) => {
		setAttributes( { fullName: value });
	};

	const onSelectImage = ( media ) => {
		setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};

	const onChangeWebsite = ( value ) => {
		setAttributes( { website: value });
	}

	const onChangePhone = ( value ) => {
		setAttributes( { phone: value });
	}

	const onChangeAddress = ( value ) => {
		setAttributes( { address: value });
	}

	return (
		<div className="wp-block-reubenj-business-card" style={{backgroundColor: backgroundColor, color: textColor}}>
			<div className="card-image">
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<div>
							{ ! mediaID ? (
								<Button 
									className={ mediaID
										? 'image-button'
										: 'button button-large'
									}
									onClick={ open }
								>
									__( 'Upload Image', 'business-card' )
								</Button>
							) : (
								<a onClick={ open }>
								<img
									src={ mediaURL }
									alt={ __(
										'Upload Card Image',
										'business-card'
									) }
								/></a>
							) }
						</div>
					) }
				/>
			</div>
			<RichText
				tagName="h3"
				placeholder={ __(
					'Full name...',
					'business-card'
				)}
				value={ fullName }
				onChange={ onChangeName }
			/>
			<RichText
				tagName="p"
				placeholder={ __(
					'Website...',
					'business-card'
				)}
				value={ website }
				onChange={ onChangeWebsite }
			/>
			<RichText
				tagName="p"
				placeholder={ __(
					'Phone number...',
					'business-card'
				)}
				value={ phone }
				onChange={ onChangePhone }
			/>
			<RichText
				tagName="p"
				placeholder={ __(
					'Address...',
					'business-card'
				)}
				value={ address }
				onChange={ onChangeAddress }
			/>
		</div>
	);
}
