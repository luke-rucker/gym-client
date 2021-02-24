import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

function FullPageSpinner() {
    return (
        <Dimmer active inverted>
            <Loader />
        </Dimmer>
    )
}

export default FullPageSpinner
