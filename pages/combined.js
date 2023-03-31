import newLogo from 'public/new-logo.svg'
import helper from 'public/helpersvg.svg'
import Image from 'next/image'

const svgTest = ()=>{
    return (
        <div>
            <Image alt='' src={newLogo}/>
            <Image alt='' src={helper}/>
        </div>
    )
}

export default svgTest