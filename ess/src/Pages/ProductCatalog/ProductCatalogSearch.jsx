import React from 'react'
import { SlInput, SlMenuItem, SlSelect, SlButton, SlTag, SlDetails } from '@shoelace-style/shoelace/dist/react';

function ProductCatalogSearch() {
    return (
        <div className='part-add-main'>
            <div className='part-add-main-container'>
                <SlDetails className='part-add-input-main' open="true" summary="Toggle Me">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </SlDetails>
                <SlDetails summary="Toggle Me">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </SlDetails>
            </div>
        </div>
    )
}

export default ProductCatalogSearch