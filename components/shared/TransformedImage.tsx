"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { debounce, getImageSize } from '@/lib/utils'
import { dataUrl } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TransformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload=false }: TransformedImageProps) => {
	const downloadHandler = () => {}
  return (
    // <div>TransformedImage</div>
		<div className="flex flex-col gap-4">
			<div className="flex-between">
				<h3 className="h3-bold text-dark-600">
					Transformed
				</h3>
				{hasDownload && (
					<Button className='download-btn' onClick={downloadHandler}>
						<Image src="/assets/icons/download.svg" alt="download" width={24} height={24} className='pb-[6px]' />
					</Button>
				)}
			</div>
			{image?.publicId && transformationConfig ? (
				<div className="relative">
					<CldImage
						width={getImageSize(type, image, "width")}
						height={getImageSize(type, image, "height")}
						src={image?.publicId}
						// alt={image?.title}
						alt={image?.title || 'Transformed image'}
						sizes={"(max-width: 767px) 100vw, 50vw"}
						placeholder={dataUrl as PlaceholderValue}
						className='transformed-image'
						onLoad={() => {
							if(setIsTransforming) setIsTransforming(false)
						}}
						onError={() => {
							debounce(() => {
								if(setIsTransforming)  setIsTransforming(false)
							}, 8000)
						}}
						{...transformationConfig}
					/>
					{isTransforming && (
						<div className="transforming-loader">
							<Image src="/assets/icons/spinner.svg" width={50} height={50} alt="transforming" />
						</div>
					)}
				</div>
			):(
				<div className="transformed-placeholder">
					Transformed Image
				</div>
			)}
		</div>
  )
}

export default TransformedImage