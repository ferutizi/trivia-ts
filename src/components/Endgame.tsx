import './Endgame.css'

interface EndgameProps {
  children: React.ReactNode
  end: boolean
}

const Endgame = (props: EndgameProps): JSX.Element => {
  return (
    <>
      {
      props.end
        ? <div className='endgame__overlay'>
          <div className='endgame__card'>
            {props.children}
            {/* eslint-disable-next-line react/jsx-closing-tag-location */}
          </div>
          {/* eslint-disable-next-line react/jsx-closing-tag-location */}
        </div>
        : <div />
      }
    </>
  )
}

export default Endgame
