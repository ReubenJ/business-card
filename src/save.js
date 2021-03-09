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
import { useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const {
		className,
		attributes: { fullName, mediaID, mediaURL, website, phone, address },
		setAttributes,
	} = props;
	var websiteToLink = website;
	if (website) {
		if (!website.startsWith("http") || !website.startsWith("https")) {
		websiteToLink = 'https://'.concat(website);
	}
	}
	return (
		<div className="wp-block-reubenj-business-card">
			{ mediaURL && (
				<img
					className="card-image"
					src={ mediaURL }
					alt={ __( 'Card Image', 'business-card' ) }
				/>
			) }
			<RichText.Content
				tagName="h3"
				className="fullName"
				value={ fullName }
			/>
			
			<p>
				<Button
					className="website"
					isLink
					href={ websiteToLink }
				>
					{ website }
				</Button>
			</p>

			<p>
				<Button
					className="phone"
					isLink
					href={ 'tel:'.concat(phone) }
				>
					{ phone }
				</Button>
			</p>

			<p>
				<Button
					className="address"
					isLink
					href={ 'https://www.google.com/maps/search/'.concat(address) }
				>
					{ address }
				</Button>
			</p>
		</div>
	);
}
