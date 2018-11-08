import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

export default props => (
    <ReduxToastr 
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position='bottom-center'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar />
)